import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiGet} from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

function CompanyAuthorization() {

    const [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                if (!user.data.isCompanyAdmin)
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

    const toggleSave = (userID, isAdmin, isActive) => {
        // TODO: api to update the user data

        alert("The data has been successfully saved");
    }

    return (
        user && (<div>
            <h1>{user.companyName} - Authorization</h1>
            <br/>
            <Button variant="primary" id="register" onClick={() => navigate('/register')}>
                Register a new user
            </Button>
            <br/><br/>
            <Container className="companyAuthPage">
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Search by Phone or Email</InputGroup.Text>
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
                    <th>BirthDate</th>
                    <th>Admin</th>
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
                            <td>{user.birthDate}</td>
                            <td>
                                <input
                                    id="isAdmin"
                                    type="checkbox"
                                    checked={user.isAdmin}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isAdmin', e.target.checked)
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
                            <td id={user.userID} style={{ cursor: 'pointer' }} onClick={() => toggleSave(user.userID, document.getElementById("isAdmin").value, document.getElementById("isActive").value)}>
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
                            <td>{user.birthDate}</td>
                            <td>
                                <input
                                    id="isAdmin"
                                    type="checkbox"
                                    checked={user.isAdmin}
                                    onChange={(e) =>
                                        handleAuthorizationChange(user.userID, 'isAdmin', e.target.checked)
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
                            <td id={user.userID} style={{ cursor: 'pointer' }} onClick={() => toggleSave(user.userID, document.getElementById("isAdmin").value, document.getElementById("isActive").value)}>
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

export default CompanyAuthorization;
