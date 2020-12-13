import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import loginLogo from "../images/logo.png";

// MUI stuff
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { connect } from "react-redux";
import { signup } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  loginContainer: theme.loginContainer,
  image: theme.image,
  pageTitle: theme.pageTitle,
  textField: theme.textField,
}));

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};

const mapDispatchToProps = {
  signup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Signup(props) {
  const classes = useStyles();
  const history = useHistory();

  let {
    UI: { loading, errors },
    signup,
  } = props;

  // Handle the way errors are inside object
  if (errors) errors = errors.errors;

  ///////// Hooooooooooooooooks /////////
  // useState Hook //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  ///////// Functions /////////
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[signup] before invoking the signup fn");
    signup({ email, password, confirmPassword, handle }, history);
  };

  // Handle input change
  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "handle":
        setHandle(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <Card raised className={classes.loginContainer}>
      <CardContent>
        <img src={loginLogo} alt="Website logo" className={classes.image} />
        <Typography variant="h3" color="primary" className={classes.pageTitle}>
          Sign up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={errors?.match(/email/gi) ? true : false}
            helperText={errors?.match(/email/gi) ? errors : ""}
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleChange}
            className={classes.textField}
          />
          <TextField
            error={errors?.match(/password/gi) ? true : false}
            helperText={errors?.match(/password/gi) ? errors : ""}
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={handleChange}
            className={classes.textField}
          />
          <TextField
            error={errors?.match(/Both passwords/gi) ? true : false}
            helperText={errors?.match(/Both passwords/gi) ? errors : ""}
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            className={classes.textField}
          />
          <TextField
            error={errors?.match(/Username/gi) ? true : false}
            helperText={errors?.match(/Username/gi) ? errors : ""}
            fullWidth
            id="handle"
            name="handle"
            type="handle"
            label="Handle"
            value={handle}
            onChange={handleChange}
            className={classes.textField}
          />
          <Button
            style={{ margin: "2rem auto" }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              "Register"
            )}
          </Button>
          <small style={{ display: "block", marginTop: "-1rem" }}>
            Already a user! <Link to="/login">Login here</Link>
          </small>
        </form>
      </CardContent>
    </Card>
  );
});
