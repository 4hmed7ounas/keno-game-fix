//
import React, { useState } from "react";
import { LogoHeader } from "../common/Logo";
// import { getVersion } from "@tauri-apps/api/app";
 

function PageLoading() { 
  const version = "1.0";

  return (
    <div className="flex flex-col gap-2 justify-evenly items-center h-screen">
      <div className="flex flex-col h-full items-center justify-end animate-pulse">
        <img
          width={50}
          height={50}
          className="animate-spin"
          src={"/assets/imgs/logo.png"}
          alt="Logo"
        />
        <LogoHeader />
      </div>

      <div className="flex flex-col h-full justify-end pb-8">
        {version && <p> Version {version}</p>}
      </div>
    </div>
  );
}

export default PageLoading;
