import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiGet} from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

function SystemAuthorization() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([
        {
            userID: 1,
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            birthDate: '1990-01-01',
            isAdmin: false,
            isActive: true,
            company: 'Company A',
            isSysAdmin: false,
        },
        {
            userID: 2,
            fullName: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '9876543210',
            birthDate: '1985-05-15',
            isAdmin: false,
            isActive: true,
            company: 'Company B',
            isSysAdmin: false,
        },
        {
            userID: 3,
            fullName: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '9876543210',
            birthDate: '1985-05-15',
            isAdmin: false,
            isActive: true,
            company: 'Google',
            isSysAdmin: false,
        },
        {
            userID: 4,
            fullName: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            phone: '5555555555',
            birthDate: '1992-09-30',
            isAdmin: true,
            isActive: true,
            company: 'Company C',
            isSysAdmin: true,
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
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.company.toLowerCase().includes(searchTerm.toLowerCase())
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
            return
        }
        getUser();

    }, []);

    const toggleSave = (userID, isCompanyAdmin, isSysAdmin, isActive) => {
        // TODO: api to update the user data

        alert("The data has been successfully saved");
    }

    return (
        user && (<div>
            <h1>System - Authorization</h1>
            <br/>
            <Button variant="primary" id="register" onClick={() => navigate('/register')}>
                Register a new user
            </Button>
            <br/><br/>
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
                    <th>BirthDate</th>
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
                            <td>{user.company}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <input
                                    id="isCompanyAdmin"
                                    type="checkbox"
                                    checked={user.isAdmin}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isAdmin', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    id="isSysAdmin"
                                    type="checkbox"
                                    checked={user.isSysAdmin}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isSysAdmin', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    id="isActive"
                                    type="checkbox"
                                    checked={user.isActive}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isActive', e.target.checked)
                                    }
                                />
                            </td>
                            <td id={user.userID} style={{ cursor: 'pointer' }} onClick={() => toggleSave(user.userID, document.getElementById("isCompanyAdmin").value, document.getElementById("isSysAdmin").value, document.getElementById("isActive").value)}>
                                <img
                                    src="/images/save.png" alt="save" style={{ width: '40px', height: '40px' }}/></td>
                        </tr>
                    ))
                ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <tr key={user.userID}>
                            <td>{user.userID}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.company}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <input
                                    id="isCompanyAdmin"
                                    type="checkbox"
                                    checked={user.isAdmin}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isAdmin', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    id="isSysAdmin"
                                    type="checkbox"
                                    checked={user.isSysAdmin}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isSysAdmin', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    id="isActive"
                                    type="checkbox"
                                    checked={user.isActive}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isActive', e.target.checked)
                                    }
                                />
                            </td>
                            <td id={user.userID} style={{ cursor: 'pointer' }} onClick={() => toggleSave(user.userID, document.getElementById("isCompanyAdmin").value, document.getElementById("isSysAdmin").value, document.getElementById("isActive").value)}>
                                <img
                                    src="/images/save.png" alt="save" style={{ width: '40px', height: '40px' }}/></td>
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