import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type IPrimaryButtonProps = {
  href?: string;
  loading?: boolean;
  isDisabled?: boolean;
  loadinglabel?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
function PrimaryButton(props: IPrimaryButtonProps) {
  const { href, loading, isDisabled, loadinglabel, ...rest } = props;
  if (href) {
    return (
      <Button
        as={Link}
        href={href}
        isLoading={loading}
        loadingText={loadinglabel}
        fontFamily={"heading"}
        bgGradient={
          isDisabled
            ? "linear(to-r, gray.400,gray.400)"
            : "linear(to-r, red.400,pink.400)"
        }
        color={"white"}
        _hover={{
          bgGradient: isDisabled
            ? "linear(to-r, gray.400,gray.400)"
            : "linear(to-r, red.400,pink.400)",
          boxShadow: "xl",
        }}
        isDisabled={isDisabled}
        shadow={"md"}
        px={8}
        size={"sm"}
        type={props.type}
        onClick={isDisabled ? () => {} : props.onClick}
        className="disabled:bg-gray-500"
        {...rest}
      >
        {props.children}
      </Button>
    );
  }
  return (
    <Button
      isLoading={loading}
      loadingText={loadinglabel}
      fontFamily={"heading"}
      bgGradient={
        isDisabled
          ? "linear(to-r, gray.400,gray.400)"
          : "linear(to-r, red.400,pink.400)"
      }
      color={"white"}
      _hover={{
        bgGradient: isDisabled
          ? "linear(to-r, gray.400,gray.400)"
          : "linear(to-r, red.400,pink.400)",
        boxShadow: "xl",
      }}
      isDisabled={isDisabled}
      shadow={"lg"}
      px={8}
      type={props.type}
      onClick={isDisabled ? () => {} : props.onClick}
      className="disabled:bg-gray-500"
      {...rest}
    >
      {props.children}
    </Button>
  );
}

export default PrimaryButton;
