import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ReviewRating } from '../../components';

import css from './AverageRating.module.css';

/**
 * Shows the average star rating for a set of reviews, e.g. "★★★★★ 4.8 (12 reviews)".
 * Renders nothing if there are no rated reviews.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Custom class that extends the default class for the root element
 * @param {Array<propTypes.review>} props.reviews - The reviews to average
 * @returns {JSX.Element|null}
 */
const AverageRating = props => {
  const { className, reviews = [] } = props;
  const ratings = reviews
    .map(r => r?.attributes?.rating)
    .filter(rating => typeof rating === 'number' && rating > 0);

  if (ratings.length === 0) {
    return null;
  }

  const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  const averageRounded = Math.round(average * 10) / 10;
  const averageText = averageRounded.toFixed(1);

  return (
    <div className={classNames(css.root, className)}>
      <ReviewRating
        className={css.stars}
        reviewStarClassName={css.star}
        rating={Math.round(average)}
      />
      <span className={css.average}>{averageText}</span>
      <span className={css.count}>
        <FormattedMessage id="AverageRating.reviewCount" values={{ count: ratings.length }} />
      </span>
    </div>
  );
};

export default AverageRating;
