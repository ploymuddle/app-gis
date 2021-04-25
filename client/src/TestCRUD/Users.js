import Axios from "axios";
import { useState } from "react";

function Users() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [userlist, setUserlist] = useState([]);

  const getUserList = () => {
    // console.log('get');
    Axios.get("http://localhost:5000/user").then((response) => {
      setUserlist(response.data);
    });
  };

  const addUser = () => {
    Axios.post("http://localhost:5000/create", {
      name: name,
      age: age,
    }).then(() => {
      setUserlist([
        ...userlist,
        {
          name: name,
          age: age,
        },
      ]);
    });
  };

  return (
    <div className="Hello container">
      <h1>Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>      
          <button className="btn btn-success" onClick={addUser}>
            Add User
          </button>    
        </form>
      </div>
      <hr />
      <div className="user">
        <button className="btn btn-primary" onClick={getUserList}>
          Show
        </button>

        {userlist.map((val, key) => {
          return (
            <div className="user card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;