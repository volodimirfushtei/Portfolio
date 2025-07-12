import "./App.css";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./Components/Loader/Loader.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBondary.jsx";
import Overlay from "./Components/Overlay/Overlay.jsx";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop.jsx";
// Preload компонентів
const preloadComponents = () => {
  const components = [
    import("./pages/homePage/homePage.jsx"),
    import("./pages/contactsPage/contactsPage.jsx"),
    import("./pages/projectsPage/projectsPage.jsx"),
    import("./pages/TechPage/TechPage.jsx"),
  ];
  return Promise.all(components);
};

// Lazy-loaded з попереднім завантаженням
const Home = lazy(() => import("./pages/homePage/homePage.jsx"));
const Contacts = lazy(() => import("./pages/contactsPage/contactsPage.jsx"));
const Projects = lazy(() => import("./pages/projectsPage/projectsPage.jsx"));
const Tech = lazy(() => import("./pages/TechPage/TechPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFoundPage/NotFoundPage.jsx"));
const TestError = lazy(() => import("./Components/TestError/TestError.jsx"));

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Попереднє завантаження компонентів
    preloadComponents().then(() => {
      const timer = setTimeout(() => setLoading(false), 2500); // Зменшено час завантаження
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <Suspense fallback={null}>
            <Overlay key={location.pathname} />
            {/* ✅ Активує прокрутку на верх при зміні маршруту */}
            <ScrollToTop />
            <Routes location={location}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="projects" element={<Projects />} />
                <Route path="tech" element={<Tech />} />
                <Route path="*" element={<NotFound />} />
                <Route path="error" element={<TestError />} />
              </Route>
            </Routes>
            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={8}
              toastOptions={{
                style: {
                  borderRadius: "8px",
                  background: "#333",
                  color: "#fff",
                  fontSize: "16px",
                  padding: "16px",
                  border: "1px solid #ccc",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                },
                success: {
                  style: {
                    background: "#4CAF50",
                    color: "#fff",
                    icon: "✅",
                  },
                },
                error: {
                  style: {
                    background: "#f44336",
                    color: "#fff",
                    icon: "❌",
                  },
                },
                loading: {
                  style: {
                    background: "#2196F3",
                    color: "#fff",
                    icon: "⌛",
                  },
                },
                complete: {
                  style: {
                    background: "#4CAF59",
                    color: "#fff",
                    icon: "✅",
                  },
                },
              }}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
