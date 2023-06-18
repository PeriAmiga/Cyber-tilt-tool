import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiGet} from "./services/apiService";

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

    return (
        user !== null && (
        <div>
            <h1>Company - Management</h1>
            <div>
                <label htmlFor="searchInput">Search by Name:</label>
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
                    <th>Company ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>isActivate</th>
                    <th>HTTP</th>
                    <th>FTP</th>
                    <th>SSH</th>
                    <th>SMTP</th>
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
                                    type="checkbox"
                                    checked={company.isActivate}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'isActivate', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.HTTP}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'HTTP', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.FTP}
                                    onChange={(e) => handleAuthorizationChange(company.companyID, 'FTP', e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.SSH}
                                    onChange={(e) => handleAuthorizationChange(company.companyID, 'SSH', e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.SMTP}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'SMTP', e.target.checked)
                                    }
                                />
                            </td>
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
                                    type="checkbox"
                                    checked={company.isActivate}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'isActivate', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.HTTP}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'HTTP', e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.FTP}
                                    onChange={(e) => handleAuthorizationChange(company.companyID, 'FTP', e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.SSH}
                                    onChange={(e) => handleAuthorizationChange(company.companyID, 'SSH', e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.SMTP}
                                    onChange={(e) =>
                                        handleAuthorizationChange(company.companyID, 'SMTP', e.target.checked)
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
            <button id="register" onClick={() => navigate('/registercompany')}>
                Register a new company
            </button>
        </div>)
    );
}

export default CompanyManagement;