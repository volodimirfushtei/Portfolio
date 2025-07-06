import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          position: "absolute",
          top: "20%",
          left: "50%",
          fontSize: "10rem",
          transform: "translate(-50%, -50%)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          fontFamily: "cursive",
        }}
      >
        404
      </h1>

      <img
        src="/images/notfound.jpg"
        alt="404"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        loading="lazy"
      />
    </div>
  );
};

export default NotFoundPage;
