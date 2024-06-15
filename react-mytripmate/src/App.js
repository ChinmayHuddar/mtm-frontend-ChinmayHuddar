import './App.css';
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { PlusCircle, Edit, Trash2 } from 'react-feather';

function App() {
  const blankUser = {
    Srno: "",
    Destination: "",
    City: "",
    Items: ""
  };

  const [user, setUser] = useState(blankUser);
  const [userdata, setUserdata] = useState([]);
  const [action, setAction] = useState("Add");
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [srno, setSrno] = useState(1); // Initialize Sr. no. to 1

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setUser(blankUser); // Reset the user form when the modal closes
    setAction("Add");
    setEditIndex(null);
  };

  const validateUser = (user) => {
    return user.Destination.trim() !== "" && user.City.trim() !== "" && user.Items.trim() !== "";
  };

  const addUser = () => {
    if (validateUser(user)) {
      const newUser = { ...user, Srno: srno }; // Assign Srno to new user
      setUserdata([...userdata, newUser]);
      setSrno(srno + 1); // Increment Srno
      setUser(blankUser);
      onCloseModal();
    } else {
      alert("All fields are required.");
    }
  };

  const editUser = (index) => {
    setUser(userdata[index]);
    setEditIndex(index);
    setAction('Edit');
    onOpenModal();
  };

  const deleteUser = (index) => {
    setUserdata(userdata.filter((_, i) => i !== index));
  };

  const updateUser = () => {
    if (validateUser(user)) {
      const updatedUsers = userdata.map((u, index) => 
        index === editIndex ? user : u
      );
      setUserdata(updatedUsers);
      setUser(blankUser);
      onCloseModal();
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <div className="container">
      <div className="d-flex">
        <h1>Itinerary Planner</h1>
      </div>
      <div className="toolbar">
        <button className="btn" onClick={onOpenModal}>
          <PlusCircle size={16} />
          <span>Add</span>
        </button>
      </div>
      <hr />
     

      <table className="table">
        <thead>
          <tr>
            <th>Srno</th>
            <th>Destination</th>
            <th>City</th>
            <th>Items</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userdata.length > 0 && userdata.map((user, index) => (
            <tr key={index}>
              <td>{user.Srno}</td>
              <td>{user.Destination}</td>
              <td>{user.City}</td>
              <td>{user.Items}</td>
              <td>
                <button className="btn m12" onClick={() => editUser(index)}>
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <br />

                <button className="btn m12" onClick={() => deleteUser(index)}>
                  <Trash2 size={16} />
                  <span>Remove</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} Entry</h2>
        
        <div className="form">
          <label>Srno</label>
          <input type="number" value={user.Srno || srno} disabled readOnly />
          <label>Destination</label>
          <input 
            type="text" 
            value={user.Destination} 
            onChange={(e) => setUser({ ...user, Destination: e.target.value })} 
          />
          <label>City</label>
          <input 
            type="text" 
            value={user.City} 
            onChange={(e) => setUser({ ...user, City: e.target.value })} 
          />
          <label>Items</label>
          <textarea 
            cols="30" 
            rows="5" 
            value={user.Items} 
            onChange={(e) => setUser({ ...user, Items: e.target.value })} 
          />
          {action === "Add" ? (
            <button className='btn' onClick={addUser}>Submit</button>
          ) : (
            <button className='btn' onClick={updateUser}>Update</button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;
