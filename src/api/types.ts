import { People } from '../types';

export interface PeopleResponse {
  count: number;
  next: string;
  previous: string;
  results: People[];
}
