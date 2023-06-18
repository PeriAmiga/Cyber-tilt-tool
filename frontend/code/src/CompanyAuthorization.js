import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiGet} from "./services/apiService";

function CompanyAuthorization() {

    const [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                setUser(user.data);
            } catch (error) {
                setUser(null)
                navigate('/error');
            }
            return
        }
        getUser();

    }, []);

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
        const updatedUsers = users.map((user) => {
            if (user.userID === userId) {
                return { ...user, [field]: value };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filtered = users.filter(
            (user) =>
                user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(users.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        user !== null && (<div>
            <h1>{user.companyName} - Authorization</h1>
            <div>
                <label htmlFor="searchInput">Search by Phone or Email:</label>
                <input
                    type="text"
                    id="searchInput"
                    value={searchTerm}
                    onChange={handleSearch}
                />
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
                {searchTerm === '' ? (
                    users.map((user) => (
                        <tr key={user.userID}>
                            <td>{user.userID}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={user.isAdmin}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isAdmin', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={user.isActive}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isActive', e.target.checked)
                                    }
                                />
                            </td>
                        </tr>
                    ))
                ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <tr key={user.userID}>
                            <td>{user.userID}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={user.isAdmin}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isAdmin', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={user.isActive}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isActive', e.target.checked)
                                    }
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="pagination" id="tablePages">
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => setCurrentPage(number)}>
                        {number}
                    </button>
                ))}
            </div>
            <button id="register" onClick={() => navigate('/register')}>
                Register a new user
            </button>
        </div>)
    );
}

export default CompanyAuthorization;
