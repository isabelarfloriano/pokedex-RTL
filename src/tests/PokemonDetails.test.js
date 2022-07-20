import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

it('Teste se as informações detalhadas do pokémon selecionado são rederizadas', () => {
  renderWithRouter(<App />);
  const getLinkDetails = screen.getByRole('link', { name: /more details/i });
  expect(getLinkDetails).toBeInTheDocument();
  userEvent.click(getLinkDetails);
  const pokemonTitle = screen.getByRole('heading', { name: /Pikachu Details/i });
  expect(pokemonTitle).toBeInTheDocument();
  expect(getLinkDetails).not.toBeInTheDocument();
  const summaryTitle = screen.getByRole('heading', {
    level: 2, name: /Summary/i });
  expect(summaryTitle).toBeInTheDocument();
  const summaryText = screen.getByText(pokemons[0].summary);
  expect(summaryText).toBeInTheDocument();
});
it('Teste se existe na página uma seção com os mapas contendo as localizações', () => {
  renderWithRouter(<App />);
  const getLinkDetails = screen.getByRole('link', { name: /more details/i });
  expect(getLinkDetails).toBeInTheDocument();
  userEvent.click(getLinkDetails);
  const mapsTitle = screen.getByRole('heading', {
    level: 2, name: /Game Locations of Pikachu/i });
  expect(mapsTitle).toBeInTheDocument();
  const locationOne = screen.getByText(pokemons[0].foundAt[0].location);
  expect(locationOne).toBeInTheDocument();
  const locationTwo = screen.getByText(pokemons[0].foundAt[1].location);
  expect(locationTwo).toBeInTheDocument();
  const getMaps = screen.getAllByRole('img', {
    name: /pikachu location/i,
  });
  expect(getMaps).toHaveLength(pokemons[0].foundAt.length);
});
it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  renderWithRouter(<App />);
  const getLinkDetails = screen.getByRole('link', { name: /more details/i });
  expect(getLinkDetails).toBeInTheDocument();
  userEvent.click(getLinkDetails);
  const favoriteAsk = screen.getByLabelText(/Pokémon favoritado/i);
  expect(favoriteAsk).toBeInTheDocument();
  const isFavorite = screen.getByRole('checkbox');
  expect(isFavorite.id).toBe('favorite');
  expect(isFavorite.checked).toBe(false);
  userEvent.click(isFavorite);
  expect(isFavorite.checked).toBe(true);
  const favoriteStar = screen.getByRole('img', {
    name: /Pikachu is marked as favorite/i });
  expect(favoriteStar).toBeInTheDocument();
  userEvent.click(isFavorite);
  expect(isFavorite.checked).toBe(false);
  expect(favoriteStar).not.toBeInTheDocument();
});
