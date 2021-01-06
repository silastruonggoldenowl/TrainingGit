import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="todo-list">
          <h2>Đăng Nhập</h2>
          <input
            className="border border-1 p-2 my-1"
            placeholder="Tên đăng nhập"
          />
          <input
            className="border border-1 p-2 my-1"
            placeholder="Mật khẩu"
            type="Password"
          />
        </div>
      </>
    );
  }
}

export default Login;
