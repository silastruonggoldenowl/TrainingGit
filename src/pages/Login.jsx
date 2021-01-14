import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Formik } from "formik";
import firebaseConfig from "../config/configFirebase";
import { logInAction } from "../store/actions/authActions";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onSubmitForm = (values) => {
    const { logInHandler } = this.props;
    const { email, password } = values;
    logInHandler({ email, password });
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
        <div className="todo-list">
          <h2>Đăng Nhập</h2>
          <input
            className="border border-1 p-2 my-1"
            placeholder="Tên đăng nhập"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>{errors.email && touched.email && errors.email}</div>
          <input
            className="border border-1 p-2 my-1"
            placeholder="Mật khẩu"
            name="password"
            type="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>{errors.password && touched.password && errors.password}</div>
          <button type="submit" disabled={isSubmitting}>
            Đăng Nhập
          </button>
        </div>
      </form>
    );
  };

  onClickSignInWithFB = () => {
    firebaseConfig.firebase
      .auth()
      .signInWithPopup(firebaseConfig.FBProvider)
      .then(this.handlerLoginWithFB);
  };

  handlerLoginWithFB = async (result) => {
    console.log(result);
  };

  render() {
    const { authState, location } = this.props;
    if (authState.signIn) {
      return <Redirect to={location?.state?.from || "/"} />;
    }
    return (
      <>
        <div onClick={this.onClickSignInWithFB} aria-hidden="true">
          Đăng nhập với FB
        </div>
        <Formik
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
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logInHandler: (data) => {
    dispatch(logInAction(data));
  },
});
const mapStateToProps = (state) => ({
  authState: state.authState,
});

Login.defaultProps = {
  logInHandler: undefined,
  authState: {},
  location: {},
};

Login.propTypes = {
  authState: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.objectOf(PropTypes.object),
  logInHandler: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
