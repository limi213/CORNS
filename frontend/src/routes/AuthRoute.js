import React from "react";
import { Route, Redirect } from "react-router-dom";
import IsLogin from "auth/IsLogin";

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        IsLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default AuthRoute;
