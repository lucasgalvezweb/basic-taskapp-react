import React from 'react'

export const TaskRow = props => {

    return (
    <>
        {
            props.tasks
            .filter(task => task.done === props.doneValue)
            .map((task, index) => (
                <tr key={index}>
                    <td>{task.name}</td>
                    <td>
                        <input 
                            type="checkbox" 
                            checked={task.done} 
                            onChange={() => { props.makeTaskDone(task) }}
                        />
                    </td>
                </tr>
            ))
        }
    </>
    )
}
