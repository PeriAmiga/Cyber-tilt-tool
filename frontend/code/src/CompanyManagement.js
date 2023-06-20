import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiGet} from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

function CompanyManagement() {

    const [user, setUser] = useState("")

    useEffect(() => {
        async function getUser() {
            try {
                const user2 = await apiGet('/auth/whoami');
                setUser(user2.data);
            } catch (error) {
                setUser(null)
                navigate('/error');
            }
            return
        }
        getUser();

    }, []);

    const [companies, setCompanies] = useState([
        {
            companyID: 1,
            name: 'Company A',
            address: '123 Main Street',
            isActivate: true,
            HTTP: true,
            FTP: false,
            SSH: true,
            SMTP: false,
        },
        {
            companyID: 2,
            name: 'Intel',
            address: '456 Elm Street',
            isActivate: false,
            HTTP: true,
            FTP: true,
            SSH: false,
            SMTP: true,
        },
        {
            companyID: 3,
            name: 'Google',
            address: '789 Oak Street',
            isActivate: true,
            HTTP: false,
            FTP: true,
            SSH: false,
            SMTP: true,
        },
        {
            companyID: 4,
            name: 'Company D',
            address: '111 Pine Street',
            isActivate: true,
            HTTP: true,
            FTP: true,
            SSH: true,
            SMTP: true,
        },
        {
            companyID: 5,
            name: 'Company E',
            address: '222 Oak Avenue',
            isActivate: false,
            HTTP: true,
            FTP: false,
            SSH: true,
            SMTP: true,
        },
        {
            companyID: 6,
            name: 'Company F',
            address: '333 Maple Road',
            isActivate: true,
            HTTP: true,
            FTP: true,
            SSH: false,
            SMTP: false,
        },
        {
            companyID: 7,
            name: 'Company G',
            address: '444 Cedar Lane',
            isActivate: true,
            HTTP: false,
            FTP: false,
            SSH: true,
            SMTP: true,
        },
        {
            companyID: 8,
            name: 'Company H',
            address: '555 Elm Street',
            isActivate: false,
            HTTP: false,
            FTP: false,
            SSH: false,
            SMTP: false,
        },
    ]);
    const navigate = useNavigate();
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAuthorizationChange = (companyId, field, value) => {
        const updatedCompanies = companies.map((company) => {
            if (company.companyID === companyId) {
                return { ...company, [field]: value };
            }
            return company;
        });
        setCompanies(updatedCompanies);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filtered = companies.filter((company) =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompanies(filtered);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(companies.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const toggleSave = (companyID, isActive, isHTTP, isFTP, isSSH, isSMTP) => {
        // TODO: api to update the user data

        alert("The data has been successfully saved");
    }

    return (
        user !== null && (
        <div>
            <h1>Company - Management</h1>
            <br/>
            <Button variant="primary" id="register" onClick={() => navigate('/registercompany')}>
                Register a new company
            </Button>
            <br/><br/>
            <Container className="companiesPage">
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Search by Name</InputGroup.Text>
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
                    <th>Company ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>isActivate</th>
                    <th>HTTP</th>
                    <th>FTP</th>
                    <th>SSH</th>
                    <th>SMTP</th>
                    <th>Save</th>
                </tr>
                </thead>
                <tbody>
                {searchTerm === '' ? (
                    companies.map((company) => (
                        <tr key={company.companyID}>
                            <td>{company.companyID}</td>
                            <td>{company.name}</td>
                            <td>{company.address}</td>
                            <td>
                                <input
                                    id="isActive"
                                    type="checkbox"
                                    checked={company.isActivate}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'isActivate', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    id="isHTTP"
                                    type="checkbox"
                                    checked={company.HTTP}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'HTTP', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    id="isFTP"
                                    type="checkbox"
                                    checked={company.FTP}
                                    onChange={(e) => handleAuthorizationChange(company.companyID, 'FTP', e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    id="isSSH"
                                    type="checkbox"
                                    checked={company.SSH}
                                    onChange={(e) => handleAuthorizationChange(company.companyID, 'SSH', e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    id="isSMTP"
                                    type="checkbox"
                                    checked={company.SMTP}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'SMTP', e.target.checked)
                                    }
                                />
                            </td>
                            <td id={user.userID} style={{ cursor: 'pointer' }} onClick={() => toggleSave(company.companyID, document.getElementById("isActive").value, document.getElementById("isHTTP").value, document.getElementById("isFTP").value, document.getElementById("isSSH").value, document.getElementById("isSMTP").value)}>
                                <img
                                    src="/images/save.png" alt="save" style={{ width: '40px', height: '40px' }}/></td>
                        </tr>
                    ))
                ) : filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                        <tr key={company.companyID}>
                            <td>{company.companyID}</td>
                            <td>{company.name}</td>
                            <td>{company.address}</td>
                            <td>
                                <input
                                    id="isActive"
                                    type="checkbox"
                                    checked={company.isActivate}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'isActivate', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    id="isHTTP"
                                    type="checkbox"
                                    checked={company.HTTP}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'HTTP', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    id="isFTP"
                                    type="checkbox"
                                    checked={company.FTP}
                                    onChange={(e) => handleAuthorizationChange(company.companyID, 'FTP', e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    id="isSSH"
                                    type="checkbox"
                                    checked={company.SSH}
                                    onChange={(e) => handleAuthorizationChange(company.companyID, 'SSH', e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    id="isSMTP"
                                    type="checkbox"
                                    checked={company.SMTP}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'SMTP', e.target.checked)
                                    }
                                />
                            </td>
                            <td id={user.userID} style={{ cursor: 'pointer' }} onClick={() => toggleSave(company.companyID, document.getElementById("isActive").value, document.getElementById("isHTTP").value, document.getElementById("isFTP").value, document.getElementById("isSSH").value, document.getElementById("isSMTP").value)}>
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

export default CompanyManagement;