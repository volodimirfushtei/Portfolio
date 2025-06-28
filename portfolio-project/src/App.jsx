import "./App.css";
import React from "react";

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader/Loader.jsx";
import Leyout from "./Components/Layout/Layout.jsx";

function App() {
  const Home = lazy(() => import("./pages/homePage/homePage.jsx"));
  const Contacts = lazy(() => import("./pages/contactsPage/contactsPage.jsx"));
  const Projects = lazy(() => import("./pages/projectsPage/projectsPage.jsx"));

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Leyout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
