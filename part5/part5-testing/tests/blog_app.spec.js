const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/users', {
      data: {
        name: 'Neton',
        username: 'N3t0n',
        password: 'N3t0nPass',
      },
    })

    await page.goto('/')
  })


  test('Login form is shown', async ({ page }) => {
  await page.getByRole('button', { name: 'login' }).click()
  await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible()
  })

  test('User can log in with correct credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('N3t0n')
    await page.getByTestId('password').fill('N3t0nPass')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Neton logged-in')).toBeVisible()
  })

  test('Login fails with wrong credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('N3t0n')
    await page.getByTestId('password').fill('WrongPass')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('N3t0n')
        await page.getByTestId('password').fill('N3t0nPass')
        await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('title').fill('And they shall know no fear.')
        await page.getByTestId('author').fill('The Emperor')
        await page.getByTestId('url').fill('imperiumofman.com')
        await page.getByRole('button', { name: 'add blog' }).click()

        await expect(page.getByText('And they shall know no fear. The Emperor')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('title').fill('And they shall know no fear.')
        await page.getByTestId('author').fill('The Emperor')
        await page.getByTestId('url').fill('imperiumofman.com')
        await page.getByRole('button', { name: 'add blog' }).click()
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('1 likes')).toBeVisible()
      })

      test('a blog can be removed by the user who created it', async ({ page }) => {
        page.on('dialog', async dialog => {
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('And they shall know no fear. The Emperor')).not.toBeVisible()
      })

      test('only the creator can see the remove button', async ({ page, request }) => {
        await page.getByRole('button', { name: 'logout' }).click()

        await request.post('/api/users', {
          data: {
            name: 'Paco Pepe',
            username: 'Pape',
            password: 'PapePass',
          },
        })

        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('Pape')
        await page.getByTestId('password').fill('PapePass')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('And they shall know no fear. The Emperor')).toBeVisible()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('title').fill('And they shall know no fear.')
        await page.getByTestId('author').fill('The Emperor')
        await page.getByTestId('url').fill('imperiumofman.com')
        await page.getByRole('button', { name: 'add blog' }).click()
        await page.getByText('And they shall know no fear. The Emperor').waitFor()

        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('title').fill('Iron Within, Iron Without!')
        await page.getByTestId('author').fill('Perturabo')
        await page.getByTestId('url').fill('ironwarriors.com')
        await page.getByRole('button', { name: 'add blog' }).click()
        await page.getByText('Iron Within, Iron Without! Perturabo').waitFor()

        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('title').fill('Ave Dominus Nox!')
        await page.getByTestId('author').fill('Sevatar')
        await page.getByTestId('url').fill('nightlords.com')
        await page.getByRole('button', { name: 'add blog' }).click()
        await page.getByText('Ave Dominus Nox! Sevatar').waitFor()

        const blogWithOneLike = page.getByText('Iron Within, Iron Without! Perturabo').locator('..')
        await blogWithOneLike.getByRole('button', { name: 'view' }).click()
        await blogWithOneLike.getByRole('button', { name: 'like' }).click()

        const blogWithTwoLikes = page.getByText('Ave Dominus Nox! Sevatar').locator('..')
        await blogWithTwoLikes.getByRole('button', { name: 'view' }).click()
        await blogWithTwoLikes.getByRole('button', { name: 'like' }).click()
        await expect(blogWithTwoLikes.getByText('1 likes')).toBeVisible()
        await blogWithTwoLikes.getByRole('button', { name: 'like' }).click()
        await expect(blogWithTwoLikes.getByText('2 likes')).toBeVisible()
      })

      test('blogs are ordered by likes', async ({ page }) => {
        const blogs = await page.locator('.blogSummary').allTextContents()

        expect(blogs[0]).toContain('Ave Dominus Nox!')
        expect(blogs[1]).toContain('Iron Within, Iron Without!')
        expect(blogs[2]).toContain('And they shall know no fear.')
      })
    })
  })
})
