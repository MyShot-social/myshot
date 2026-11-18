import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';
import { createReview } from '../../util/testData';

import AverageRating from './AverageRating';

const { screen } = testingLibrary;

describe('AverageRating', () => {
  it('renders nothing when there are no reviews', () => {
    const { container } = render(<AverageRating reviews={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the average rating and the number of reviews', () => {
    const reviews = [
      createReview('r1', { rating: 5 }),
      createReview('r2', { rating: 4 }),
      createReview('r3', { rating: 4 }),
    ];
    render(<AverageRating reviews={reviews} />);
    expect(screen.getByText('4.3')).toBeInTheDocument();
    expect(screen.getByTitle('4/5')).toBeInTheDocument();
    expect(screen.getByText('AverageRating.reviewCount')).toBeInTheDocument();
  });
});
