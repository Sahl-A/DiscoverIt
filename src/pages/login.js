import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import loginLogo from "../images/logo.png";

// MUI stuff
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  loginContainer: { maxWidth: 400, margin: "auto", textAlign: "center" },
  image: { maxWidth: 100 },
  pageTitle: { fontWeight: "lighter", margin: "1rem auto" },
  textField: { marginBottom: "1rem" },
});

export default function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  ///////// Hooooooooooooooooks /////////
  // useState Hook //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  ///////// Functions /////////
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const login = await axios.post("/login", { email, password });
      localStorage.setItem("DiscoverItToken", login.data.token);
      setLoading(false);
      history.push("/");
    } catch (error) {
      setError(error.response?.data.errors);
      setLoading(false);
    }
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

      default:
        break;
    }
  };

  return (
    <Card raised className={classes.loginContainer}>
      <CardContent>
        <img src={loginLogo} alt="Website logo" className={classes.image} />
        <Typography variant="h3" color="primary" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={error?.match(/email/g) ? true : false}
            helperText={error?.match(/email/g) ? error : ""}
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
            error={error?.match(/password/g) ? true : false}
            helperText={error?.match(/password/g) ? error : ""}
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
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
              "Login"
            )}
          </Button>
          <small style={{ display: "block", marginTop: "-1rem" }}>
            Don't have an account. <Link to="/signup">Sign up here</Link>
          </small>
        </form>
      </CardContent>
    </Card>
  );
}
