import React, { useState } from 'react';

function CompanyAuthorization() {
    const [users, setUsers] = useState([
        {
            userID: 1,
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            birthDate: '1990-01-01',
            isAdmin: false,
            isActive: true,
        },
        {
            userID: 2,
            fullName: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '9876543210',
            birthDate: '1985-05-15',
            isAdmin: false,
            isActive: true,
        },
        {
            userID: 3,
            fullName: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            phone: '5555555555',
            birthDate: '1992-09-30',
            isAdmin: true,
            isActive: true,
        },
    ]);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAuthorizationChange = (userId, field, value) => {
        const updatedUsers = users.map(user => {
            if (user.userID === userId) {
                return { ...user, [field]: value };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleSearch = () => {
        const filtered = users.filter(
            user =>
                user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredUsers([]);
    };

    return (
        <div>
            <h1>Company - Authorization</h1>
            <div>
                <label htmlFor="searchInput">Search by Phone or Email:</label>
                <input
                    type="text"
                    id="searchInput"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleClearSearch}>Clear</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>BirthDate</th>
                    <th>Admin</th>
                    <th>Activate</th>
                </tr>
                </thead>
                <tbody>
                {(filteredUsers.length > 0 ? filteredUsers : users).map(user => (
                    <tr key={user.userID}>
                        <td>{user.userID}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.birthDate}</td>
                        <td>
                            <select
                                value={user.isAdmin}
                                onChange={e =>
                                    handleAuthorizationChange(
                                        user.userID,
                                        'isAdmin',
                                        e.target.value === 'true'
                                    )
                                }
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </td>
                        <td>
                            <select
                                value={user.isActive}
                                onChange={e =>
                                    handleAuthorizationChange(
                                        user.userID,
                                        'isActive',
                                        e.target.value === 'true'
                                    )
                                }
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyAuthorization;
