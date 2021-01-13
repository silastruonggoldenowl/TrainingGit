import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./configureReduxPersisGate";
import { Login, Todos } from "./Pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/dist/tailwind.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { PrivateRouter } from "./Components";
import Sentry from "./configSentry";

function fallbackComponent({ error, componentStack }) {
  return (
    <>
      <div>You have encountered an error</div>
      <div>{error.toString()}</div>
      <div>{componentStack}</div>
    </>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Sentry.ErrorBoundary fallback={fallbackComponent}>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRouter path="/">
              <Todos />
            </PrivateRouter>
            <Route path="*">
              <>No Match</>
            </Route>
          </Switch>
        </BrowserRouter>
      </Sentry.ErrorBoundary>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
