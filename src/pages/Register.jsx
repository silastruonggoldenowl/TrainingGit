import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Formik } from "formik";
import firebaseConfig from "../config/configFirebase";
import { signUpAction, signInWithFbAction } from "../store/actions/authActions";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onSubmitForm = (values) => {
    // eslint-disable-next-line no-unused-vars
    const { logUpHandler } = this.props;
    const { email, password } = values;
    firebaseConfig.firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        logUpHandler();
      })
      .catch((err) => {
        alert(err);
      });
  };

  formView = (props) => {
    const {
      isSubmitting,
      errors,
      handleSubmit,
      handleChange,
      touched,
      handleBlur,
    } = props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2 className="display-4 font-weight-bold mb-3">Sign Up</h2>
          <input
            className="border border-1 p-2 my-1 w-100 form-control"
            placeholder="Username"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>{(errors.email && touched.email && errors.email) || " "}</div>
          <input
            className="border border-1 p-2 my-1 w-100 form-control"
            placeholder="Password"
            name="password"
            type="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>{errors.password && touched.password && errors.password}</div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary my-1 w-100"
          >
            Sign Up
          </button>

          <div
            onClick={this.onClickSignUpWithFB}
            aria-hidden="true"
            className="btn btn-success my-1 w-100"
          >
            Sign in with FB
          </div>
        </div>
      </form>
    );
  };

  onClickSignUpWithFB = () => {
    firebaseConfig.firebase
      .auth()
      .signInWithPopup(firebaseConfig.FBProvider)
      .then(this.handlerLoginWithFB)
      .catch((error) => {
        console.log(error);
      });
  };

  handlerLoginWithFB = async (result) => {
    const { signInWithFB } = this.props;
    signInWithFB(result.user.email);
  };

  render() {
    const { authState, location } = this.props;
    if (authState.signIn) {
      return <Redirect to={location?.state?.from || "/"} />;
    }
    return (
      <div className="todo-list text-center">
        <Formik
          className="w-100"
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={this.onSubmitForm}
        >
          {this.formView}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logUpHandler: (data) => {
    dispatch(signUpAction(data));
  },
  signInWithFB: (data) => {
    dispatch(signInWithFbAction(data));
  },
});
const mapStateToProps = (state) => ({
  authState: state.authState,
});

Register.defaultProps = {
  logUpHandler: undefined,
  authState: {},
  location: {},
  signInWithFB: undefined,
};

Register.propTypes = {
  authState: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.objectOf(PropTypes.object),
  logUpHandler: PropTypes.func,
  signInWithFB: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
