import "./App.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { OverlayProvider } from "./Components/OverlayProvider/OverlayProvider";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary.jsx";
import Loader from "./Components/Loader/Loader.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Overlay from "./Components/Overlay/Overlay.jsx";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop.jsx";
import CustomCursor from "./Components/CustomCursor/CustomCursor.jsx";

/* ── Lazy pages ── */
const Home = lazy(() => import("./pages/homePage/homePage.jsx"));
const Contacts = lazy(() => import("./pages/contactsPage/contactsPage.jsx"));
const Projects = lazy(() => import("./pages/projectsPage/projectsPage.jsx"));
const Tech = lazy(() => import("./pages/TechPage/TechPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFoundPage/NotFoundPage.jsx"));
const TestError = lazy(() => import("./Components/TestError/TestError.jsx"));

/* ── Preload критичних сторінок після першого рендеру ── */
const preload = () =>
  Promise.all([
    import("./pages/homePage/homePage.jsx"),
    import("./pages/contactsPage/contactsPage.jsx"),
    import("./pages/projectsPage/projectsPage.jsx"),
    import("./pages/TechPage/TechPage.jsx"),
  ]);

/* ── Toast styles ── */
const toastStyle = {
  base: {
    borderRadius: "0", 
    background: "#0d0d0d",
    color: "#f5f5f0",
    fontSize: "0.78rem",
    fontFamily: '"DM Mono", monospace',
    letterSpacing: "0.06em",
    padding: "0.85rem 1.25rem",
    border: "1px solid rgba(245,245,240,0.08)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  success: {
    background: "#0d0d0d",
    border: "1px solid #e8f53c",
    color: "#e8f53c",
  },
  error: {
    background: "var(--color-surface)",
    border: "1px solid #ff4b4b",
    color: "#ff4b4b",
  },
  loading: { background: "#0d0d0d", border: "1px solid rgba(245,245,240,0.2)" },
};

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    preload().then(() => {
      // Loader показується мінімум 2s (щоб анімація встигла відпрацювати)
      const id = setTimeout(() => setLoading(false), 3400);
      return () => clearTimeout(id);
    });
  }, []);

  if (loading) return <Loader /> ;

  return (
    <OverlayProvider>
      <ErrorBoundary>
        <CustomCursor />
        <ScrollToTop />
        <Overlay />

        <Suspense
          fallback={
            <div style={{ background: "var(--bg-color)", minHeight: "100vh" }} />
          }
        >

          <Routes location={location}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="projects" element={<Projects />} />
              <Route path="tech" element={<Tech />} />
              <Route path="error" element={<TestError />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>

        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            style: toastStyle.base,
            success: { style: { ...toastStyle.base, ...toastStyle.success } },
            error: { style: { ...toastStyle.base, ...toastStyle.error } },
            loading: { style: { ...toastStyle.base, ...toastStyle.loading } },
          }}
        />
      </ErrorBoundary>
    </OverlayProvider>
  );
}

export default App;
