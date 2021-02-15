import react, { useState, useEffect } from 'react'
import { TaskBanner } from './components/TaskBanner'
import { TaskCreator } from './components/TaskCreator'
import { TaskRow } from './components/TaskRow'
import { VisibilityControl } from './components/VisibilityControl'

function App() {

  const [userName, setUserName] = useState('Tito')
  const [taskItems, setTaskItems] = useState([
    { name: 'Task one', done: false },
    { name: 'Task two', done: false },
    { name: 'Task three', done: true },
    { name: 'Task four', done: false },
  ])

  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data != null) {
      setTaskItems(JSON.parse(data))
    }else{
      setUserName('Lucas Example')
      setTaskItems([
        { name: 'Task one Example', done: false },
        { name: 'Task two Example', done: false },
        { name: 'Task three Example', done: true },
        { name: 'Task four Example', done: false },
      ])
      setShowCompleted(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  const createNewTask = taskName => {
    if(!taskItems.find(t => t.name === taskName)){
      setTaskItems([...taskItems, {name: taskName, done: false}])
    }
  }

  const makeTaskDone = task => {
    setTaskItems(taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t )))
  }

  return (
    <div className="App">
      { <TaskBanner userName={userName} taskItems={taskItems} /> }
      { < TaskCreator callback={createNewTask}/> }
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {( 
            <TaskRow tasks={taskItems} makeTaskDone={makeTaskDone} doneValue={false} /> 
          )}
        </tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
        < VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <th>Description</th>
              <th>Done</th>
            </thead>
            <tbody>
              <TaskRow tasks={taskItems} makeTaskDone={makeTaskDone} doneValue={true} /> 
            </tbody>
          </table>
        )
      }

    </div>
  );
}

export default App;
