import { Component, createRef } from "react";
import {
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Mail,
  Shield,
} from "lucide-react";
import gsap from "gsap";
import s from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      isRestarting: false,
    };
    this.contentRef = createRef();
    this.titleRef = createRef();
  }

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasError && !prevState.hasError) {
      this.playEntranceAnimation();
    }
  }

  playEntranceAnimation = () => {
    if (!this.contentRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.fromTo(this.contentRef.current, 
      { opacity: 0, y: 100, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
    );

    const titleLines = this.contentRef.current.querySelectorAll(`.${s.headingLine} span`);
    if (titleLines.length) {
      tl.from(titleLines, {
        y: 120,
        rotateX: -90,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");
    }

    tl.from(`.${s.eyebrow}, .${s.iconRow}, .${s.desc}, .${s.errorCard}, .${s.actions}, .${s.support}, .${s.statusBar}`, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");
  };

  handleReset = () => {
    this.setState({ isRestarting: true });
    
    gsap.to(this.contentRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power3.in",
      onComplete: () => {
        setTimeout(() => {
          this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
            showDetails: false,
            isRestarting: false,
          });
        }, 1200);
      }
    });
  };

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const { error, errorInfo, showDetails, isRestarting } = this.state;

    return (
      <div className={s.container}>
        {/* Visual Overlays */}
        <div className={s.noise} aria-hidden="true" />
        <div className={s.scanlines} aria-hidden="true" />

        <div className={s.content} ref={this.contentRef}>
          <div className={s.header}>
            <div className={s.eyebrow}>
              <span className={s.eyebrowLine} />
              <span className={s.eyebrowText}>Security Protocol</span>
            </div>

            <div className={s.iconRow}>
              <div className={s.iconWrap}>
                <Shield className={s.shieldIcon} aria-hidden="true" />
                <AlertTriangle className={s.alertIcon} aria-hidden="true" />
              </div>
            </div>

            <h1 className={s.title}>
              <span className={s.headingLine}>
                <span>System</span>
              </span>
              <span className={s.headingLine}>
                <span className={s.titleAccent}>Protection</span>
              </span>
            </h1>

            <p className={s.desc}>
              Our high-integrity error boundary has intercepted a process anomaly
              to ensure application stability.
            </p>
          </div>

          {error && (
            <div className={s.errorCard}>
              <span className={s.errorType}>Exception Log</span>
              <code className={s.errorText}>{error.toString()}</code>
            </div>
          )}

          <div className={s.actions}>
            <button
              onClick={this.handleReset}
              disabled={isRestarting}
              className={`${s.btn} ${s.btnPrimary}`}
            >
              <RefreshCw size={14} className={`${s.btnIcon} ${isRestarting ? s.spinning : ""}`} />
              <span>{isRestarting ? "Restoring..." : "Re-Initialize"}</span>
            </button>

            {errorInfo && (
              <button
                onClick={this.toggleDetails}
                className={`${s.btn} ${s.btnSecondary}`}
              >
                {showDetails ? (
                  <>
                    <ChevronUp size={14} className={s.btnIcon} /> <span>Collapse</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} className={s.btnIcon} /> <span>Inspect</span>
                  </>
                )}
              </button>
            )}
          </div>

          {errorInfo && showDetails && (
            <div className={s.details}>
              <div className={s.detailsHeader}>Stack Trace Analysis</div>
              <pre className={s.stack}>{errorInfo.componentStack}</pre>
            </div>
          )}

          <div className={s.support}>
            <Mail size={16} className={s.mailIcon} aria-hidden="true" />
            <div>
              <p className={s.supportText}>Direct Support Channel</p>
              <a href="mailto:fuschteyy@gmail.com" className={s.supportEmail}>
                fuschteyy@gmail.com
              </a>
            </div>
          </div>

          <div className={s.statusBar}>
            <div className={s.statusDot} />
            <span>Boundary Monitor Active · {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {isRestarting && (
          <div className={s.overlay}>
            <RefreshCw size={48} className={s.spinning} />
            <p className={s.overlayText}>Synchronizing Application State...</p>
          </div>
        )}
      </div>
    );
  }
}

export default ErrorBoundary;
