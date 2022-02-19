import axios from 'axios';
import { render, screen } from '@testing-library/react';

import { List } from './List';
import { wrapWithRouter } from '../../utils/test';
import { mockedPeople, mockedPlanet } from '../../mocks';
import { API, PEOPLE, PLANET } from '../../constants/api';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

afterAll(() => {
  jest.clearAllMocks();
});

test('renders List component with mocked data', async () => {
  (axios.get as jest.Mock).mockImplementation((url: string) => {
    switch (url) {
      case `${API}${PEOPLE}?page=1`:
        return Promise.resolve({ data: { results: mockedPeople } });
      case `${API}${PLANET}1/`:
        return Promise.resolve({ data: mockedPlanet });
    }
  });

  act(() => {
    render(wrapWithRouter(<List />));
  });

  const character = await screen.findByText(mockedPeople[0].name);
  const planet = await screen.findByText(`Homeworld: ${mockedPlanet.name}`);

  expect(character).toBeInTheDocument();
  expect(planet).toBeInTheDocument();
});
