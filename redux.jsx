// Redux store setup
import { createStore } from 'redux';

// Define action types
const ADD_TASK = 'ADD_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';
const EDIT_TASK = 'EDIT_TASK';

// Define action creators
const addTask = (description) => ({
  type: ADD_TASK,
  payload: { id: Date.now(), description, isDone: false },
});

const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  payload: { id },
});

const editTask = (id, description) => ({
  type: EDIT_TASK,
  payload: { id, description },
});

// Define reducer function
const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, isDone: !task.isDone } : task
        ),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, description: action.payload.description } : task
        ),
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(tasksReducer);

// React components
import React from 'react';
import { connect } from 'react-redux';

// AddTask component
class AddTask extends React.Component {
  state = {
    description: '',
  };

  handleChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.description.trim()) {
      this.props.addTask(this.state.description);
      this.setState({ description: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Enter task description"
        />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

// ListTask component
const ListTask = ({ tasks, toggleTask, editTask }) => (
  <ul>
    {tasks.map(task => (
      <Task
        key={task.id}
        task={task}
        toggleTask={toggleTask}
        editTask={editTask}
      />
    ))}
  </ul>
);

// Task component
const Task = ({ task, toggleTask, editTask }) => (
  <li>
    <input
      type="checkbox"
      checked={task.isDone}
      onChange={() => toggleTask(task.id)}
    />
    <span
      style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}
      onClick={() => editTask(task.id, prompt('Edit task:', task.description))}
    >
      {task.description}
    </span>
  </li>
);

// Map Redux state to component props
const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

// Map Redux actions to component props
const mapDispatchToProps = {
  addTask,
  toggleTask,
  editTask,
};

// Connect components to Redux store
const ConnectedAddTask = connect(null, mapDispatchToProps)(AddTask);
const ConnectedListTask = connect(mapStateToProps, mapDispatchToProps)(ListTask);

// App component
const App = () => (
  <div>
    <ConnectedAddTask />
    <ConnectedListTask />
  </div>
);

export default App;
