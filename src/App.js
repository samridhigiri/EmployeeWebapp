import React,{useState,useEffect} from 'react';
import './App.css';
import { Container, Table,Button} from 'reactstrap';
import {Employeedetailsform } from './Employeedetailsform';
import { FaEdit,FaTrashAlt } from 'react-icons/fa'



function App() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData,setFormData] = useState({name:'',email:'',contact:''});
  const [isEdit,setEdit] = useState(false);
  const [Id,setId] = useState('');

  const add = () => {
    setEdit(false);
    setFormData({name:'',email:'',contact:''})
    setModal(!modal)
  };

  const edit = (item) => {
    setEdit(true);
    setId(item.Id);
    setFormData({name:item.EmployeeName,email:item.EmailAddress,contact:item.PhoneNumber})
    setModal(!modal)
  };

  const toggle = ()=>setModal(!modal)

  const fetchEmployee = () => {
    fetch('http://localhost:56290/api/Home')
        .then(res => res.json())
        .then(json => {
          setData(json)
        });
}


async function postData(method,url = '', data = {}) {
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

const createEmployee = ()=>{
  let method = 'POST'
  const reqBody = {
      "Id": Math.floor(Math.random()*(999-100+1)+100),
      "EmployeeName": formData.name,
      "PhoneNumber": formData.contact,
      "EmailAddress": formData.email
    }
    if(isEdit){
      method = 'PUT'
      reqBody.Id = Id;
    }
  postData(method,'http://localhost:56290/api/Home', reqBody)
  .then(data => {
    fetchEmployee();
    setModal(!modal)
  });
}

const deleteEmployee = async (item)=>{
  const url = 'http://localhost:56290/api/Home/'+item.Id
  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  await response.json();
  fetchEmployee()
}

useEffect(() => {
  fetchEmployee();
}, []);

  const handelChange = (e,title)=>{
    setFormData({ ...formData, [title]: e.target.value })

  }
  return (
    <div className="App">
  <nav className='App-header'>
      <Button outline color="primary"  onClick={add}>Add</Button>
  </nav>
      <Container>
 
      <Table size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item,index)=>(
          <tr key={index}>
            <th scope="row">{item.Id}</th>
            <td>{item.EmployeeName}</td>
            <td>{item.EmailAddress}</td>
            <td>{item.PhoneNumber}</td>
            <td><span><FaEdit onClick={() => edit(item)}></FaEdit><span>&nbsp;&nbsp;</span><FaTrashAlt onClick={() => deleteEmployee(item)}></FaTrashAlt></span></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
    <Employeedetailsform toggle={toggle} createEmployee ={createEmployee} modal={modal} handelChange={handelChange} formData={formData}></Employeedetailsform>
    </div>
  );
}

export default App;
