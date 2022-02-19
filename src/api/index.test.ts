import axios from 'axios';

import { getPeople } from '.';
import { API, PEOPLE } from '../constants/api';
import { mockedPeople } from '../mocks';

jest.mock('axios');

describe('getShows', () => {
  test('should fetch list of shows', async () => {
    const mockGetListener = jest.spyOn(axios, 'get');
    mockGetListener.mockImplementation(() => Promise.resolve(mockedPeople));

    const people = await getPeople(1);

    expect(axios.get).toHaveBeenCalledWith(`${API}${PEOPLE}?page=1`);
    expect(people).toEqual(mockedPeople);
  });
});
