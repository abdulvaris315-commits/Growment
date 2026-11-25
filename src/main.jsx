import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('GROWMENT Runtime Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center font-sans">
          <div className="w-12 h-12 rounded-full bg-[#D4962A]/20 border border-[#D4962A]/40 flex items-center justify-center mb-6">
            <span className="w-3 h-3 rounded-full bg-[#D4962A] animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">GROWMENT Studio</h1>
          <p className="text-sm text-white/60 max-w-md mb-6">
            A minor visual script recovered. Please refresh to load full high-FPS choreography.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all shadow-md"
          >
            Refresh Site
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
