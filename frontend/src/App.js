//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'

function App() {
  const [name, setName]= useState("");
  const [age, setAge]= useState(0);
  const[usersList, setUsersList]=useState([])




 const addUser =()=>{
   Axios.post('http://localhost:3001/adduser',{
     name: name,
     age: age,
 }).then((response)=>{
   setUsersList([...usersList, {_id: response.data._id, name: name, age: age}])
 })
}


const updateUser=(id)=>{
  const newAge= prompt("Enter new Age: ")

  Axios.put('http://localhost:3001/update', {newAge: newAge, id:id})
  .then(()=>{
    setUsersList(usersList.map((val)=>{
      return val._id===id? {_id: id, name: val.name, age: newAge} : val
    }))
  })
}

const deleteUser=(id)=>{
  Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      setUsersList(
        usersList.filter((val)=>{
        return val._id!==id
      })
      )
    })
   }

 useEffect(()=>{
  Axios.get('http://localhost:3001/read',{
  })
  .then((response)=>{
    setUsersList(response.data);
  })
  .catch((err)=>{
    console.log(err)
  });
 }, [])



  return (
    <div className="App">
      <div className="inputs">
       <input type="text" placeholder="User Name" onChange={(event)=>{
         setName(event.target.value);}}
         />
       <input type="number" placeholder="User Age" onChange={(event)=>{
         setAge(event.target.value);}}
         />

         <button onClick={addUser}>Add User</button>
      </div>
      <div className="usersList">
        {usersList.map((val)=>{
          return (
          <div className="userContainer">
          <div className="user"> 

          <h3>Name: {val.name} </h3>
          <h3>Age: {val.age}</h3>
          <h3>Type: {val.age<18? "Kiddo": "Chad"}</h3>
        
          </div>
          <div className="buttons">
          <button onClick={()=>{
            updateUser(val._id);
          }}>Update</button>
          <button id="deleteBtn" onClick={()=>{
            deleteUser(val._id);
          }}>X</button>
          </div>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
