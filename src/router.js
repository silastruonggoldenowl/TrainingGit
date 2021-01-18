/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PropTypes from "prop-types";
import { Login, Todos } from "./pages";

export const routeConfig = {
  login: {
    path: "/login",
    component: Login,
    privateRoute: false,
  },
  test: {
    path: "/test",
    component: () => <div>Test</div>,
    routes: {
      testSentry: {
        path: "/test/sentry",
        component: () => <div>test Sentry</div>,
      },
    },
  },
  home: {
    path: "/",
    component: Todos,
    privateRoute: true,
  },
  noMatch: {
    path: "*",
    component: () => <div>No Match</div>,
    privateRoute: false,
  },
};
function RouteConfig(props) {
  const { routes, authState, ...rest } = props;
  return (
    <Router>
      <Switch>
        {Object.values(routes || routeConfig).map((route) => (
          <Route
            key={route.path}
            path={route.path}
            render={() => {
              return !(!authState.signIn && route.privateRoute) ? (
                <>
                  <route.component routes={route.routes} {...rest} />
                  {route.routes && RouteConfig(route)}
                </>
              ) : (
                <Redirect
                  to={{
                    pathname: routeConfig.login.path,
                    state: { from: route.path },
                  }}
                />
              );
            }}
          />
        ))}
      </Switch>
    </Router>
  );
}

RouteConfig.defaultProps = {
  authState: {
    signIn: false,
  },
  routes: undefined,
};
RouteConfig.propTypes = {
  authState: PropTypes.exact({
    signIn: PropTypes.bool,
  }),
  routes: PropTypes.objectOf(PropTypes.object),
};
// RouteWithSubRoutes.defaultProps = {};
// RouteWithSubRoutes.propTypes = {};
const mapStateToProps = (state) => ({
  authState: state.authState,
});
export default connect(mapStateToProps)(RouteConfig);
