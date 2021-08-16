import React, { useState } from "react"
import VanillaTilt from 'vanilla-tilt'
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const loadUsers = async()=>{
    setLoading(true);
    fetch('https://reqres.in/api/users?page=1')
    .then((response) => response.json())
    .then((json) => {
      console.log(json.data);
      setUsers(json.data);
    })
    setTimeout( () => {
      setLoading(false);
    },1500)
  };
  
  VanillaTilt.init(document.querySelectorAll(".tiltCard"), {
		max: 28,
		speed: 500,
    "max-glare": .55
	});

  return (
    <div className="App">
      <nav id="navbar">
        <h1 id="header">REQRES</h1>
        <a id="btn" onClick={loadUsers}>
          <span>Get Users</span>
        </a>
      </nav>
      {isLoading ?<section><div id="loader"></div></section> : ''} 
      
      <div id="cards">
        {users.map(({id, first_name, last_name, avatar, email})=>(
          <div className="tiltCard">
            <div className="card" key={id}>
              <img src={avatar} alt="avatar"/>
              <p id="name">{first_name} {last_name}</p>
              <p>{email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
