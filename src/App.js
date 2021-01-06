import React from "react";
import { PropTypes } from "prop-types";
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
} from "./Store/actions";

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

  header = (...props) => <div className="display-3">{props[0].name}</div>;

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
      <>
        <input
          type="text"
          defaultValue=""
          onKeyPress={this.onEnterPress}
          className="border border-1"
        />
        <div className="staskList">
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
          <div>
            <div onClick={() => tickAllHandler()} aria-hidden="true">
              Select All
            </div>
            <div onClick={() => deleteAllStaskHandler()} aria-hidden="true">
              Delete All complete
            </div>
            <div
              onClick={() => {
                this.setState({
                  modeShowComplete: false,
                  modeShowNotComplete: false,
                });
              }}
              aria-hidden="true"
            >
              Show all stask
            </div>
            <div>
              <div
                onClick={() => {
                  this.setState({
                    modeShowComplete: true,
                    modeShowNotComplete: false,
                  });
                }}
                aria-hidden="true"
              >
                Show stask complete
              </div>
            </div>
            <div
              onClick={() => {
                this.setState({
                  modeShowComplete: false,
                  modeShowNotComplete: true,
                });
              }}
              aria-hidden="true"
            >
              Show stask not complete
            </div>
          </div>
        </div>
      </>
    );
  };

  showStask = (id, isChecked, name) => {
    const { tickCompleteHandler, deleteStaskHandler } = this.props;
    return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => tickCompleteHandler(id)}
          />
          <div className={classnames({ "line-through": isChecked })}>
            {name}
          </div>
          <i
            className="fas fa-times"
            onClick={() => deleteStaskHandler(id)}
            aria-hidden="true"
          />
        </div>
      </>
    );
  };

  render() {
    const { staskState } = this.props;
    // console.log(Object.keys(staskState.data));
    // if (!staskState?.data) {
    //   return <Loading/>
    // }
    return (
      <div className="todo-list">
        <this.header name="Todos" />
        <this.todoTable data={staskState.data || []} />
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
});

App.defaultProps = {
  staskState: {},
  getStaskHandler: undefined,
  deleteAllStaskHandler: undefined,
  tickAllHandler: undefined,
  deleteStaskHandler: undefined,
  tickCompleteHandler: undefined,
  addStaskHandler: undefined,
};

App.propTypes = {
  staskState: PropTypes.objectOf(PropTypes.object),
  getStaskHandler: PropTypes.func,
  deleteAllStaskHandler: PropTypes.func,
  tickAllHandler: PropTypes.func,
  deleteStaskHandler: PropTypes.func,
  tickCompleteHandler: PropTypes.func,
  addStaskHandler: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
