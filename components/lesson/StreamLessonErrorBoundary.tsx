import { Component, type ReactNode } from 'react';

type StreamLessonErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode | ((retry: () => void) => ReactNode);
};

type StreamLessonErrorBoundaryState = {
  hasError: boolean;
};

export class StreamLessonErrorBoundary extends Component<
  StreamLessonErrorBoundaryProps,
  StreamLessonErrorBoundaryState
> {
  state: StreamLessonErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): StreamLessonErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[lesson] StreamLessonContent failed to load', error);
  }

  private retry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;

      if (typeof fallback === 'function') {
        return fallback(this.retry);
      }

      return fallback;
    }

    return this.props.children;
  }
}
