import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import React from "react";

function PrivateRoute({ children }) {
  const isOK = true;
  return (
    <Route
      render={({ location }) => {
        return isOK ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

PrivateRoute.defaultProps = {
  children: {},
};

PrivateRoute.propTypes = {
  children: PropTypes.objectOf(PropTypes.object),
};

export default PrivateRoute;
