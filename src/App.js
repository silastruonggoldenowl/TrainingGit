import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/dist/tailwind.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import classnames from 'classnames';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      localStorage: [{
        id: 3,
        isTick: true,
        name: "6456"
      }]
    }
  }

  header = (...props)=>{
    return(
      <div className='display-3'>
        {props[0].name}
      </div>
    )
  }

  onEnterPress = (e) =>{
    let { localStorage } = this.state
    if(e.charCode === 13 && e.target.value){
      localStorage.push({
        id: Math.random(),
        name: e.target.value,
        isTick: false
      })
      this.setLocalStorage(localStorage)
      e.target.value = '';
    }
  }

  todoTable = (...props)=>{
    return(
      <>
        <input type='text' defaultValue='' onKeyPress={this.onEnterPress} className="border border-1"/>
        <div className="staskList">
          {this.state.localStorage.map((item)=>{
            return (
              <div key={item.id}>
                {this.showStask(item.id, item.isTick, item.name)}
              </div>
            )
          })}
          <div>
            <div onClick = {this.onClickSelectAll}>Select All</div>
            <div onClick = {this.onClickDeteleAll}>Delete All complete</div>
          </div>
        </div>
      </>
    )
  }

  onClickSelectAll = () =>{
    let { localStorage } = this.state
    let check
    
    if( localStorage.every((item)=>item.isTick === true))
      check = false
    else
      check = true

    localStorage = localStorage.map((item) => {
      item.isTick = check 
      return item
    })
    this.setLocalStorage(localStorage)
  }

  onClickDeteleAll = () =>{
    let { localStorage } = this.state
    localStorage = localStorage.filter((item) => item.isTick !== true)
    this.setLocalStorage(localStorage)
  }

  onClickCheckBox = (id, e) =>{
    let { localStorage } = this.state
    let index = this.findIndexItems(id)
    localStorage[index].isTick = e.target.checked
    this.setLocalStorage(localStorage)
  }

  setLocalStorage = (value) => {
    this.setState({
      localStorage: value
    })
  }

  findIndexItems = (id) =>{
    return this.state.localStorage.findIndex(item => item.id === id);
  }

  deleteOneItem = (id) =>{
    let { localStorage } = this.state
    localStorage = localStorage.filter(item => item.id !== id)
    this.setLocalStorage(localStorage)
  }

  showStask = (id, tick, name) =>{
    let {localStorage} = this.state
    let index = this.findIndexItems(id)
    return(
      <>
        <div className="d-flex justify-content-center align-items-center">
          <input type="checkbox" checked={localStorage[index].isTick} onClick={(e)=>this.onClickCheckBox(id, e)}/>
          <div className={classnames({"line-through":localStorage[index].isTick})}>{name}</div>
          <i className="fas fa-times" onClick={()=>this.deleteOneItem(id)}></i>
        </div>
      </>
    )
  }

  render(){
    return (
      <div className='d-flex flex-column justify-content-center align-items-center h-screen w-screen'>
        <this.header name={"Todos"}/>
        <this.todoTable />
      </div>
    );
  }
}
export default App