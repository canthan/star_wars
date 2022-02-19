import axios from 'axios';
import { render, screen } from '@testing-library/react';

import { Details } from './Details';
import { wrapWithRouter } from '../../utils/test';
import { mockedFilm, mockedPeople, mockedPlanet } from '../../mocks';
import { API, FILMS, PEOPLE, PLANET } from '../../constants/api';
import { act } from 'react-dom/test-utils';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

afterAll(() => {
  jest.clearAllMocks();
});

test('renders Detail component with mocked data', async () => {
  (axios.get as jest.Mock).mockImplementation((url: string) => {
    switch (url) {
      case `${API}${PEOPLE}1`:
        return Promise.resolve({ data: mockedPeople[0] });
      case `${API}${PLANET}1/`:
        return Promise.resolve({ data: mockedPlanet });
      case `${API}${FILMS}1/`:
        return Promise.resolve({ data: mockedFilm });
    }
  });

  await act(async () => {
    render(wrapWithRouter(<Details />, ['/details/1']));
  });

  const character = await screen.findByText(mockedPeople[0].name);
  const hairColor = await screen.findByText(
    `Hair colour: ${mockedPeople[0].hair_color}`,
  );
  const planet = await screen.findByText(`Home planet: ${mockedPlanet.name}`);
  const film = await screen.findByText(mockedFilm.title);

  expect(character).toBeInTheDocument();
  expect(hairColor).toBeInTheDocument();
  expect(planet).toBeInTheDocument();
  expect(film).toBeInTheDocument();
});
