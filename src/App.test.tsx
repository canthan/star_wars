import axios from 'axios';
import { act, render, screen } from '@testing-library/react';

import App from './App';
import { wrapWithRouter } from './utils/test';
import { mockedPeople, mockedPlanet } from './mocks';
import { API, PEOPLE } from './constants/api';

jest.mock('axios');

afterAll(() => {
  jest.clearAllMocks();
});

test('renders App and List component', async () => {
  (axios.get as jest.Mock).mockImplementation((url: string) => {
    switch (url) {
      case `${API}${PEOPLE}?page=1`:
        return Promise.resolve({ data: { results: mockedPeople } });
      case `${API}planets/1/`:
        return Promise.resolve({ data: mockedPlanet });
    }
  });

  await act(async () => {
    await render(wrapWithRouter(<App />));
  });

  const header = screen.getByText('Character list');
  expect(header).toBeInTheDocument();
});
