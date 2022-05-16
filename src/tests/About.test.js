import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

it('Teste o conteúdo da página About', () => {
  const { container } = renderWithRouter(<About />);

  const aboutTitle = screen.getByRole('heading',
    { name: 'About Pokédex' });
  expect(aboutTitle).toBeInTheDocument();

  // const aboutParagraph = screen.getAllByRole('paragraph');
  const aboutParagraph = container.querySelectorAll('p');
  const LinkLength = 2;
  expect(aboutParagraph).toHaveLength(LinkLength);

  const aboutImage = screen.getByRole('img');
  const linkImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(aboutImage).toHaveAttribute('src', linkImage);
});
