import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Formik } from "formik";
import firebaseConfig from "../config/configFirebase";
import { signInAction, signInWithFbAction } from "../store/actions/authActions";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onSubmitForm = (values) => {
    const { logInHandler } = this.props;
    const { email, password } = values;
    firebaseConfig.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        logInHandler({ id: result.user.uid });
      })
      .catch((e) => {
        alert(e.code);
      });
  };

  formView = (props) => {
    const { errors, handleSubmit, handleChange, touched, handleBlur } = props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2 className="display-4 font-weight-bold mb-3">Log In</h2>
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

          <Link to="/register" className="float-right">
            Register page
          </Link>
          <button
            type="submit"
            // disabled={isSubmitting}
            className="btn btn-primary my-1 w-100"
          >
            Log in
          </button>

          <div
            onClick={this.onClickSignInWithFB}
            aria-hidden="true"
            className="btn btn-success my-1 w-100"
          >
            Log in with FB
          </div>
        </div>
      </form>
    );
  };

  onClickSignInWithFB = () => {
    firebaseConfig.firebase
      .auth()
      .signInWithPopup(firebaseConfig.FBProvider)
      .then(this.handlerLoginWithFB)
      .catch((e) => alert(e));
  };

  handlerLoginWithFB = async (result) => {
    const { signInWithFB } = this.props;
    signInWithFB({ id: result.user.uid });
  };

  render() {
    const { authState, location } = this.props;
    if (authState.signIn) {
      return <Redirect to={location?.state?.from || "/"} />;
    }
    return (
      <div className="w-100 mt-5 align-items-center justify-content-center d-flex">
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logInHandler: (data) => {
    dispatch(signInAction(data));
  },
  signInWithFB: (data) => {
    dispatch(signInWithFbAction(data));
  },
});
const mapStateToProps = (state) => ({
  authState: state.authState,
});

Login.defaultProps = {
  logInHandler: undefined,
  signInWithFB: undefined,
  authState: {
    signIn: false,
    id: null,
  },
  location: {
    state: {
      from: "/",
    },
  },
};

Login.propTypes = {
  signInWithFB: PropTypes.func,
  authState: PropTypes.exact({
    signIn: PropTypes.bool,
    id: PropTypes.string,
  }),
  location: PropTypes.exact({
    state: PropTypes.exact({
      from: PropTypes.string,
    }),
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
  }),
  logInHandler: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
