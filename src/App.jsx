import "./App.css";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./Components/Loader/Loader.jsx";
import Leyout from "./Components/Layout/Layout.jsx";

function App() {
  const location = useLocation();
  const Home = lazy(() => import("./pages/homePage/homePage.jsx"));
  const Contacts = lazy(() => import("./pages/contactsPage/contactsPage.jsx"));
  const Projects = lazy(() => import("./pages/projectsPage/projectsPage.jsx"));

  const Tech = lazy(() => import("./pages/TechPage/TechPage.jsx"));
  return (
    <Suspense fallback={<Loader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Leyout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tech" element={<Tech />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you are looking for does not exist.</p>
                </div>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
