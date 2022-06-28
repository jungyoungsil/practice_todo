import { toUnicode } from 'punycode';
import React, { useState } from 'react';
import { toEditorSettings, tokenToString } from 'typescript';
import './App.css';

function App() {
const [todos,setTodos] = useState<Todo[]>([]);
const [inputText, setInputText] = useState("");
interface Todo {
inputText : string;
id : number;
checked : boolean;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  //new todoを　作成
  const newTodo : Todo = { 
    inputText: inputText,
    id : todos.length,
    checked: false,
  };

  setTodos([newTodo, ...todos]);
  setInputText("");

};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //console.log(e.target.value);
  e.preventDefault();

  setInputText(e.target.value);
};

const handleEdit = (id: number, inputText: string) => {
  const newTodos = todos.map((todo)=>{
    if(todo.id === id){
      todo.inputText = inputText;
    }
    return todo;
  });
  
  setTodos(newTodos);
};

const handlechecked = (id: number, checked: boolean) => { 
  const newTodos = todos.map((todo)=>{
  if(todo.id === id){
    todo.checked = !checked;
  }
  return todo;
});

  setTodos(newTodos);
};

const handleDel = (id: number) => {
  const newTodos = todos.filter((todo) => todo.id !== id )
  setTodos(newTodos);
};

  return (
    <div className="App"> 
    <div>
      <h2>TodoList with Typescript</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="text" onChange={(e)=>handleChange(e)}
          />
          <input type ="submit" value="登録"/>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="list">
            <input 
              type="text" value = {todo.inputText} 
              onChange={(e)=> handleEdit(todo.id, e.target.value)}
              disabled={todo.checked} 
              />
            <input 
            type ="checkbox"
            onChange={(e)=> handlechecked(todo.id, todo.checked)} 
            />
            <button onClick= {()=>handleDel(todo.id)}>delete</button>
            </li>
        ))}
      </ul>
      </div>
    
    </div>
  );
}

export default App;
