import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiGet} from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

function CompanyManagement() {

    const [user, setUser] = useState("");
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await apiGet('/auth/whoami');
                if (!res.data.isSysAdmin)
                    throw Error();
                setUser(res.data);
            } catch (error) {
                setUser(null)
                navigate('/error');
            }
            return
        }
        getUser();

        async function getCompanies() {
            try {
                const res = await apiGet('/company/companies');
                setCompanies(res.data);
                console.log(res.data);
            } catch (error) {
                setCompanies([])
            }
        }
        getCompanies();

    }, []);

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

        const updatedfilteredCompanies = filteredCompanies.map((company) => {
            if (company.companyID === companyId) {
                return { ...company, [field]: value };
            }
            return company;
        });
        setFilteredCompanies(updatedfilteredCompanies);
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
        user && (
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
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.HTTP}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.FTP}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.SSH}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={company.SMTP}
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
                                    id="isActive"
                                    type="checkbox"
                                    checked={company.isActivate}
                                />
                            </td>
                            <td>
                                <input
                                    id="isHTTP"
                                    type="checkbox"
                                    checked={company.HTTP}
                                />
                            </td>
                            <td>
                                <input
                                    id="isFTP"
                                    type="checkbox"
                                    checked={company.FTP}
                                />
                            </td>
                            <td>
                                <input
                                    id="isSSH"
                                    type="checkbox"
                                    checked={company.SSH}
                                />
                            </td>
                            <td>
                                <input
                                    id="isSMTP"
                                    type="checkbox"
                                    checked={company.SMTP}
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
        </div>)
    );
}

export default CompanyManagement;