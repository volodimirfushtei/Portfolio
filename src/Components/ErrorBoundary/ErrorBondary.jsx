import React, { Component } from "react";
import { motion as Motion } from "framer-motion";
import s from "./ErrorBondary.module.css";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={s.error_container}
      >
        <h2 className={s.error_title}>⚠️ Something went wrong!</h2>

        <div className={s.error_box}>
          <p>
            <strong>Error:</strong> {this.state.error?.toString()}
          </p>

          {this.state.errorInfo && (
            <details>
              <summary>Error Info</summary>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>

        <button onClick={this.handleReset} className={s.error_button}>
          Try again
        </button>

        <p className={s.error_note}>
          If the problem persists, please contact the developer.
          <a className={s.error_email} href="mailto: fuschteyy@gmail.com">
            {" "}
            fuschteyy@gmail.com
          </a>
        </p>
      </Motion.div>
    );
  }
}

export default ErrorBoundary;
