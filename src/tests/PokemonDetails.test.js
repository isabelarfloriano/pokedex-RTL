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
