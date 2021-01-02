import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';
import './Todo.css';
import { Fragment, useState } from 'react';

function Todo(props) {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    db.collection('todos').doc(props.todo.id).delete();
  };

  const handleUpdate = (event) => {
    setInput(event.target.value);
  }

  const handleEdit = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    }, { merge: true });
    setOpen(false);
  };

  return (

    <Fragment>

      <Modal
        className='modal'
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className='modal__body'>
          <h1>Write a ToDo</h1>
          <textarea placeholder={props.todo.todo} value={input} onChange={handleUpdate} />
          <Button className='update__btn' variant="contained" color="primary" onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>

      <List className='todo__list'>
        <ListItem className='list-item'>
          <ListItemText primary={props.todo.todo} secondary='' />
        </ListItem>

        <div className='btn-wrapper'>
          <Button
            className='btn'
            variant="contained"
            color="primary"
            onClick={handleEdit}>
            Edit
        </Button>

          <Button
            className='btn'
            variant="contained"
            color="secondary"
            onClick={handleDelete}>
            Delete
        </Button>
        </div>

      </List>
    </Fragment>
  );
}

export default Todo;
