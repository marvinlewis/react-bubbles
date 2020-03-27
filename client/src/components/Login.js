import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ value, setValue ] = useState({
    username: '',
    password: '',
  })

  const history = useHistory();

  const handleChanges = e => {
    setValue({
      ...value,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/login`, value)
    .then(res => {
      localStorage.setItem("token", res.data.payload)
      history.push("/bubblepage")
    })
    .catch(err => console.log(err))
  }
  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
        name="username"
        type="text"
        value={value.username || ""}
        onChange={handleChanges}
        placeholder="Insert Username..."
        />
        <input
        name="password"
        type="password"
        value={value.password || ""}
        onChange={handleChanges}
        placeholder="Insert Password..."
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
