import React from 'react';
import { useState, useEffect } from 'react';
import TodoTable from './TodoTable';
import { Button, TextField, Stack, Select, MenuItem, FormControl, FormHelperText} from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';

function App() {

  const [todo, setTodo] = useState({description: '', date: '', priority: 'Low'});
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = () => {
    fetch('https://todoapp-6dde0-default-rtdb.europe-west1.firebasedatabase.app/items.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  // Add keys into the todo objects and map it into array
  const addKeys = (data) => {
    if (data !== null ) {
      const keys = Object.keys(data);
      const valueKeys = Object.values(data).map((item, index) => 
      Object.defineProperty(item, 'id', {value: keys[index]}));
      setTodos(valueKeys);
    } else { // If data is null, render empty array. Without this last item will stay rendered although it has been deleted from the database
      setTodos([]);
    }
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    if (todo.description !== '') {
      setTodos([...todos, todo]);
      updateDatabase(todo);
      setTodo({description: '', date: '', priority: 'Low'}); // Clear todo
    } else {
      alert('Add description');
    }
  }

 const updateDatabase = (todo) => {
    fetch('https://todoapp-6dde0-default-rtdb.europe-west1.firebasedatabase.app/items.json',
    {
      method: 'POST',
      body: JSON.stringify(todo)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    fetch(`https://todoapp-6dde0-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteAll = () => {
    fetch(`https://todoapp-6dde0-default-rtdb.europe-west1.firebasedatabase.app/items.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  return (
    <div>
      <Stack 
        direction = 'row' 
        spacing = {1} 
        mt = {2} 
        justifyContent = 'center'
        alignItems = 'center'>
        <TextField
          required
          variant = 'standard'
          helperText = 'Write description*'
          name = 'description'
          value = {todo.description} 
          onChange = {inputChanged}/>
        <TextField
          variant = 'standard'
          helperText = 'Choose deadline'
          name = 'date' 
          type = 'date'
          value = {todo.date} 
          onChange = {inputChanged}/>
        <FormControl >
          <Select
            variant = 'standard'
            labelId = 'priority-select-label'
            id = 'priority-select'
            value = {todo.priority}
            name = 'priority' 
            onChange = {inputChanged}>
            <MenuItem value={'Low'}>Low</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
          </Select>
          <FormHelperText>Choose priority</FormHelperText>
        </FormControl>
        <Button 
          variant = 'outlined'
          endIcon = {<SendIcon />}
          onClick = {addTodo}>
          Add</Button>
      </Stack>
      <TodoTable todos = {todos} deleteTodo={deleteTodo}/>  
      {todos.length > 0 
        ? <Button 
            variant = 'outlined'
            color = 'error'
            size = 'small'
            onClick = {deleteAll}>
            Delete all</Button>
        : <p></p>
      }
    </div>
  );
}

export default App;