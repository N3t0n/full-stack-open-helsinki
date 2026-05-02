# Part 5 - Testing React Apps

In this part, I returned to frontend development by connecting the React application to the backend created in the previous parts. I implemented login functionality, handled token-based authentication in the frontend, and stored user information in the browser's local storage. I also learned how to use `props.children` and refs, tested React components with Vitest and React Testing Library, and wrote end-to-end tests with Playwright.

## Topics covered

- Login in React applications
- Token-based authentication
- Local storage
- Conditional rendering
- Service modules
- `props.children`
- Refs
- PropTypes
- React component testing
- Vitest
- End-to-end testing
- Playwright
- Debugging frontend tests

## Project structure

- `bloglist-backend`: Express/MongoDB API used by the Bloglist app.
- `bloglist-frontend`: React/Vite frontend.
- `part5-testing`: Playwright end-to-end test project.

## Run the app

Use two terminals.

Terminal 1, backend:
npm run start:test

Terminal 2, frontend:
npm run dev

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend at `http://localhost:3003`.

## Tests

npm test

npm test -- --project chromium

npm run test:ui
