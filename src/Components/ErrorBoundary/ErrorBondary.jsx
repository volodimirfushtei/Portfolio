import React, { Component } from "react";
import { motion } from "framer-motion";
import s from "./ErrorBondary.module.css";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);

    // Log error to error tracking service
    if (process.env.NODE_ENV === "production") {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
  };

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={s.errorContainer}
      >
        <div className={s.errorOverlay}></div>

        <motion.div
          className={s.errorContent}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className={s.errorIcon}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              repeatDelay: 3,
            }}
          >
            ⚠️
          </motion.div>

          <h2 className={s.errorTitle}>Oops! Something went wrong</h2>

          <div className={s.errorMessage}>
            <p>The application encountered an unexpected error.</p>
            {this.state.error && (
              <p className={s.errorText}>
                <strong>Error:</strong> {this.state.error.toString()}
              </p>
            )}
          </div>

          <motion.button
            onClick={this.handleReset}
            className={s.errorButton}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>

          {this.state.errorInfo && (
            <div className={s.errorDetails}>
              <button onClick={this.toggleDetails} className={s.detailsToggle}>
                {this.state.showDetails ? "Hide Details" : "Show Details"}
              </button>

              <motion.div
                className={s.detailsContent}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: this.state.showDetails ? "auto" : 0,
                  opacity: this.state.showDetails ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <pre className={s.errorStack}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </motion.div>
            </div>
          )}

          <div className={s.errorContact}>
            <p>Need help? Contact support at</p>
            <a className={s.error_email} href="mailto: fuschteyy@gmail.com">
              {" "}
              fuschteyy@gmail.com
            </a>
          </div>
        </motion.div>
      </motion.div>
    );
  }
}

export default ErrorBoundary;
