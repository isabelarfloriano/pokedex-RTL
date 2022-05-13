import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritesLink).toBeInTheDocument();
  });
