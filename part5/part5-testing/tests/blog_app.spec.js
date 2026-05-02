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

})
