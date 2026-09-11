import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Nav, { scrollToHash } from './Nav';
import { sceneState } from '../lib/sceneState';

describe('Nav', () => {
  it('renders section links and social links', () => {
    render(<Nav isScrolled={false} />);
    expect(screen.getAllByRole('link', { name: 'Work' })[0]).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', expect.stringContaining('github.com'));
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
  });

  it('toggles the mobile menu', () => {
    render(<Nav isScrolled={false} />);
    const btn = screen.getByRole('button', { name: 'Open menu' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('scrollToHash', () => {
  it('uses lenis when present, otherwise native smooth scroll', () => {
    const el = document.createElement('section');
    el.id = 'projects';
    el.scrollIntoView = () => {};
    document.body.appendChild(el);
    const calls = [];
    sceneState.lenis = { scrollTo: (...a) => calls.push(a) };
    const e = { preventDefault: () => {} };
    scrollToHash(e, '#projects');
    expect(calls[0][0]).toBe(el);
    sceneState.lenis = null;
    let native = 0;
    el.scrollIntoView = () => {
      native += 1;
    };
    scrollToHash(e, '#projects');
    expect(native).toBe(1);
    el.remove();
  });
});
