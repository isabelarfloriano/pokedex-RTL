import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const MORE_DETAILS = 'More details';
const goToMoreDetails = () => {
  const { history } = renderWithRouter(<App />);
  expect(history.location.pathname).toBe('/');
  const detailsElement = screen.getByRole('link', { name: MORE_DETAILS });
  expect(detailsElement).toBeInTheDocument();
  userEvent.click(detailsElement);
};

it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  goToMoreDetails();
  // screen.logTestingPlaygroundURL();
  const pokemonName = screen.getByTestId('pokemon-name', { name: /pikachu/i });
  expect(pokemonName).toBeInTheDocument();
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(/electric/i);
  const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
  expect(pokemonWeight).toBeInTheDocument();
  const pokemonImage = screen.getByRole('img', {
    name: 'Pikachu sprite',
  });
  const pokemonLinkImage = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  expect(pokemonImage).toHaveAttribute('src', pokemonLinkImage);
});
it('Teste se o card do pokémon contém um link de navegação para exibir detalhes do mesmo',
  () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const detailsElement = screen.getByRole('link', { name: MORE_DETAILS });
    expect(detailsElement).toBeInTheDocument();
    expect(detailsElement).toHaveAttribute('href', '/pokemons/25');
  });
it('Teste o redirecionamento da aplicação para a página de detalhes de pokémon e sua URL',
  () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const detailsElement = screen.getByRole('link', { name: MORE_DETAILS });
    expect(detailsElement).toBeInTheDocument();
    userEvent.click(detailsElement);
    expect(history.location.pathname).not.toBe('/');
    expect(history.location.pathname).toBe('/pokemons/25');
  });
// it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
//   goToMoreDetails();
// });
it('Teste se existe um ícone de estrela nos pokémons favoritados', async () => {
  goToMoreDetails();
  const inputFavorite = await screen.findAllByRole('checkbox');
  const favoriteElement = inputFavorite[0];
  userEvent.click(favoriteElement);
  // const altText = /is marked as favorite/i;
  const starImage = screen.getByRole('img', {
    name: 'Pikachu is marked as favorite',
  });
  const starLinkImage = '/star-icon.svg';
  expect(starImage).toHaveAttribute('src', starLinkImage);
  expect(starImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
