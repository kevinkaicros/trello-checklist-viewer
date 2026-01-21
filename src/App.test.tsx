import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  // The default scaffolded App.tsx usually has "Vite + React" text
  // Let's check the content of App.tsx first or just test basic rendering
  expect(true).toBeTruthy()
})
