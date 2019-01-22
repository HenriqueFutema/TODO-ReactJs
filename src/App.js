import React, { Component } from 'react';

import './App.css';
import Title from './components/item.js'

class App extends Component {
  state = {
    todos: [],
    act: 0,
    index: ''
  }

  TodoAdd = e =>{
    e.preventDefault();

    
    let { todos } = this.state;

    if(!this.refs.item.value.length) return;

    if(this.state.act === 0){
      let todo = this.refs.item.value
      todos.push(todo)

    }else{
      let { index } = this.state;
      todos[index] = this.refs.item.value;
    }

    this.setState({ 
      todos: todos,
      todo: '',
      act: 0 
    })
    this.refs.item.value = ''
  }

  TodoRemove = (i) => {
    let { todos } = this.state;
    todos.splice(i,1);
    
    this.setState({ todos : todos })
  }

  TodoEdit = (i) => {
    let todo = this.state.todos[i];
    this.refs.item.value = todo;

    this.setState({
      act: 1,
      index: i
    });

    console.log(this.state.index)

    this.refs.item.focus();
  }
  
  handleInput = (e) =>{
    this.setState({ todo: e.target.value })
  }

  render() {
    let sclass = 'mt-4';
    let botao = 'mt-3 form-control btn btn-success form-control-lg'
    let botao2 = 'm-2 btn btn-primary btn-sm'
    let botao3 = 'm-2 btn btn-danger btn-sm'

    return ( 
      <div className="container-fluid">
        <div className={sclass}>
          <Title/>

          <form onSubmit={this.TodoAdd} className="form-group">
            <input type="text"
            className="form-control"
            placeholder="TODO"
            onChange={this.handleInput}
            ref="item"
            />
            <button type="submit" className={botao}>{ (this.state.act === 0) ? "Adicionar"  : "Editar"}</button>
          </form>
          <ul className="text-left">
          {this.state.todos.map((item, i) =>(
            <li>
            {i + 1}. {item}
            <button onClick={() => this.TodoEdit(i)} className={botao2}>Editar</button>
            <button onClick={() => this.TodoRemove(i)} className={botao3}>Remover</button>

            </li>
          ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
