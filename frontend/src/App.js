import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom"

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import Tasks from './components/tasks/Tasks';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NavBar from './components/navBar/NavBar';
import { loadUser } from './store/actions/authActions';
import {Container} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  contentStyle: {
    margin: "30px auto"
  }
})

function App() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
      <Container maxWidth = "md">
      <NavBar/>
      <Container className={classes.contentStyle} maxWidth="sm">
      <Switch>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/" component={Tasks}/>
      </Switch>
      </Container>
      </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
