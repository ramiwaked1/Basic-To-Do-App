import React, { useState, useEffect } from 'react';
import Todo from './Todo'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // will stop the REFRESH

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput(''); // clear up the input after clicking add todo button
  }

  return (
    <div className="App">
      <h1 className="heading-title">Hello World 🚀 <br/>This is the To-Do App 👌<br /><br/>By: Rami Waked 🇵🇦</h1>
      <form>
        <FormControl>
          <InputLabel>✅&nbsp;&nbsp;&nbsp;Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add To Do</Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
          // <li>{todo}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
