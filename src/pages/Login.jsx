import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Formik } from "formik";
import firebaseConfig from "../firebaseConfig";
import { signInAction, signInWithFbAction } from "../Store/actions/authActions";

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
        logInHandler({ email: result.user.email });
      })
      .catch((e) => {
        alert(e.code);
      });
  };

  formView = (props) => {
    const {
      // isSubmitting,
      errors,
      handleSubmit,
      handleChange,
      touched,
      handleBlur,
    } = props;
    // const a = {};
    // console.log(a.b.c);
    return (
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2 className="display-4 font-weight-bold mb-3">Sign In</h2>
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
            // disabled={isSubmitting}
            className="btn btn-primary my-1 w-100"
          >
            Sign In
          </button>

          <div
            onClick={this.onClickSignInWithFB}
            aria-hidden="true"
            className="btn btn-success my-1 w-100"
          >
            Sign in with FB
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
    signInWithFB(result.user.email);
  };

  onClickSignInWithEmail = () => {
    firebaseConfig.firebase
      .auth()
      .createUserWithEmailAndPassword("example@gmail.com", "123456789");
  };

  render() {
    const { authState, location } = this.props;
    if (authState.signIn) {
      return <Redirect to={location?.state?.from || "/"} />;
    }
    // console.log(authState);
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
  authState: {},
  location: {},
};

Login.propTypes = {
  signInWithFB: PropTypes.func,
  authState: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.objectOf(PropTypes.object),
  logInHandler: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
