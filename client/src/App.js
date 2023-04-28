import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')

  useEffect(() => {
    // fetch server
    console.log('sending request')
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    fetch('http://127.0.0.1:8000/test/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
      })
  }

  const postUser = () => {
    fetch(`http://127.0.0.1:8000/test/create/${email}/${password}/${dob}`, {
      method: 'post'
    })
      .then(response => console.log(response.status))
    fetchUsers()
  }
  const loginUser= () => { 
    fetch(`http://127.0.0.1:8000/test/login/${email}/${password}`)
      .then(response => response.json())
      // .then(data => {
      //   setUsers(data)
      // })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width={'100px'}/>
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type= "password"/>
          <input value={dob} onChange={(e) => setDob(e.target.value)} type= "date"/>
          <button onClick={postUser}>Post my User</button>
        </div>
        <div style={{display: 'flex', gap: '1rem'}}>
          {
            users.map((s, i) => 
              <div key={i}>
                <span>Email: {s.Email__c}</span>
                <br/>
                <img src= {s.Image_Url__c} alt="image" width="100" height="100"/>
                <br/>
                <span>Date of birth: {s.Date_of_Birth__c}</span>
                {/* <span>Password: <span>{s.Password__c}</span></span> */}
              </div>
            )
          }
        </div>
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type= "password"/>
          <button onClick={loginUser}>Login my User</button>
        </div>
      </header>
    </div>
  );
}

export default App;
