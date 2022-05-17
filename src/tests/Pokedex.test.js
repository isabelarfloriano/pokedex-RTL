import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

it('Teste se a página contém um heading com texto especificio', () => {
  renderWithRouter(<App />);
  const appText = screen.getByRole('heading', {
    level: 2, name: 'Encountered pokémons' });
  expect(appText).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
});

it('Teste se é exibido o próximo pokémon da lista quando o botão próximo é clicado',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    // const firstPokemon = screen.getByText(/pikachu/i);
    // expect(firstPokemon).toEqual(pokemons[0].name);
    const findButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(findButton).toBeInTheDocument();
    userEvent.click(findButton);
    pokemons.forEach((pokemon, index) => {
      if (index === 0) {
        expect(pokemon.name).toBe('Pikachu');
        userEvent.click(findButton);
      } else {
        expect(pokemon.name).not.toBe(pokemons[index - 1].name);
        expect(pokemon.name).toBe(pokemons[index].name);
        userEvent.click(findButton);
      }
    });
  });

it('Teste se é mostrado apenas um pokémon por vez', () => {
  renderWithRouter(<App />);
  const allDataTestid = screen.getAllByTestId('pokemon-name');
  expect(allDataTestid.length).toBe(1);
});

it('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const buttonAll = screen.getByRole('button', { name: /all/i });
  expect(buttonAll).toBeInTheDocument();
  const allTypeButtons = screen.getAllByTestId('pokemon-type-button');
  const typesNumber = 7;
  expect(allTypeButtons).toHaveLength(typesNumber);
  const eletric = screen.getByRole('button', {
    name: /electric/i,
  });
  expect(eletric).toBeInTheDocument();
  const fire = screen.getByRole('button', {
    name: /fire/i,
  });
  expect(fire).toBeInTheDocument();
  const bug = screen.getByRole('button', {
    name: /bug/i,
  });
  expect(bug).toBeInTheDocument();
  const poison = screen.getByRole('button', {
    name: /poison/i,
  });
  expect(poison).toBeInTheDocument();
  const psychic = screen.getByRole('button', {
    name: /psychic/i,
  });
  expect(psychic).toBeInTheDocument();
  const normal = screen.getByRole('button', {
    name: /normal/i,
  });
  expect(normal).toBeInTheDocument();
  const dragon = screen.getByRole('button', {
    name: /dragon/i,
  });
  expect(dragon).toBeInTheDocument();
});

it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const buttonAll = screen.getByRole('button', { name: /all/i });
  expect(buttonAll).toBeInTheDocument();
  userEvent.click(buttonAll);
});
