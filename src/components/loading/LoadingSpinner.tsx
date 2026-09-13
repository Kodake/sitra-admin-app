"use client";

import React from "react";

const LoadingSpinner = () => {
  return (
    <>
      <div className="sitra-loading-overlay">
        <div className="sitra-loading-card">
          <div className="sitra-loader"></div>
        </div>
      </div>
      <style jsx>{`
        .sitra-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          pointer-events: all;
          animation: sitraFadeIn 0.15s ease-out;
        }

        .sitra-loading-card {
          padding: 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sitra-loader {
          width: 44px;
          height: 44px;
          border: 4px solid rgba(0, 122, 255, 0.2);
          border-top-color: #007aff;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: sitraSpin 0.85s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes sitraSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes sitraFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingSpinner;
