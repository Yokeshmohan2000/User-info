import React, { useState } from 'react';

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [tempUser, setTempUser] = useState({ name: '', email: '', mobile: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSaveClick = () => {
    if (validateInputs(tempUser)) {
      if (isEditing) {
        const updatedUsers = users.map((user, index) =>
          index === currentUser ? tempUser : user
        );
        setUsers(updatedUsers);
      } else {
        setUsers([...users, tempUser]);
      }
      setTempUser({ name: '', email: '', mobile: '' });
      setIsEditing(false);
      alert('User information saved successfully!');
    }
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setCurrentUser(index);
    setTempUser(users[index]);
  };

  const validateInputs = ({ name, email, mobile }) => {
    if (!name) {
      alert('Name is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  };

  return (
    <div>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={tempUser.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={tempUser.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={tempUser.mobile}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleSaveClick}>
          {isEditing ? 'Update' : 'Save'}
        </button>
      </div>
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserInfo;
