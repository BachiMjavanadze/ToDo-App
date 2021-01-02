import { FormControl, Input, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import Todo from './Todo';

// https://todo-app-cp-2270a.web.app/
function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // ბაზის წაკითხვა
    // orderBy()-არაა სავალდებულო. I არგუმენტი: ბაზის ობიექტი, რომლის მიხედვითაც ვალაგებთ გამოტანილ ინფორმაციას; II არგუმენტი: რა წესით (asc ან desc) ვალაგებთ 
    db.collection('todos').orderBy('timestemp', 'desc').onSnapshot(snapshot => {
      // setTodos(snapshot.docs.map(doc => doc.data().todo));
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })));
    });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    // ბაზაში ინფორმაციის ჩაწერა
    db.collection('todos').add({
      todo: input,
      // დრო (საათი)
      timestemp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodos([...todos, input]);
    setInput('');
  };

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <form>

        <FormControl>
          <InputLabel>Write aTodo</InputLabel>
          <Input value={input} onChange={(event) => setInput(event.target.value)} />
        </FormControl>

        <Button
          type='submit'
          onClick={addTodo}
          disabled={!input}
          variant="contained"
          color="primary">
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo, i) => (
          <Todo key={i} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;


