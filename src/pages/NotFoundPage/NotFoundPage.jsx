import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <img
        src="/images/Programmer.jpg"
        alt="404"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        loading="lazy"
      />
    </div>
  );
};

export default NotFoundPage;
