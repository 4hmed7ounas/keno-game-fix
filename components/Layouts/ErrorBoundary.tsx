import { GENERAL_ERROR_MESSAGE } from "@/utils/constants/common-messages";
import { Button } from "@chakra-ui/react";
import React, { PropsWithChildren, ReactNode } from "react";

class ErrorBoundary extends React.Component<PropsWithChildren> {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, errorMessage: null };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    console.log("Error on getDerivedStateFromError", error);
    return { hasError: true, errorMessage: error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log("ErrorBoundary error----------------------", error);
    // console.log({ error, errorInfo })
    console.log("ErrorBoundary errorInfo", errorInfo);
  }
  render() {
    const state = this.state as { hasError: boolean; errorMessage?: string };
    // Check if the error is thrown
    if (state.hasError) {
      return (
        <div className="flex flex-col gap-4 justify-center items-center h-full min-h-96 w-full">
          <h1>{GENERAL_ERROR_MESSAGE}</h1>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </div>
      );
    }
    // You can render any custom fallback UI

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
