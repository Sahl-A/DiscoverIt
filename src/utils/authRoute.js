import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps)(function authRoute(props) {
  const { component: Component, authenticated } = props;
  return (
    <Route
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
});
