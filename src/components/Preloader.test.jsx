import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Preloader from './Preloader';
import { sceneState } from '../lib/sceneState';
import { profile } from '../data/profile';

describe('Preloader', () => {
  beforeEach(() => {
    sessionStorage.clear();
    sceneState.ready = false;
    sceneState.progress = 0;
  });

  it('renders nothing when disabled', () => {
    render(<Preloader enabled={false} />);
    expect(screen.queryByText(profile.name)).toBeNull();
  });

  it('renders nothing when already seen this session', () => {
    sessionStorage.setItem('dgb-seen', '1');
    render(<Preloader enabled />);
    expect(screen.queryByText(profile.name)).toBeNull();
  });

  it('shows the name, then dismisses once the scene is ready', async () => {
    render(<Preloader enabled />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    sceneState.ready = true;
    await waitFor(() => expect(screen.queryByText(profile.name)).toBeNull(), { timeout: 3000 });
    expect(sessionStorage.getItem('dgb-seen')).toBe('1');
  });
});
