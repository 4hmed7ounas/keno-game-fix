 
import { HStack, Heading } from "@chakra-ui/react";
import React from "react";

interface LogoProps {
  large?: boolean | null;
}
function Logo({ large }: LogoProps) {
  return (
    <HStack align={"center"} justify={"center"} w={"fit"}>
      <LogoIcon large={large} />
      <LogoHeader large={large} />
    </HStack>
  );
}

export function LogoIcon({ large }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      width={large ? 75 : 50}
      height={large ? 75 : 50}
      src={"/assets/imgs/logo.png"}
      alt="Logo"
    />
  );
}

export function LogoHeader({ large }: LogoProps) {
  const version  = '1.0';

  return (
    <h1
      className={`flex flex-wrap text-wrap justify-center items-center h-fit font-extrabold text-2xl ${large ? "text-5xl text-shadow-md" : ""}`}
    >
      <span className="text-teal-600">GetAction </span>{" "}
      <span className="text-red-600">Games</span>{" "}
      <span className="text-sm">v{version}</span>
    </h1>
  );
}

export default Logo;
