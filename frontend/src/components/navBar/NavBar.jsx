import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  linkStyle: {
    textDecoration: "none",
    color: "#fafafa",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  console.log(state);
  const user = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    history.push("/signin");
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h4" className={classes.root}>
            <Link className={classes.linkStyle} to="/">
              TaskPlanner
            </Link>
          </Typography>
          {user._id ? (
            <>
              <Typography variant="subtitle2" className={classes.title}>
                Logged in as: {user.name}
              </Typography>
              <Button color="inherit" onClick={() => handleSignOut()}>
                <Link className={classes.linkStyle} to="/signout">
                  SignOut
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link className={classes.linkStyle} to="/signin">
                  SignIn
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes.linkStyle} to="/signup">
                  SignUp
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NavBar;
