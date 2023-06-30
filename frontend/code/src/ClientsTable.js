import React, { useState } from 'react';
import "./ReportsTable.css"
import {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { apiGet } from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

const ClientsTable = ({data, isCompany}) => {
    const [searchFullName, setSearchFullName] = useState('');
    const [searchCompany, setSearchCompany] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [searchMinDate, setSearchMinDate] = useState('');
    const [searchMaxDate, setSearchMaxDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleSearchFullName = (event) => {
        setSearchFullName(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchCompany = (event) => {
        setSearchCompany(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchEmail = (event) => {
        setSearchEmail(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchPhone = (event) => {
        setSearchPhone(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchMinDate = (event) => {
        setSearchMinDate(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchMaxDate = (event) => {
        setSearchMaxDate(event.target.value);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setSearchFullName('');
        setSearchCompany('');
        setSearchEmail('');
        setSearchPhone('');
        setSearchMinDate('');
        setSearchMaxDate('');
    };

    const filteredData = data.filter((item) =>
            item.fullName.toLowerCase().includes(searchFullName.toLowerCase()) && item.email.toLowerCase().includes(searchEmail.toLowerCase()) && item.phone.toLowerCase().includes(searchPhone.toLowerCase()) && (isCompany ? item.companyName.toLowerCase().includes(searchCompany.toLowerCase()) : true) && (searchMinDate === '' || item.birthdate >= searchMinDate) && (searchMaxDate === '' || item.birthdate <= searchMaxDate)
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
        }
        getUser();

    }, []);

    return (
        user !== null && (<div>
            <Container className="usersPages">
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Filter By Full Name</InputGroup.Text>
                    <Form.Control
                        id="fullName"
                        placeholder="Search by Full Name"
                        aria-describedby="basic-addon1"
                        value={searchFullName}
                        onChange={handleSearchFullName}
                    />
                </InputGroup>
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Filter By Date From</InputGroup.Text>
                    <Form.Control
                        id="fromDate"
                        type="Date"
                        aria-describedby="basic-addon1"
                        value={searchMinDate}
                        onChange={handleSearchMinDate}
                    />
                    <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
                    <Form.Control
                        id="toDate"
                        type="Date"
                        aria-describedby="basic-addon1"
                        value={searchMaxDate}
                        onChange={handleSearchMaxDate}
                    />
                </InputGroup>

                {isCompany && (
                    <InputGroup className="mb-3 reportInputs">
                        <InputGroup.Text id="basic-addon1">Filter By Company</InputGroup.Text>
                        <Form.Control
                            id="company"
                            placeholder="Search by Company"
                            aria-describedby="basic-addon1"
                            value={searchCompany}
                            onChange={handleSearchCompany}
                        />
                    </InputGroup>
                )}
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Filter By Email</InputGroup.Text>
                    <Form.Control
                        id="email"
                        placeholder="Search by Email"
                        aria-describedby="basic-addon1"
                        value={searchEmail}
                        onChange={handleSearchEmail}
                    />
                </InputGroup>
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Filter By Phone</InputGroup.Text>
                    <Form.Control
                        id="phone"
                        placeholder="Search by Phone"
                        aria-describedby="basic-addon1"
                        value={searchPhone}
                        onChange={handleSearchPhone}
                    />
                </InputGroup>

                <Button variant="secondary" onClick={handleClearSearch}>Clear</Button>
            </Container>
            <br />
            <table id="reportTable">
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Birth Date</th>
                    {isCompany && <th>Company</th>}
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.slice(startIndex, endIndex).map((item) => (
                    <tr key={item.userID}>
                        <td>{item.userID}</td>
                        <td>{item.fullName}</td>
                        <td>{item.birthdate}</td>
                        {isCompany && <td>{item.companyName}</td>}
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                ))}
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
export default ClientsTable;