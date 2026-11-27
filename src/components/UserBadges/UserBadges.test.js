import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import UserBadges from './UserBadges';

const { screen } = testingLibrary;

describe('UserBadges', () => {
  it('renders nothing without badges', () => {
    const { container } = render(<UserBadges metadata={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('uses option labels from user field config', () => {
    const userFieldConfig = [
      {
        key: 'creativebadges',
        enumOptions: [{ option: 'foundingCreative', label: 'Founding creative' }],
      },
    ];
    render(
      <UserBadges
        metadata={{ creativebadges: ['foundingCreative'] }}
        userFieldConfig={userFieldConfig}
      />
    );
    expect(screen.getByText('Founding creative')).toBeInTheDocument();
  });

  it('falls back to a readable label', () => {
    render(<UserBadges metadata={{ creativebadges: ['verifiedCreative'] }} />);
    expect(screen.getByText('Verified creative')).toBeInTheDocument();
  });
});
