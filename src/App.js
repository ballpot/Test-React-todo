import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Modal,ControlLabel,FormControl,FormGroup } from 'react-bootstrap';
import {browserHistory} from "react";
import './style.css'
var filterStr = "ALL"
var counter = 0
var che = false
var idEdit=0
var editCheck =false
var editTitle=""
var editDes=""
var iTemss = []
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      iTems : [],
      itemNew : ""
    }
  }
  
  componentDidMount = () => {
    if (!localStorage.getItem('iTems')) {
      this.setState({
        iTems: []
      })
    } else {
      let iTems = JSON.parse(localStorage.getItem('iTems'))
      this.setState({
        iTems: iTems
      })
    }
  }
  handdleChangeAdd(e){
    this.setState({
      itemNew: e.target.value
    })
  }
  onClickedAdd(){
    let iTems = [ ...this.state.iTems, { id:Date.now(),Title: this.state.itemNew ,Description:'Description', completed: false }  ]
    localStorage.setItem('iTems', JSON.stringify(iTems))
    this.setState({
      iTems: iTems,
      itemNew: '',
    })
  }
  handdleDelete(id){
    let iTems = this.state.iTems
    iTems.splice(id, 1)
    this.setState({
      iTems: iTems
    })
    localStorage.setItem('iTems', JSON.stringify(iTems))
  }
  handleCheck(id,e){
    let {iTems} = this.state
    for(var i = 0; i < iTems.length; i++) {
      if(id === i) {
        iTems[i].completed = e.target.checked
        if(e.target.checked){
          counter++
        }else{
          counter--
        }
        localStorage.setItem('iTems', JSON.stringify(iTems));
        ReactDOM.render(<App/>,document.getElementById('root'))
      }
    }
  }
  handleFilter(e){
    filterStr = e.target.name
    console.log(filterStr)
    ReactDOM.render(<App/>,document.getElementById('root'))
  }
  render() {
    let{ iTems} = this.state
        
    return (
      <div>
      
       <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <br />
          <div className="panel panel-default">
            <div className="panel-heading">Todo List <a>Completed <span className="badge">{counter}</span></a>
              <div style={{float:'right'}}>
                <button name = "All" type="button"  onClick={this.handleFilter.bind(this)}>All</button>
                <button name = "COMPLETE" type="button" onClick={this.handleFilter.bind(this)}>COMPLETE</button>
                <button name = "INCOMPLETE" type="button" onClick={this.handleFilter.bind(this)}>INCOMPLETE</button>
              </div>
            </div>
             <div className="panel-body">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">Title</span>
                    <input type="text" className="form-control" placeholder="List" aria-describedby="basic-addon1" 
                    onChange={this.handdleChangeAdd.bind(this)}  value={this.state.itemNew}/>
                </div>
                <br />
                <center>
                <button className="btn btn-primary" onClick={this.onClickedAdd.bind(this)}>ADD</button>
                </center>
              <br />
                <div>
                 <table className="table table-striped">
                  <tbody>
                  {
                    iTems.filter(function(iTems) {
                      if(filterStr === "COMPLETE")
                        return iTems.completed
                      else if(filterStr === "INCOMPLETE")
                        return !iTems.completed
                      else
                        return true
                    }).map((iTem,id)=>(
                      <tr key={id}>
                        <td  style={{textAlign:'right'}}>
                              <input id="box2" type="checkbox" style={{fontSize:'110%'}} onChange={this.handleCheck.bind(this,id)}
                              checked={iTem.completed} value={iTem.completed} />
                        </td>
                        <td style={{textAlign:'center'}}>
                              {
                                iTem.completed ?
                                <div style={{textDecoration:'line-through'}}>
                                  <div style={{fontSize:'1.2em'}}>
                                   { 
                                    iTem.Title 
                                   }
                                   </div>
                                    <div style={{marginLeft:'20%',fontSize:'0.8em'}}>
                                   {
                                     iTem.Description
                                   }
                                   </div>
                                  
                                </div> : 
                                <div>
                                  <div style={{fontSize:'1.2em'}}>
                                   { 
                                    iTem.Title
                                   }
                                   </div>
                                   <div style={{marginLeft:'20%',fontSize:'0.8em'}}>
                                   {
                                     iTem.Description
                                   }
                                   </div>
                                </div>
                              }
                              
                        </td>
                        <td style={{textAlign:'right'}}>
                              <Trigger idItem={id} iTem={this.state.iTems} />
                        </td>
                        <td>
                              <button className="btn btn-danger" onClick={this.handdleDelete.bind(this,id)}>
                                <span className="glyphicon glyphicon-remove" aria-hidden="true" ></span>
                              </button>
                        </td>
                      </tr>
                      
                    ))
                  }
                  </tbody>
                </table>
                </div>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
      </div>
    );
  }
}
class Trigger extends React.Component{ 
              constructor(props){
                super(props)
                this.state={
                  show : false,
                }
              }
              onChangeEditTitle(e){
                editTitle = e.target.value

              }
              onChangeEditDes(e){
                 
                  editDes = e.target.value
              }
              
              onEdit(){
                  let {idItem,iTem} = this.props
                  let {show} = this.state 
                  iTem[idItem].Title = editTitle
                  iTem[idItem].Description = editDes
                   iTemss = iTem
                   localStorage.setItem('iTems', JSON.stringify(iTemss))
                  console.log(iTemss)
                  this.setState({
                    show : false
                  })
                  che = true
                 
              }
              render() {
                let close = () => this.setState({ show: false});
                
                return (
                  <div className="modal-container" >
                    <Button className="btn btn-warning"
                      bsStyle="primary"
                      onClick={() => this.setState({ show: true})}
                    >
                      <span className="glyphicon glyphicon-pencil" aria-hidden="true" ></span>
                    </Button>
                     {
                        che ? window.location.reload() : null
                     }
                    <Modal
                      show={this.state.show}
                      onHide={close}
                      container={this}
                      aria-labelledby="contained-modal-title"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title style={{float:'left'}} id="contained-modal-title">Edit List</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel style={{float:'left'}}>Edit Title</ControlLabel>
                           <input type="text" onChange={this.onChangeEditTitle.bind(this)} className="form-control" placeholder="Edit Title" aria-describedby="basic-addon1" />
                        </FormGroup>
                        <br />
                         <FormGroup controlId="formControlsTextarea">
                          <ControlLabel style={{float:'left'}}>Edit Description</ControlLabel>
                          <FormControl onChange={this.onChangeEditDes.bind(this)} componentClass="textarea" placeholder="textarea" />
                        </FormGroup>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.onEdit.bind(this)}>Edit</Button>
                        <Button onClick={close}>Close</Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                )
              }
  }

    

export default App;
