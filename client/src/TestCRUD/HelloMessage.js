import Axios from "axios";
import { useState } from "react";

function Hello() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [number, setNumber] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [userlist, setUserlist] = useState([]);

  const getUserList = () => {
    // console.log('get');
    Axios.get("http://localhost:3001/user").then((response) => {
      setUserlist(response.data);
    });
  };

  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      number: number,
    }).then(() => {
      setUserlist([
        ...userlist,
        {
          name: name,
          age: age,
          number: number,
        },
      ]);
    });
  };

  const updateUser = (id) => {
    Axios.put("http://localhost:3001/update", { number: newNumber, id: id}).then((response) => {
      setUserlist(
        userlist.map((val) => {
          return val.id === id ? { 
            id: val.id,
            name: val.name,
            number: val.newNumber
          } : val;
        })
      )
    })
  }

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
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Number
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Number"
              onChange={(event) => {
                setNumber(event.target.value);
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
                <p className="card-text">Number: {val.number}</p>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="..."
                    className="form-control"
                    onChange={(event) => {
                      setNewNumber(event.target.value);
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => { updateUser(val.id)}}>Update</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hello;
