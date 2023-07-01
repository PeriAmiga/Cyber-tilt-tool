import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiGet } from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

function SystemAuthorization() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])


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

        const updatedFilteredUsers = filteredUsers.map((user) => {
            if (user.userID === userId) {
                return { ...user, [field]: value };
            }
            return user;
        });
        setFilteredUsers(updatedFilteredUsers);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filtered = users.filter(
            (user) =>
                user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.companyName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(users.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const [user, setUser] = useState("")

    async function updateAuthorization(userID, isCompanyAdmin, isSysAdmin, isActive) {
        try {
            return await apiGet('/auth/updateAuthorization', { userID: userID, isCompanyAdmin: isCompanyAdmin, isSysAdmin: isSysAdmin, isActive: isActive });
        } catch (error) {
            alert("Something didn't work, please try again.");
        }
    }

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                if (!user.data.isSysAdmin)
                    throw Error();
                setUser(user.data);
            } catch (error) {
                setUser(null)
                navigate('/error');
            }
        }
        getUser();

        async function getUsersData() {
            try {
                const res = await apiGet('/company/users');
                setUsers(res.data);
            } catch (error) {
                setUsers([])
            }
        }
        getUsersData();

    }, []);

    async function toggleSave(userID, isCompanyAdmin, isSysAdmin, isActive) {
        const res = await updateAuthorization(userID, isCompanyAdmin, isSysAdmin, isActive);
        if (res) {
            alert("The data has been updated successfully");
        }
    }

    return (
        user && (<div>
            <h1>System - Authorization</h1>
            <br />
            <Button variant="primary" id="register" onClick={() => navigate('/register')}>
                Register a new user
            </Button>
            <br /><br />
            <Container className="sysAuthPage">
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Search by Phone or Email or Company</InputGroup.Text>
                    <Form.Control
                        id="searchInput"
                        aria-describedby="basic-addon1"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </Container>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Company Admin</th>
                        <th>System Admin</th>
                        <th>Activate</th>
                        <th>Save</th>
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
                                <td>{user.companyName}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={user.isCompanyAdmin}
                                        onChange={(e) =>
                                            handleAuthorizationChange(user.userID, 'isCompanyAdmin', e.target.checked)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={user.isSysAdmin}
                                        onChange={(e) =>
                                            handleAuthorizationChange(user.userID, 'isSysAdmin', e.target.checked)
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
                                <td id={user.userID} style={{ cursor: 'pointer' }} onClick={() => toggleSave(user.userID, user.isCompanyAdmin, user.isSysAdmin, user.isActive)}>
                                    <img
                                        src="/images/save.png" alt="save" style={{ width: '40px', height: '40px' }} /></td>
                            </tr>
                        ))
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.userID}>
                                <td>{user.userID}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.companyName}</td>
                                <td>{user.birthDate}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={user.isCompanyAdmin}
                                        onChange={(e) =>
                                            handleAuthorizationChange(user.userID, 'isCompanyAdmin', e.target.checked)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={user.isSysAdmin}
                                        onChange={(e) =>
                                            handleAuthorizationChange(user.userID, 'isSysAdmin', e.target.checked)
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
                                <td id={user.userID} style={{ cursor: 'pointer' }} onClick={() => toggleSave(user.userID, user.isCompanyAdmin, user.isSysAdmin, user.isActive)}>
                                    <img
                                        src="/images/save.png" alt="save" style={{ width: '40px', height: '40px' }} /></td>
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
        </div>)
    );
}

export default SystemAuthorization;