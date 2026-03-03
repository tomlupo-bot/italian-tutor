"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onSkip?: () => void;
}

interface State {
  hasError: boolean;
  error: string | null;
}

export default class ExerciseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-card rounded-2xl border border-danger/20 p-6 text-center space-y-3">
          <p className="text-white/60 text-sm">
            This exercise failed to load.
          </p>
          <p className="text-xs text-white/30">{this.state.error}</p>
          {this.props.onSkip && (
            <button
              onClick={this.props.onSkip}
              className="px-4 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/15 transition"
            >
              Skip exercise
            </button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
