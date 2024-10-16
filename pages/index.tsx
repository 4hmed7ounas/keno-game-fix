import KenoGamePlay from "@/components/game-display";
import GlassBallWithSmallBalls from "@/components/threejsmodel/threejsmodel";
import ThreeJSScene from "@/components/threejsmodel/threejsmodel";
import { KenoPlayManagerProvider } from "@/contexts/game-managers/KenoPlayManagerContext";
import React from "react";

function KenoGameDisplay() {
  return (
    //     <KenoPlayManagerProvider>
    // <KenoGamePlay />

    // </KenoPlayManagerProvider>
    <div>
      <GlassBallWithSmallBalls />
    </div>
  );
}

export default KenoGameDisplay;
