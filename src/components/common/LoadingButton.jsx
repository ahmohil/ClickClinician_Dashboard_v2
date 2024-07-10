import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const LoadingButton = ({ isLoading, onClick, children, ...props }) => {
  return (
    <Button
      variant="primary"
      className="mt-4"
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;