import axios, { AxiosResponse } from 'axios';

import { API, PEOPLE } from '../constants/api';
import { People } from '../types';
import { PeopleResponse } from './types';

export const getPeople = (
  page: number,
): Promise<AxiosResponse<PeopleResponse>> =>
  axios.get<PeopleResponse>(`${API}${PEOPLE}?page=${page}`);

export const getPerson = (id: number): Promise<AxiosResponse<People>> =>
  axios.get<People>(`${API}${PEOPLE}${id}`);

export const getData = (url: string): Promise<AxiosResponse> => axios.get(url);
