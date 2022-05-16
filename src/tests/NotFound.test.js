import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

it('Testa conteúdo da página Not Found', () => {
  renderWithRouter(<NotFound />);

  const notFoundTitle = screen.getByRole('heading',
    { name: 'Page requested not found Crying emoji' });
  expect(notFoundTitle).toBeInTheDocument();

  const notFoundAllImage = screen.getAllByRole('img');
  const notFoundImage = notFoundAllImage[1];
  const linkImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(notFoundImage).toHaveAttribute('src', linkImage);
});
