import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeAll(() => {});
afterEach(() => {});
afterAll(() => {});

test('loads and displays greeting', async () => {
  render(<></>);

  fireEvent.click(screen.getByText('Load Greeting'));

  await screen.findByRole('heading');
});

test('handles server error', async () => {
  fireEvent.click(screen.getByText('Load Greeting'));

  await screen.findByRole('alert');
});
