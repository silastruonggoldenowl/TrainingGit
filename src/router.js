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

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={() => {
        return !route.privateRoute ? (
          <>
            <route.component component={route.component} />
            {route.routes && (
              <Switch>
                {Object.values(route.routes).map((prop) => (
                  <RouteWithSubRoutes
                    key={prop.path}
                    path={prop.path}
                    component={prop.component}
                    privateRoute={prop.privateRoute}
                    routes={prop.routes}
                  />
                ))}
              </Switch>
            )}
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
  const { authState } = props;
  return (
    <Router>
      <Switch>
        {Object.values(routesConfig).map((route) => (
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
};

RouteConfig.propTypes = {
  authState: PropTypes.exact({
    signIn: PropTypes.bool,
  }),
};

// RouteWithSubRoutes.defaultProps = {};

// RouteWithSubRoutes.propTypes = {};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(RouteConfig);
