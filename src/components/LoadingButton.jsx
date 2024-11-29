import React from "react";
import { Button, Spinner } from "@nextui-org/react";

const LoadingButton = ({ text, loading, onClick }) => {
  return (
    <Button color="primary" className="w-full" onClick={onClick}>
      {loading ? (
        <Spinner color="secondary" size="sm" />
      ) : (
        <span className="text-white font-semibold">{text}</span>
      )}
    </Button>
  );
};

export default LoadingButton;