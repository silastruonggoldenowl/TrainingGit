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

const routes = {
  login: {
    path: "/login",
    component: Login,
    private: false,
  },
  home: {
    path: "/",
    component: Todos,
    private: true,
  },
  noMatch: {
    path: "*",
    component: <>No Match</>,
    private: false,
  },
};

function RouteWithSubRoutes(route) {
  return !route.priavte ? (
    <Route
      path={route.path}
      render={() => <route.component component={route.component} />}
    />
  ) : (
    <Redirect
      to={{
        pathname: routes.login.path,
        state: { from: route.path },
      }}
    />
  );
}

function RouteConfig(props) {
  const { authState } = props;
  return (
    <Router>
      <Switch>
        {Object.values(routes).map((route) => (
          <RouteWithSubRoutes
            key={route.path}
            path={route.path}
            component={route.component}
            priavte={route.private && !authState.signIn}
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

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(RouteConfig);
