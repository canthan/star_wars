import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { getData, getPerson } from '../../api';
import { Film, People, Planet } from '../../types';

import './details.scss';

export const Details = () => {
  const personFromState = useLocation().state as People;
  const { id } = useParams();
  const [person, setPerson] = useState<People>(personFromState);
  const [planet, setPlanet] = useState<Planet>();
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    if (id && !personFromState && !person)
      getPerson(Number(id)).then((result) => {
        setPerson(result.data);
      });
  }, [id, personFromState, person]);

  useEffect(() => {
    if (!planet && person) {
      getData(person.homeworld).then((result: AxiosResponse<People>) => {
        setPlanet(result.data);
      });
    }
  }, [person, planet]);

  useEffect(() => {
    if (!films.length && person?.films?.length) {
      person.films.forEach((url) => {
        getData(url).then((response: AxiosResponse<Film>) => {
          setFilms((prevFilms) => [...prevFilms, response.data]);
        });
      });
    }
  }, [person, films]);

  return (
    <div className="details__wrapper">
      {person ? (
        <>
          <h2 className="details__title">{person.name}</h2>
          <div>Hair colour: {person.hair_color}</div>
          <div>Eye colour: {person.eye_color}</div>
          <div>Gender: {person.gender}</div>
          <div>Home planet: {planet ? planet.name : 'Loading planet...'}</div>
          <div>List of films:</div>
          <ul>
            {films.length
              ? films.map((film) => <li key={film.title}>{film.title}</li>)
              : 'Loading films...'}
          </ul>
        </>
      ) : (
        <span>Loading character...</span>
      )}
    </div>
  );
};
