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

  return (
    <Suspense fallback={<Loader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Leyout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
