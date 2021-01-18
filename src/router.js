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

const routesConfig = {
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

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={() => {
        return !route.privateRoute ? (
          <>
            <route.component component={route.component} />
            {route.routes && <RouteConfig routes={route.routes} />}
          </>
        ) : (
          <Redirect
            to={{
              pathname: routesConfig.login.path,
              state: { from: route.path },
            }}
          />
        );
      }}
    />
  );
}

function RouteConfig(props) {
  const { authState, routes } = props;
  const routesParam = routes || routesConfig;
  return (
    <Router>
      <Switch>
        {Object.values(routesParam).map((route) => (
          <RouteWithSubRoutes
            key={route.path}
            path={route.path}
            component={route.component}
            privateRoute={route.privateRoute && !authState.signIn}
            routes={route.routes}
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
