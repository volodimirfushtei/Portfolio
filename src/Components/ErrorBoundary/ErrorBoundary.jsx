import { Component } from "react";
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
    console.error("ErrorBoundary caught:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
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
    if (!this.state.hasError) return this.props.children;

    const { error, errorInfo, showDetails, isRestarting } = this.state;

    return (
      <div className={s.container}>
        {/* Content */}
        <div className={s.content}>
          {/* Header */}
          <div className={s.header}>
            <div className={s.eyebrow}>
              <span className={s.eyebrowLine} />
              <span className={s.eyebrowText}>Error Boundary</span>
            </div>

            <div className={s.iconRow}>
              <div className={s.iconWrap}>
                <Shield className={s.shieldIcon} />
                <AlertTriangle className={s.alertIcon} />
              </div>
            </div>

            <h1 className={s.title}>
              System
              <br />
              <span className={s.titleAccent}>Protection</span>
            </h1>

            <p className={s.desc}>
              Our error boundary has intercepted an issue to prevent application
              failure.
            </p>
          </div>

          {/* Error card */}
          {error && (
            <div className={s.errorCard}>
              <span className={s.errorType}>Error Type</span>
              <code className={s.errorText}>{error.toString()}</code>
            </div>
          )}

          {/* Actions */}
          <div className={s.actions}>
            <button
              onClick={this.handleReset}
              disabled={isRestarting}
              className={`${s.btn} ${s.btnPrimary}`}
            >
              <RefreshCw size={14} className={isRestarting ? s.spinning : ""} />
              {isRestarting ? "Restoring…" : "Restart Application"}
            </button>

            {errorInfo && (
              <button
                onClick={this.toggleDetails}
                className={`${s.btn} ${s.btnSecondary}`}
              >
                {showDetails ? (
                  <>
                    <ChevronUp size={14} /> Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} /> Show Details
                  </>
                )}
              </button>
            )}
          </div>

          {/* Stack trace */}
          {errorInfo && (
            <div className={`${s.details} ${showDetails ? s.detailsOpen : ""}`}>
              <div className={s.detailsHeader}>Component Stack Trace</div>
              <pre className={s.stack}>{errorInfo.componentStack}</pre>
            </div>
          )}

          {/* Support */}
          <div className={s.support}>
            <Mail size={14} className={s.mailIcon} />
            <div>
              <p className={s.supportText}>Need immediate assistance?</p>
              <a href="mailto:fuschteyy@gmail.com" className={s.supportEmail}>
                fuschteyy@gmail.com
              </a>
            </div>
          </div>

          {/* Status bar */}
          <div className={s.statusBar}>
            <div className={s.statusDot} />
            <span>Error Boundary Active · {new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Restart overlay */}
        {isRestarting && (
          <div className={s.overlay}>
            <RefreshCw size={32} className={s.overlayIcon} />
            <p className={s.overlayText}>Restoring your application…</p>
          </div>
        )}
      </div>
    );
  }
}

export default ErrorBoundary;
