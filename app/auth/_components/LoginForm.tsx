import React from "react";
import CardWrapper from "./CardWrapper";

function LoginForm() {
  return (
    <CardWrapper
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/login"
      headerLabel="Welcome Back"
      showSocial
    >
      <></>
    </CardWrapper>
  );
}

export default LoginForm;
