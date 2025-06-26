import "./App.css";
import React from "react";

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/loader/loader.jsx";

function App() {
  const Home = lazy(() => import("./pages/homePage/homePage.jsx"));
  const Contacts = lazy(() => import("./pages/contactsPage/contactsPage.jsx"));
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
