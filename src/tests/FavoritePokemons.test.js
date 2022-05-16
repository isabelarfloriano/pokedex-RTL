import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

it('Testa a renderização dos pokemons favoritados', async () => {
  renderWithRouter(<FavoritePokemons />);

  // const favoritePokemons = container.querySelectorAll('img');
  // if (favoritePokemons.length > 0) {
  // const favoriteErro = screen.getByRole('heading',
  //   { name: 'No favorite pokemon found' });
  const favoriteErro = screen.getByText(/no favorite pokemon found/i);
  if (!favoriteErro) {
    expect(favoriteErro).toBeInTheDocument();
  } else {
  // simula favoritar um pokemon e verifica se ele foi adiconado aos favoritos
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const detailsElement = screen.getByRole('link', { name: 'More details' });
    // const firstElement = allDetailsElement[1];
    expect(detailsElement).toBeInTheDocument();
    userEvent.click(detailsElement); // vai para detalhes do pokemon
    const inputFavorite = await screen.findAllByRole('checkbox');
    const favoriteElement = inputFavorite[0];
    userEvent.click(favoriteElement); // check o isFavorite
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink); // vai para favoritos
    expect(history.location.pathname).toBe('/favorites');
    const allImages = screen.getAllByRole('img');
    expect(allImages.length).toBe(2); // cada component pokemon tem duas imagens (pokemon + estrela de favorito)

    screen.logTestingPlaygroundURL();
  }
});
