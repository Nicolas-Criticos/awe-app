import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "40px",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <p style={{ fontSize: "2rem" }}>⚠️</p>
          <p style={{ fontSize: "1rem", color: "#333" }}>
            Something went wrong
          </p>
          <p style={{ fontSize: "0.8rem", color: "#888", maxWidth: "360px" }}>
            {this.state.error?.message ?? "An unexpected error occurred."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: "8px",
              padding: "10px 24px",
              background: "#4a5568",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
