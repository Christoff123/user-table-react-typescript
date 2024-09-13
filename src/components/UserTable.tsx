import { useState, useEffect } from 'react';

const url = 'https://jsonplaceholder.typicode.com/users';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [searchName, setSearchName] = useState<string>('');
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [searchPhone, setSearchPhone] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const usersFetch: User[] = await response.json();
        setUsers(usersFetch);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (user: User) =>
      user.name.toLowerCase().includes(searchName.toLowerCase()) &&
      user.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      user.phone.toLowerCase().includes(searchPhone.toLowerCase())
  );

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                placeholder="Search name"
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
              />
            </th>
            <th>
              <input
                placeholder="Search username"
                onChange={(e) => {
                  setSearchUsername(e.target.value);
                }}
              />
            </th>
            <th>
              <input
                placeholder="Search email"
                onChange={(e) => {
                  setSearchEmail(e.target.value);
                }}
              />
            </th>
            <th>
              <input
                placeholder="Search phone"
                onChange={(e) => {
                  setSearchPhone(e.target.value);
                }}
              />
            </th>
          </tr>
          <tr className='headTable'>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
