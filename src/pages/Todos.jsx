/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
import React from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  addStask,
  putFullStask,
  getStask,
  deleteStask,
  tick,
  tickAll,
  deleteAllStask,
  tickSave,
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
    const { getStaskHandler, authState } = this.props;
    getStaskHandler(authState.id);
  }

  onClickSaveAllBtn = () => {
    const { putFullStaskHandler, staskLocalState, authState, staskFirebaseState } = this.props;
    const staskState = {
      ...staskLocalState.data,
      ...staskFirebaseState.data,
    };
    putFullStaskHandler(authState.id, staskState);
  };

  header = (...props) => <div className="display-3 mt-3">{props[0].name}</div>;

  onEnterPress = (e) => {
    const { addStaskHandler } = this.props;
    if (e.charCode === 13 && e.target.value) {
      const data = {
        id: uuid(),
        name: e.target.value,
        isTick: false,
        savedFirebase: false,
      };
      addStaskHandler(data);
      e.target.value = "";
    }
  };

  todoTable = (...props) => {
    const [dataProps] = props;
    const { modeShowComplete, modeShowNotComplete } = this.state;
    const {
      tickAllHandler,
      deleteAllStaskHandler,
      authState,
      staskFirebaseState,
    } = this.props;
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
            onClick={() => {
              tickAllHandler(
                authState.id,
                {
                  ...staskFirebaseState.data,
                },
                everyTrue
              );
            }}
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
                  <div
                    key={item.id}
                    className={classnames({ "bg-success": item.savedFirebase })}
                  >
                    {this.showStask(
                      item.id,
                      item.isTick,
                      item.name,
                      item.savedFirebase
                    )}
                  </div>
                );
              })
            : dataMode.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={classnames({ "bg-success": item.savedFirebase })}
                  >
                    {this.showStask(
                      item.id,
                      item.isTick,
                      item.name,
                      item.savedFirebase
                    )}
                  </div>
                );
              })}
          <div className="d-flex align-items-center justify-content-between font-size-20">
            <button
              onClick={this.onClickSaveAllBtn}
              style={{ width: "100px", textAlign: "center" }}
              aria-hidden="true"
              type="button"
              className="btn btn-primary mx-3"
            >
              Save All
            </button>
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
              onClick={() => {
                deleteAllStaskHandler(authState.id, {
                  ...staskFirebaseState.data,
                });
              }}
              aria-hidden="true"
              className="py-3 pointer"
            >
              Clear complete
            </div>
          </div>
        </div>
      </div>
    );
  };

  showStask = (id, isChecked, name, saved) => {
    const {
      tickCompleteHandler,
      deleteStaskHandler,
      tickSaveHandler,
      authState,
    } = this.props;
    return (
      <div className="border-bottom w-100 font-size-25">
        <div className="d-flex justify-content-between align-items-center mx-3 py-2">
          <label htmlFor={`checkbox_${id}`} className="custom-checkbox">
            <input
              type="checkbox"
              name="checkbox"
              id={`checkbox_${id}`}
              onChange={() => {
                tickCompleteHandler(authState.id, {
                  id,
                  isTick: isChecked,
                  name,
                }, saved);
              }}
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
          <label htmlFor={`checkbox_save${id}`} className="custom-checkbox">
            <input
              type="checkbox"
              name="checkbox_save"
              id={`checkbox_save${id}`}
              onChange={() => {
                tickSaveHandler(authState.id, {
                  id,
                  isTick: isChecked,
                  name,
                }, saved);
              }}
              checked={saved}
            />
            <span className="checkmark" />
          </label>
          <i
            className="fas fa-times pointer"
            onClick={() => {
              deleteStaskHandler(authState.id, {
                id,
                isTick: isChecked,
                name,
                savedFirebase: saved,
              });
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  };

  convertFirebaseData = (data, value) => {
    const resultData = {...data}
    if(Object.values(resultData).length !== 0) {
    Object.values(resultData).forEach((item) => {
      resultData[item.id].savedFirebase = value;
    });}
    return resultData
  }

  render() {
    const { staskLocalState, logOut, staskFirebaseState } = this.props;
    const customStaskFirebaseState = this.convertFirebaseData(staskFirebaseState.data, true)
    const customStaskLocalState = this.convertFirebaseData(staskLocalState.data, false)
    const staskState = {
      ...customStaskLocalState,
      ...customStaskFirebaseState,
    };
    if (staskFirebaseState.loading) {
      return <div className="display-2 text-center">Loading</div>;
    }
    return (
      <div className="d-flex align-items-center flex-column">
        <this.header name="Todos" />
        <this.todoTable data={staskState || {}} />
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
  staskLocalState: state.staskLocalState,
  staskFirebaseState: state.staskFirebaseState,
});

const mapDispatchToProps = (dispatch) => ({
  getStaskHandler: (data) => {
    dispatch(getStask(data));
  },
  putFullStaskHandler: (id, data) => {
    dispatch(putFullStask(id, data));
  },
  addStaskHandler: (data) => {
    dispatch(addStask(data));
  },
  deleteStaskHandler: (id, data) => {
    dispatch(deleteStask(id, data));
  },
  tickCompleteHandler: (id, data, saved) => {
    dispatch(tick(id, data, saved));
  },
  tickSaveHandler: (id, data, saved) => {
    dispatch(tickSave(id, data, saved));
  },
  tickAllHandler: (id, data, everyTrue) => {
    dispatch(tickAll(id, data, everyTrue));
  },
  deleteAllStaskHandler: (id, data) => {
    dispatch(deleteAllStask(id, data));
  },
  logOut: () => {
    dispatch(signOutAction());
  },
});

App.defaultProps = {
  staskLocalState: {},
  authState: {
    signIn: false,
    id: null,
  },
  logOut: undefined,
  getStaskHandler: undefined,
  deleteAllStaskHandler: undefined,
  tickAllHandler: undefined,
  deleteStaskHandler: undefined,
  tickCompleteHandler: undefined,
  addStaskHandler: undefined,
  putFullStaskHandler: undefined,
  tickSaveHandler: undefined,
  staskFirebaseState: {
    loading: false,
    data: {}
  },
};

App.propTypes = {
  staskLocalState: PropTypes.objectOf(PropTypes.object),
  staskFirebaseState: PropTypes.exact({
    loading: PropTypes.bool,
    data: PropTypes.objectOf(PropTypes.object)
  }),
  authState: PropTypes.exact({
    signIn: PropTypes.bool,
    id: PropTypes.string,
  }),
  logOut: PropTypes.func,
  getStaskHandler: PropTypes.func,
  deleteAllStaskHandler: PropTypes.func,
  tickAllHandler: PropTypes.func,
  deleteStaskHandler: PropTypes.func,
  tickCompleteHandler: PropTypes.func,
  addStaskHandler: PropTypes.func,
  putFullStaskHandler: PropTypes.func,
  tickSaveHandler: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
