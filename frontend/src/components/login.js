import React, { useState } from "react";

const Login = (props) => {
  const initialValue = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialValue);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    props.history.push("/");
  };
  return (
    <div className="submit-form">
      <div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="example"
          />
          <label for="name">User Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            value={user.id}
            onChange={handleInputChange}
            className="form-control"
            id="id"
            name="id"
            placeholder="ID"
          />
          <label for="id">ID</label>
        </div>

        <button className="btn btn-primary mt-2 px-5" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
