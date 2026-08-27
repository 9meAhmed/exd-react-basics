import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateStatus, selectCompletedCount, selectTotalCount, clearCompleted } from './features/todo/todoSlice.js';


function App() {

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const completedCount = useSelector(selectCompletedCount);
  const totalCount = useSelector(selectTotalCount);

  if( totalCount === completedCount && totalCount > 0) {
   alert('Congratulations! You have completed all your tasks for today. Take a break and relax!');
  }



  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newTodo = data.get('todo');
    if(!newTodo) {
      alert('Please enter a task before adding.');
      return;
    }
    dispatch(addTodo({title: newTodo, completed: false, priority: 'Medium'}));
    e.target.reset();
  }

  const onTodoComplete = (e, index) => {
    console.log(e.target.checked, index);

    dispatch(updateStatus({index, completed: e.target.checked}));
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container" style={{ maxWidth: '760px' }}>
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
              <div>
                <h1 className="h3 fw-bold mb-1">My Todo List</h1>
                <p className="text-secondary mb-0">Organize your day with clarity.</p>
              </div>
              <span className="badge text-bg-primary rounded-pill px-3 py-2">4 tasks left</span>
            </div>
            <form action="" onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Add a new task..."
                  name="todo"
                />
                <button className="btn btn-primary px-4" type="submit">
                  Add
                </button>

              </div>
            </form>


            <ul className="list-group list-group-flush border rounded-3 overflow-hidden">
              {
                todoList && todoList.length > 0 && todoList.map((todo, index) => (
                  <li key={todo.title.replace(/\s+/g, '-').toLowerCase()} className="list-group-item d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center gap-3">
                      <input className="form-check-input mt-0" type="checkbox" disabled={todo.completed} onChange={(e) => onTodoComplete(e, index)} />
                      <span className="fw-medium">{todo.title}</span>
                    </div>
                    <span className={`badge text-bg-${todo.priority === 'High' ? 'danger' : todo.priority === 'Medium' ? 'warning' : 'success'}-subtle text-${todo.priority === 'High' ? 'danger' : todo.priority === 'Medium' ? 'warning' : 'success'}-emphasis rounded-pill`}>{todo.priority}</span>
                  </li>
                ))
              }
              {
                todoList && todoList.length === 0 && (
                  <li className="list-group-item text-center text-secondary">No tasks available. Add a new task to get started!</li>
                )
              }
            </ul>

            <div className="d-flex justify-content-between align-items-center mt-4 small text-secondary">
              <span>{completedCount} completed of {totalCount} total</span>
              <button type="button" onClick={() => dispatch(clearCompleted())} className="btn btn-link text-danger p-0 text-decoration-none">
                Clear completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
