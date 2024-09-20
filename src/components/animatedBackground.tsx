"use client";

import React from "react";

const AnimatedBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 animate-shine"
        style={{
          background:
            "linear-gradient(45deg, #ffcccb, #ff9999, #90EE90, #98FB98)",
          backgroundSize: "400% 400%",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
