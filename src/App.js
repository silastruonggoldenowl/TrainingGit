import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/dist/tailwind.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { uuid } from 'uuidv4';
import classnames from 'classnames';
import {
  addStask, 
  getStask, 
  deleteStask,
  tick,
  tickAll,
  deleteAllStask
} from './Store/actions';

import { connect } from "react-redux";
import { data } from 'autoprefixer';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modeShowComplete: false,
      modeShowNotComplete: false,
    }
  }

  UNSAFE_componentWillMount(){
    this.props.getStask()
  }

  header = (...props) => {
    return(
      <div className='display-3'>
        {props[0].name}
      </div>
    )
  }

  onEnterPress = (e) =>{
    if(e.charCode === 13 && e.target.value){
      let data = {
        id: uuid(),
        name: e.target.value,
        isTick: false
      }
      this.props.addStask(data);
      e.target.value = '';
    }
  }

  todoTable = (...props)=>{
    let [dataProps] = props
    let { modeShowComplete, modeShowNotComplete} = this.state
    let dataMode
    if(modeShowComplete){
      dataMode = dataProps.data.filter(item => item.isTick === true)
    } else if(modeShowNotComplete){
      dataMode = dataProps.data.filter(item => item.isTick === false)
    }
    return(
      <>
        <input type='text' defaultValue='' onKeyPress={this.onEnterPress} className="border border-1"/>
        <div className="staskList">
          {!dataMode? dataProps.data.map((item)=>{
            return (
              <div key={item.id}>
                {this.showStask(item.id, item.isTick, item.name)}
              </div>
            )
          }): dataMode.map((item)=>{
            return (
              <div key={item.id}>
                {this.showStask(item.id, item.isTick, item.name)}
              </div>
            )})
          }
          <div>
            <div onClick = {()=>this.props.tickAll()}>Select All</div>
            <div onClick = {()=>this.props.deleteAllStask()}>Delete All complete</div>
            <div onClick = {()=>this.setState({modeShowComplete: false, modeShowNotComplete: false })}>Show all stask</div>
            <div onClick = {()=>this.setState({modeShowComplete: true, modeShowNotComplete: false })}>Show stask complete</div>
            <div onClick = {()=>this.setState({modeShowComplete: false, modeShowNotComplete: true })}>Show stask not complete</div>
          </div>
        </div>
      </>
    )
  }

  showStask = (id, tick, name) =>{
    return(
      <>
        <div className="d-flex justify-content-center align-items-center">
          <input type="checkbox" checked={tick} onClick={()=>this.props.tickComplete(id)}/>
          <div className={classnames({"line-through":tick})}>{name}</div>
          <i className="fas fa-times" onClick={()=>this.props.deleteStask(id)}></i>
        </div>
      </>
    )
  }

  render(){
    let { staskState } = this.props
    console.log(this.props.staskState)
    // if (!staskState?.data) {
    //   return <Loading/>
    // }
    return (
      <div className='todo-list'>
        <this.header name={"Todos"}/>
        <this.todoTable data={staskState.data || []}/>
      </div>
    );
  }
}

class Loading extends React.Component {
  render(){
    return(
      <>
        <div className="display-2 d-flex align-items-center justify-content-center">
          Loading
        </div>
      </>
    )
  }
}


const mapStateToProps = state => ({
  staskState: state.staskState,
})

const mapDispatchToProps = dispatch => ({
  getStask: () => {dispatch(getStask())},
  addStask: (data) => {dispatch(addStask(data))},
  deleteStask: (data) => {dispatch(deleteStask(data))},
  tickComplete: (data) => {dispatch(tick(data))},
  tickAll: () => {dispatch(tickAll())},
  deleteAllStask: ()=> {dispatch(deleteAllStask())}
})

export default connect(mapStateToProps, mapDispatchToProps)(App)