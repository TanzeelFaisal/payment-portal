import React, { useState, useEffect } from 'react';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const approveUser = async (userId) => {
    try {
      const response = await fetch('http://localhost:3001/approve-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Failed to approve user:', response.statusText);
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Panel</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">CNIC</th>
            <th scope="col">Approved Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.studentName}</td>
              <td>{user.studentEmail}</td>
              <td>{user.studentCNIC}</td>
              <td>
                {user.approved_status ? (
                  <span className="text-success">Approved</span>
                ) : (
                  <button className="btn btn-primary mt-0" onClick={() => approveUser(user._id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
