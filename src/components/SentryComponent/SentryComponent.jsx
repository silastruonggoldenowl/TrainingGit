/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
import React from "react";
import PropTypes from "prop-types";
import RouteConfig from "../../router";

function SentryComponent(props) {
  const { routes } = props;
  return (
    <>
      <div>Test Top</div>
      {routes && <RouteConfig {...props} />}
      <div>Test Bottom</div>
    </>
  );
}

SentryComponent.defaultProps = {
  routes: {},
};
SentryComponent.propTypes = {
  routes: PropTypes.objectOf(PropTypes.object),
};

export default SentryComponent;
