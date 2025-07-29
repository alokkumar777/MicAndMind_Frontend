import React from "react";

function Loader({ message = "Loading..." }) {
  return (
    <div
      className="loader-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255,255,255,0.75)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.3s",
      }}
    >
      <div className="loader-content text-center">
        {/* Custom spinner (CSS defined below) */}
        <div className="custom-spinner mb-3"></div>
        <div>
          <span className="loader-message text-primary">{message}</span>
        </div>
      </div>
      {/* Inline CSS for custom spinner & fade-in */}
      <style>{`
        .custom-spinner {
          margin: 0 auto;
          border: 6px solid #f3f3f3;
          border-top: 6px solid #007bff;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

export default Loader;
