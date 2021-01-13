import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

function PrivateRoute({ children, ...rest }) {
  const { signIn } = rest.authState;
  const { path, location } = rest;
  return (
    <Route
      path={path}
      location={location}
      render={() => {
        return signIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: path },
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

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(PrivateRoute);
