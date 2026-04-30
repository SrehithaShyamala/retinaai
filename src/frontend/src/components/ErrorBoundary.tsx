import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Caught render error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          className="min-h-screen bg-background flex items-center justify-center p-6"
          data-ocid="error_boundary.page"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex flex-col items-center gap-5 max-w-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/25 flex items-center justify-center">
              <AlertTriangle
                className="w-8 h-8 text-destructive"
                aria-hidden="true"
              />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-xl mb-2">
                Something went wrong
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                An unexpected error occurred. Please refresh the page to
                continue — your data is safe.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="flex-1 gap-2"
                data-ocid="error_boundary.retry_button"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              <Button
                onClick={() => window.location.assign("/")}
                className="flex-1 gap-2"
                data-ocid="error_boundary.home_button"
              >
                Go to Home
              </Button>
            </div>
            {this.state.error && (
              <details className="w-full text-left">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  Technical details
                </summary>
                <pre className="mt-2 text-xs text-destructive/70 bg-muted/40 rounded-lg p-3 overflow-auto whitespace-pre-wrap break-words">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
