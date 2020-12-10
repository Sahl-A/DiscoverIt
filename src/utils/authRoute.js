import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function authRoute(props) {
  const { component: Component, authenticated } = props;
  return (
    <Route
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
