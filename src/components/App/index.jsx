import React, { Component } from 'react'
import TaskAddBar from '../TaskAddBar'
import TaskList from '../TaskList'
import AppStyles from './App.module.scss'

class App extends Component {
    state = {
        day: this.props.match.params.day,
        tasks: this.props.dayTasks[this.props.match.params.day]
    }

    render() {
        return (
            <div className={AppStyles.mainBlock}>
                <TaskAddBar addTask={this.addTask} clearAll={this.clearAll} />
                <TaskList tasks={this.state.tasks} editTask={this.editTask} deleteTask={this.deleteTask} />
            </div >
        )
    }

    addTask = (task) => {
        this.setState(prevState => ({ tasks: [...prevState.tasks, task] }))
    }

    editTask = (id, newTask) => {
        this.setState(prevState => {
            return {
                tasks: prevState.tasks.map(elem => {
                    if (elem.id === id) {
                        elem.task = newTask
                    }
                    return elem
                })
            }
        })
    }

    deleteTask = (id) => {
        this.setState(prevState => { return { tasks: prevState.tasks.filter(elem => id !== elem.id) } })
    }

    clearAll = () => {
        this.setState({ tasks: [] })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.match.params.day !== state.day) {
            props.updateDaysTasks(state.day, state.tasks)
            return { day: props.match.params.day, tasks: props.dayTasks[props.match.params.day] }
        }
        return null
    }
}

export default App