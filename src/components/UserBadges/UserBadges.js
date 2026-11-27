import React from 'react';
import classNames from 'classnames';
import { useIntl } from '../../util/reactIntl';

import css from './UserBadges.module.css';

// Metadata keys (user field IDs in Console) that hold badges.
const BADGE_FIELD_KEYS = ['creativebadges', 'businessbadges'];

// Option values set in Console -> icon and colour style.
const BADGE_STYLES = {
  foundingCreative: { icon: '★', className: css.founding },
  experiencedCreative: { icon: '◆', className: css.experienced },
  verifiedBusiness: { icon: '✓', className: css.verified },
};

// "foundingCreative" -> "Founding creative"
const humanize = value => {
  const spaced = `${value}`.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[-_]+/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
};

const toArray = value => (Array.isArray(value) ? value : value ? [value] : []);

/**
 * Shows operator-given badges (e.g. "Founding creative") saved in the user's metadata.
 * Labels come from the user field options in Console when available.
 * Renders nothing if the user has no badges.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Custom class that extends the default class for the root element
 * @param {Object} [props.metadata] - The user's profile metadata
 * @param {Array<Object>} [props.userFieldConfig] - User field configuration from the hosted config
 * @returns {JSX.Element|null}
 */
const UserBadges = props => {
  const intl = useIntl();
  const { className, metadata = {}, userFieldConfig = [] } = props;

  const badges = BADGE_FIELD_KEYS.flatMap(key => {
    const fieldConfig = userFieldConfig?.find(config => config?.key === key);
    const enumOptions = fieldConfig?.enumOptions || [];
    return toArray(metadata?.[key]).map(value => {
      const option = enumOptions.find(o => `${o.option}` === `${value}`);
      return { value, label: option?.label || humanize(value) };
    });
  });

  if (badges.length === 0) {
    return null;
  }

  return (
    <ul
      className={classNames(css.root, className)}
      aria-label={intl.formatMessage({ id: 'UserBadges.ariaLabel' })}
    >
      {badges.map(({ value, label }) => (
        <li key={value} className={classNames(css.badge, BADGE_STYLES[value]?.className)}>
          <span className={css.icon} aria-hidden="true">
            {BADGE_STYLES[value]?.icon || '★'}
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
};

export default UserBadges;
