import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getData, getPeople } from '../../api';
import { People, Planet } from '../../types';
import { getIdFromUrl } from '../../utils/utils';

import './styles.scss';

const getPlanetName = (planetUrl: string, planets: Planet[]) =>
  planets.find((planet) => planetUrl === planet.url)?.name || '';

export const List = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [people, setPeople] = useState<People[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    getPeople(page).then((response) => {
      setPeople(response.data.results);
    });
  }, [page]);

  useEffect(() => {
    const planetsUrls = Array.from(
      new Set(people.map((person) => person.homeworld)),
    );

    planetsUrls.forEach((url) => {
      getData(url).then((response: AxiosResponse<Planet>) => {
        setPlanets((prevPlanets) => [...prevPlanets, response.data]);
      });
    });
  }, [people]);

  const handleClick = (url: string) => {
    const personId = getIdFromUrl(url);

    navigate(`/details/${personId}`, {
      state: people.find((person) => person.url === url),
    });
  };

  return (
    <div className="list__wrapper">
      <h2 className="list__title">Character list</h2>
      <ul>
        {people.map((person) => (
          <li key={person.name} className="list__item">
            <button
              className="list__item__button"
              type="button"
              onClick={() => handleClick(person.url)}
            >
              <h3 className="list__item__title">{person.name}</h3>
              <div className="list__item__text">Gender: {person.gender}</div>
              <div className="list__item__text">
                Homeworld: {getPlanetName(person.homeworld, planets)}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
