import { MemoryRouter, Route } from 'react-router-dom';

export const wrapWithRouter = (
  component: JSX.Element,
  initialEntries: (string | Partial<Location>)[] = ['/'],
) => <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>;
