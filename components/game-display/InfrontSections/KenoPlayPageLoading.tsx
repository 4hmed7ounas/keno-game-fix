import React from "react";

function KenoPlayPageLoading() {
  const ballImage = "/assets/imgs/red-ball4.png"; // Path from the public directory

  return (
    <div className=" bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-red-700 via-red-800 to-red-800 flex flex-col h-screen w-screen items-center justify-center gap-0">
      <div id="number-generator-wrapper">
        <div
          className={`sphere  animate-spin `}
          style={{
            backgroundImage: `url(${ballImage})`,
            backgroundSize: "cover",
          }}
        ></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/imgs/ball-holder2.png"
          alt="ball-wrapper"
          className="ball-holder"
        />
      </div>
      <div className="shadow"></div>
    </div>
  );
}

export default KenoPlayPageLoading;
