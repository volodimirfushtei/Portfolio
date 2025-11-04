import React, { Component } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Mail,
  Shield,
} from "lucide-react";
import s from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
    isRestarting: false,
  };

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);

    if (process.env.NODE_ENV === "production") {
      // logErrorToService(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ isRestarting: true });

    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        showDetails: false,
        isRestarting: false,
      });
    }, 1200);
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={s.errorContainer}
      >
        {/* Animated Background Elements */}
        <div className={s.backgroundElements}>
          <div className={s.floatingOrb1}></div>
          <div className={s.floatingOrb2}></div>
          <div className={s.floatingOrb3}></div>
        </div>

        {/* Main Error Content */}
        <motion.div
          className={s.errorContent}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.2,
            },
          }}
        >
          {/* Header with Icon */}
          <motion.div
            className={s.errorHeader}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className={s.errorIconContainer}
              animate={{
                rotate: [0, -5, 5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              <Shield className={s.shieldIcon} />
              <AlertTriangle className={s.alertIcon} />
            </motion.div>

            <h1 className={s.errorTitle}>
              System Protection
              <span className={s.errorSubtitle}>Active</span>
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            className={s.errorMessage}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className={s.errorDescription}>
              Our error boundary has intercepted an issue to prevent application
              failure.
            </p>

            {this.state.error && (
              <motion.div
                className={s.errorCard}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className={s.errorType}>Error Type</div>
                <code className={s.errorText}>
                  {this.state.error.toString()}
                </code>
              </motion.div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className={s.actionButtons}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={this.handleReset}
              className={`${s.errorButton} ${s.primaryButton}`}
              disabled={this.state.isRestarting}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(74, 222, 128, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {this.state.isRestarting ? (
                <>
                  <RefreshCw className={s.spinningIcon} />
                  Restoring...
                </>
              ) : (
                <>
                  <RefreshCw className={s.buttonIcon} />
                  Restart Application
                </>
              )}
            </motion.button>

            {this.state.errorInfo && (
              <motion.button
                onClick={this.toggleDetails}
                className={`${s.errorButton} ${s.secondaryButton}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {this.state.showDetails ? (
                  <>
                    <ChevronUp className={s.buttonIcon} />
                    Hide Technical Details
                  </>
                ) : (
                  <>
                    <ChevronDown className={s.buttonIcon} />
                    Show Technical Details
                  </>
                )}
              </motion.button>
            )}
          </motion.div>

          {/* Error Details */}
          {this.state.errorInfo && (
            <motion.div
              className={s.errorDetails}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: this.state.showDetails ? "auto" : 0,
                opacity: this.state.showDetails ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className={s.detailsHeader}>
                <span>Component Stack Trace</span>
              </div>
              <pre className={s.errorStack}>
                {this.state.errorInfo.componentStack}
              </pre>
            </motion.div>
          )}

          {/* Support Section */}
          <motion.div
            className={s.supportSection}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className={s.supportContent}>
              <Mail className={s.mailIcon} />
              <div>
                <p className={s.supportText}>Need immediate assistance?</p>
                <a href="mailto:fuschteyy@gmail.com" className={s.contactEmail}>
                  fuschteyy@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Status Bar */}
          <motion.div
            className={s.statusBar}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className={s.statusIndicator}>
              <div className={s.statusPulse}></div>
              Error Boundary Active • {new Date().toLocaleString()}
            </div>
          </motion.div>
        </motion.div>

        {/* Restart Overlay */}
        {this.state.isRestarting && (
          <motion.div
            className={s.restartOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className={s.restartContent}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <RefreshCw className={s.restartIcon} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Restoring your application...
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    );
  }
}

export default ErrorBoundary;
