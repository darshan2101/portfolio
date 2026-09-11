import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

function Hello() {
  return <h1>hello</h1>;
}

describe('test harness', () => {
  it('renders with React 19 under jsdom', () => {
    render(<Hello />);
    expect(screen.getByRole('heading')).toHaveTextContent('hello');
    expect(React.version.startsWith('19')).toBe(true);
  });
});
