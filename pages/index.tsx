import KenoGamePlay from "@/components/game-display";
import MainModel from "@/components/main-3Dmodel/mainmodel";
import { KenoPlayManagerProvider } from "@/contexts/game-managers/KenoPlayManagerContext";
import React from "react";

function KenoGameDisplay() {
  return (
    // <KenoPlayManagerProvider>
    //   <KenoGamePlay />
    //   <MainModel/>
    // </KenoPlayManagerProvider>
    <div
      style={{
        margin: "0",
        backgroundImage: `url('/assets/imgs/bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainModel />
    </div>
  );
}

export default KenoGameDisplay;
