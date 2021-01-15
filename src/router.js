import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Todos } from "./pages";
import PrivateRouter from "./privateRouter";

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
    <PrivateRouter path={route.path}>
      <route.component component={route.component} />
    </PrivateRouter>
  );
}

export default function RouteConfig() {
  return (
    <Router>
      <Switch>
        {Object.values(routes).map((route) => (
          <RouteWithSubRoutes
            key={route.path}
            path={route.path}
            component={route.component}
            priavte={route.private}
          />
        ))}
      </Switch>
    </Router>
  );
}
