// import { GENERAL_ERROR_MESSAGE } from "@/utils/constants/common-messages";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function GeneralErrorPage(props: {
  error?: string;
  onTryAgain?: any;
  status?: number;
}) {
  const { error, onTryAgain, status } = props;
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full min-h-96 w-full">
      {/* <h1>
        {status && status == 409
          ? "Invalid Url"
          : (error ?? GENERAL_ERROR_MESSAGE)}
      </h1> */}
      <Button
        onClick={() =>
          onTryAgain
            ? onTryAgain()
            : status && status == 409
              ? router.back()
              : router.reload()
        }
      >
        {status && status == 409 ? "Go Back" : "Try Again"}
      </Button>
    </div>
  );
}

export default GeneralErrorPage;
