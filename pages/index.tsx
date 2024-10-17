import KenoGamePlay from "@/components/game-display";
import GlassBall from "@/components/threejsmodel/threejsmodel";
import GlassBallWithSmallBalls from "@/components/threejsmodel/threejsmodel";
import { KenoPlayManagerProvider } from "@/contexts/game-managers/KenoPlayManagerContext";
import React from "react";

function KenoGameDisplay() {
  return (
    <div
      style={{
        margin: "0",
        backgroundImage: `url('/assets/imgs/bg.png')`, // Replace with your image path
        backgroundSize: "cover", // or 'contain' based on your need
        backgroundPosition: "center",
        objectFit: "cover",
        // height: "100vh", // Adjust height as needed
        // width: "100vw", // Adjust width as needed
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <GlassBall /> */}
      <GlassBallWithSmallBalls />
    </div>
  );
}

export default KenoGameDisplay;
