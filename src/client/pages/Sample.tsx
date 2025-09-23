import React from "react";

const Sample = () => {
  return (
    <>
      <div>YOu are now in client</div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("role");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Sample;
