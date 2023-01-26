import React from 'react';
import { IconButton, Tooltip} from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoTable(props) {
  return(
    <div>
        <table>
            <thead>
                <tr>
                    <td>Description</td>
                    <td>Date</td>
                    <td>Priority</td>
                </tr>
            </thead>
            <tbody>
                {
                props.todos.map((todo, index) => 
                <tr key = {index}>
                    <td>{todo.description}</td>
                    <td>{todo.date}</td>
                    <td>{todo.priority}</td>
                    <td><Tooltip title = 'Delete' >
                            <IconButton size ='small' color ='error' onClick={() => props.deleteTodo(todo.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip></td>
                    
                </tr>)
                }
            </tbody>
        </table>
  </div>
  );
}

export default TodoTable;