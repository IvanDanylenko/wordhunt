import { render } from '@testing-library/react';

import AdminCore from './admin-core';

describe('AdminCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminCore />);
    expect(baseElement).toBeTruthy();
  });
});
