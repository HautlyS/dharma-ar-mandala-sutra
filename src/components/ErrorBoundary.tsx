import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="bg-black/50 border-red-500/30 backdrop-blur-xl m-4">
          <div className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-400 mb-2 font-mono">
              Erro Inesperado
            </h2>
            <p className="text-gray-300 mb-4">
              Algo deu errado ao carregar este componente. Tente recarregar ou volte ao início.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 text-left">
                <summary className="text-yellow-400 cursor-pointer font-mono text-sm mb-2">
                  Detalhes do Erro (Desenvolvimento)
                </summary>
                <div className="bg-black/50 p-3 rounded border border-red-500/30 text-xs font-mono text-red-300 overflow-auto max-h-32">
                  <div className="mb-2">
                    <strong>Erro:</strong> {this.state.error.message}
                  </div>
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
            
            <div className="flex gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                className="bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/30 font-mono"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tentar Novamente
              </Button>
              <Button
                onClick={this.handleReload}
                className="bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 font-mono"
              >
                <Home className="w-4 h-4 mr-2" />
                Recarregar Página
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    console.error('Error captured:', error);
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError, hasError: !!error };
};

// Specialized error boundary for 3D models
export const ModelErrorBoundary: React.FC<{ children: ReactNode; modelName?: string }> = ({ 
  children, 
  modelName 
}) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg border border-red-500/30">
          <div className="text-center p-4">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 font-mono text-sm mb-1">
              Erro no modelo 3D
            </p>
            {modelName && (
              <p className="text-xs text-gray-400 mb-3">{modelName}</p>
            )}
            <Button
              onClick={() => window.location.reload()}
              size="sm"
              className="bg-red-500/20 border border-red-400/50 text-red-300 hover:bg-red-500/30 font-mono"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Recarregar
            </Button>
          </div>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error(`3D Model Error for ${modelName}:`, error, errorInfo);
        // Here you could send error reports to a service
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
