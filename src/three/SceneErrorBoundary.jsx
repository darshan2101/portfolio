import React from 'react';

export default class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error('[scene] render failed, using static fallback', error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
