import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import { Button, Input } from 'antd';

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        <Input style={{ width: 200 }} ref={node => { input = node; }} />
        <Button type="submit">
          Add Todo
        </Button>
      </form>
    </div>
  );
};

export default connect()(AddTodo);
