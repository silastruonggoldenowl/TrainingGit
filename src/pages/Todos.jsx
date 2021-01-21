import React from "react";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  addStask,
  getStask,
  deleteStask,
  tick,
  tickAll,
  deleteAllStask,
} from "../store/actions/staskActions";
import { signOutAction } from "../store/actions/authActions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modeShowComplete: false,
      modeShowNotComplete: false,
    };
  }

  UNSAFE_componentWillMount() {
    const { getStaskHandler } = this.props;
    getStaskHandler();
  }

  header = (...props) => <div className="display-3 mt-3">{props[0].name}</div>;

  onEnterPress = (e) => {
    const { addStaskHandler } = this.props;
    if (e.charCode === 13 && e.target.value) {
      const data = {
        id: uuid(),
        name: e.target.value,
        isTick: false,
      };
      addStaskHandler(data);
      e.target.value = "";
    }
  };

  todoTable = (...props) => {
    const [dataProps] = props;
    const { modeShowComplete, modeShowNotComplete } = this.state;
    const { tickAllHandler, deleteAllStaskHandler } = this.props;
    const everyTrue = Object.values(dataProps.data).every(
      (item) => item.isTick === true
    );
    let dataMode;
    if (modeShowComplete) {
      dataMode = Object.values(dataProps.data).filter(
        (item) => item.isTick === true
      );
    } else if (modeShowNotComplete) {
      dataMode = Object.values(dataProps.data).filter(
        (item) => item.isTick === false
      );
    }

    return (
      <div className="todo-list">
        <div className="d-flex align-items-end border-bottom w-100">
          <div
            onClick={() => tickAllHandler()}
            aria-hidden="true"
            className="d-block my-auto"
          >
            <i
              className="far fa-caret-square-down mx-2 pointer"
              style={{ fontSize: "45px", color: everyTrue ? "black" : "#eee" }}
            />
          </div>
          <input
            type="text"
            style={{ height: "50px", fontSize: "30px" }}
            defaultValue=""
            onKeyPress={this.onEnterPress}
            className="w-100 border-0 mx-2 outline-focus-none"
          />
        </div>
        <div className="staskList w-100">
          {!dataMode
            ? Object.values(dataProps.data).map((item) => {
                return (
                  <div key={item.id}>
                    {this.showStask(item.id, item.isTick, item.name)}
                  </div>
                );
              })
            : dataMode.map((item) => {
                return (
                  <div key={item.id}>
                    {this.showStask(item.id, item.isTick, item.name)}
                  </div>
                );
              })}
          <div className="d-flex align-items-center justify-content-between font-size-20">
            <div style={{ width: "150px", textAlign: "center" }}>
              {`${Object.values(dataProps.data).length} `}
              item
            </div>
            <div className="d-flex">
              <div
                onClick={() => {
                  this.setState({
                    modeShowComplete: false,
                    modeShowNotComplete: false,
                  });
                }}
                className={classnames("px-1 mx-1 pointer", {
                  "border border-info rounded":
                    !modeShowComplete && !modeShowNotComplete,
                })}
                aria-hidden="true"
              >
                All
              </div>
              <div
                onClick={() => {
                  this.setState({
                    modeShowComplete: true,
                    modeShowNotComplete: false,
                  });
                }}
                aria-hidden="true"
                className={classnames("px-1 mx-1 pointer", {
                  "border border-info rounded": modeShowComplete,
                })}
              >
                Completed
              </div>
              <div
                onClick={() => {
                  this.setState({
                    modeShowComplete: false,
                    modeShowNotComplete: true,
                  });
                }}
                className={classnames("px-1 mx-1 pointer", {
                  "border border-info rounded": modeShowNotComplete,
                })}
                aria-hidden="true"
              >
                Not complete
              </div>
            </div>

            <div
              style={{ width: "150px", textAlign: "center" }}
              onClick={() => deleteAllStaskHandler()}
              aria-hidden="true"
              className="py-3"
            >
              Clear complete
            </div>
          </div>
        </div>
      </div>
    );
  };

  showStask = (id, isChecked, name) => {
    const { tickCompleteHandler, deleteStaskHandler } = this.props;
    return (
      <div className="border-bottom w-100 font-size-25">
        <div className="d-flex justify-content-between align-items-center mx-3 my-2">
          <label htmlFor={`checkbox_${id}`} className="custom-checkbox">
            <input
              type="checkbox"
              name="checkbox"
              id={`checkbox_${id}`}
              onChange={() => tickCompleteHandler(id)}
              checked={isChecked}
            />
            <span className="checkmark" />
          </label>
          <div
            className={classnames({ "line-through": isChecked })}
            style={{ flex: "auto" }}
          >
            {name}
          </div>
          <i
            className="fas fa-times pointer"
            onClick={() => deleteStaskHandler(id)}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  };

  render() {
    const { staskState, logOut } = this.props;
    // console.log(Object.keys(staskState.data));
    // if (!staskState?.data) {
    //   return <Loading/>
    // }
    return (
      <div className="d-flex align-items-center flex-column">
        <this.header name="Todos" />
        <this.todoTable data={staskState.data || []} />
        <div
          className="btn btn-danger log-out"
          onClick={logOut}
          aria-hidden="true"
        >
          Log Out
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  staskState: state.staskState,
});

const mapDispatchToProps = (dispatch) => ({
  getStaskHandler: () => {
    dispatch(getStask());
  },
  addStaskHandler: (data) => {
    dispatch(addStask(data));
  },
  deleteStaskHandler: (data) => {
    dispatch(deleteStask(data));
  },
  tickCompleteHandler: (data) => {
    dispatch(tick(data));
  },
  tickAllHandler: () => {
    dispatch(tickAll());
  },
  deleteAllStaskHandler: () => {
    dispatch(deleteAllStask());
  },
  logOut: () => {
    dispatch(signOutAction());
  },
});

App.defaultProps = {
  staskState: {},
  logOut: undefined,
  getStaskHandler: undefined,
  deleteAllStaskHandler: undefined,
  tickAllHandler: undefined,
  deleteStaskHandler: undefined,
  tickCompleteHandler: undefined,
  addStaskHandler: undefined,
};

App.propTypes = {
  staskState: PropTypes.objectOf(PropTypes.object),
  logOut: PropTypes.func,
  getStaskHandler: PropTypes.func,
  deleteAllStaskHandler: PropTypes.func,
  tickAllHandler: PropTypes.func,
  deleteStaskHandler: PropTypes.func,
  tickCompleteHandler: PropTypes.func,
  addStaskHandler: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
