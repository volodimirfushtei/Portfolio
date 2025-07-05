import "./App.css";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./Components/Loader/Loader.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBondary.jsx";
import Overlay from "./Components/Overlay/Overlay.jsx";
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
      const timer = setTimeout(() => setLoading(false), 2000); // Зменшено час завантаження
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <Suspense fallback={<Loader minimal={true} />}>
            <Overlay key={location.pathname} />
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
          </Suspense>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
