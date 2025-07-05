import React, { useState } from "react";

const TestError = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    const obj = null;
    return <div>{obj.someProperty}</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",

        height: "100vh",
        backgroundImage:
          "url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "white", fontSize: "24px" }}>
        Test for ErrorBoundary
      </h2>
      <button
        onClick={() => setShouldThrow(true)}
        style={{
          padding: "10px 20px",
          background: "#ff4444",
          color: "white",
          border: "white 1px solid",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Call Error
      </button>
    </div>
  );
};

export default TestError;
