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
  home: {
    path: "/",
    component: Todos,
    privateRoute: true,
    routes: {
      login: {
        path: "/login",
        component: Login,
        privateRoute: false,
      },
    },
    noMatch: {
      path: "*",
      component: <>No Match</>,
      privateRoute: false,
    },
  },
};

function RouteWrap(route) {
  return !route.privateRoute ? (
    <Route
      path={route.path}
      render={() => <route.component component={route.component} />}
    />
  ) : (
    <Redirect
      to={{
        pathname: routesConfig.home.routes.login.path,
        state: { from: route.path },
      }}
    />
  );
}

function RouteWithSubRoutes(props) {
  const { routes, path, component, privateRoute } = props;
  return (
    <>
      {routes &&
        Object.values(routes).map((route) => (
          <RouteWithSubRoutes
            key={route.path}
            path={route.path}
            component={route.component}
            privateRoute={route.privateRoute}
            routes={route.routes}
          />
        ))}
      <RouteWrap
        path={path}
        component={component}
        privateRoute={privateRoute}
        routes={routes}
      />
    </>
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

RouteWithSubRoutes.defaultProps = {
  routes: {},
  path: "",
  component: {},
  privateRoute: false,
};

RouteWithSubRoutes.propTypes = {
  routes: PropTypes.objectOf(PropTypes.object),
  path: PropTypes.string,
  component: PropTypes.symbol,
  privateRoute: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(RouteConfig);
