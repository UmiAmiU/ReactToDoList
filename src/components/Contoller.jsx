import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import App from './App'
import DropDown from './DropDown'
import ModalHOC from './ModalHOC';
import DropDownElem from './DropDownElem';
import { Typography, Link, Grid } from '@material-ui/core';

const ModalApp = ModalHOC(App)
const MyLink = props => <NavLink {...props} />

class Controller extends Component {
    updateDaysTasks = (day, tasks) => { this.setState(prevState => prevState.days[day] = tasks) }

    state = {
        days: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        },

    }

    renderHelper = props => {
        const day = props.match.params.day
        return <App {...props} day={day} days={this.state.days} updateDaysTasks={this.updateDaysTasks} />
    }

    mainPage = () =>
        <Grid container justify="center">
            <Typography variant="h3">Select the day</Typography>
        </Grid>

    render() {
        const dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return (
            <Router>
                <React.Fragment>
                    <Grid container justify="center" alignItems="center" wrap="wrap">
                        <Route exact path="/" component={this.mainPage} />
                        <Grid item xs container justify="center" alignItems="center" spacing={8}>
                            {dayArr.map(elem =>
                                <Grid item key={elem.toLowerCase()}>
                                    <Link
                                        to={`/${elem.toLowerCase()}`}
                                        component={MyLink}
                                        variant="h4"
                                        color="primary">
                                        {elem}
                                    </Link>
                                </Grid>)}
                        </Grid>
                        <DropDown
                            elemList={dayArr.map(elem =>
                                <DropDownElem
                                    name={elem}
                                    key={elem.toLowerCase()}
                                    renderModal={(isOpen, closeModal) =>
                                        <ModalApp
                                            isOpen={isOpen}
                                            closeModal={closeModal}
                                            day={elem.toLowerCase()}
                                            days={this.state.days}
                                            updateDaysTasks={this.updateDaysTasks}
                                        />}
                                />)}
                        />
                    </Grid>
                    <Grid container justify="space-around" alignItems="center" wrap="wrap">
                        <Route path="/:day" component={this.renderHelper} />
                    </Grid>
                </React.Fragment>
            </Router >
        )
    }
}

export default Controller