import React from "react";

const NotFoundPage = () => {
  return (
    <div
      style={{
        position: "relative",
        zIndex: "1",
        height: "100vh",
        width: "100%",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        overflow: "hidden",
        backgroundImage: "url('/images/ingo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="relative top-0 left-0 w-full h-full bg-cover glass-effect 
      "
      ></div>
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          position: "absolute",
          top: "20%",
          left: "50%",
          fontSize: "8rem",
          transform: "translate(-50%, -50%)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        404
      </h1>
      <h2
        style={{
          textAlign: "center",
          color: "#fff",
          position: "absolute",
          top: "40%",
          left: "50%",
          fontSize: "2rem",
          transform: "translate(-50%, -50%)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#fff",
          position: "absolute",
          top: "60%",
          left: "50%",
          fontSize: "1.2rem",
          transform: "translate(-50%, -50%)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        The page you are looking for does not exist. You may check authorization
        or try again later. Our social pages:
      </p>
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 10px",
            fontSize: "2rem",
            backgroundColor: "#a1862c",
            color: "#fff8dc",
            padding: "4px 6px",
            borderRadius: "50%",
          }}
        >
          <i className="ri-facebook-fill"></i>
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 10px",
            fontSize: "2rem",
            backgroundColor: "#a1862c",
            color: "#fff8dc",
            padding: "4px 6px",
            borderRadius: "50%",
          }}
        >
          <i className="ri-instagram-fill"></i>
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 10px",
            fontSize: "2rem",
            backgroundColor: "#a1862c",
            color: "#fff8dc",
            padding: "4px 6px",
            borderRadius: "50%",
          }}
        >
          <i className="ri-linkedin-fill w-5"></i>
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
