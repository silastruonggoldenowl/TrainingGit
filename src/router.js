/* eslint-disable import/no-cycle */
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
import { Login, Todos, Register } from "./pages";
import SentryComponent from "./components/SentryComponent/SentryComponent";

export const routeConfig = {
  login: {
    path: "/login",
    component: Login,
    privateRoute: false,
  },
  register: {
    path: "/register",
    component: Register,
    privateRoute: false,
  },
  test: {
    path: "/test",
    component: SentryComponent,
    routes: {
      testSentry: {
        path: "/test/sentry",
        component: () => {
          const a = {};
          console.log(a.b.c);
          return <div>test Sentry</div>;
        },
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
        {Object.values(routes).map((route) => (
          <Route
            key={route.path}
            path={route.path}
            render={() => {
              return !(!authState.signIn && route.privateRoute) ? (
                <>
                  <route.component
                    routes={route.routes}
                    authState={authState}
                    {...rest}
                  />
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

const mapStateToProps = (state) => ({
  authState: state.authState,
});
export default connect(mapStateToProps)(RouteConfig);
