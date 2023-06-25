import React, { useState } from 'react';
import "./ReportsTable.css"
import MyVerticallyCenteredModal from "./Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

function downloadCsv(filteredData) {
    try {
        const csv = toCsv(filteredData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating CSV:', error);
    }
}

const toCsv = function (data) {
    const headers = Object.keys(data[0]).filter(key => key !== 'Logs');
    const rows = data.map(function (row) {
        return headers.map(function (header) {
            return row[header];
        });
    });

    const csvContent =
        headers.join(',') +
        '\n' +
        rows.map(function (row) {
            return row.join(',');
        }).join('\n');

    return csvContent;
};

const ReportsTable = ({ data }) => {
    const [searchService, setSearchService] = useState('');
    const [searchCompany, setSearchCompany] = useState('');
    const [searchAttackerIP, setSearchAttackerIP] = useState('');
    const [searchTrapName, setSearchTrapName] = useState('');
    const [searchMinDate, setSearchMinDate] = useState('');
    const [searchMaxDate, setSearchMaxDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleClearSearch = () => {
        setSearchService('');
        setSearchCompany('');
        setSearchAttackerIP('');
        setSearchTrapName('');
        setSearchMinDate('');
        setSearchMaxDate('');
    };

    const handleSearchService = (event) => {
        setSearchService(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchCompany = (event) => {
        setSearchCompany(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchAttackerIP = (event) => {
        setSearchAttackerIP(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchTrapName = (event) => {
        setSearchTrapName(event.target.value);
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

    const filteredData = data.filter((item) =>
        item.attackerIP.includes(searchAttackerIP) &&
        item.companies_services_name.toLowerCase().includes(searchService.toLowerCase()) && item.companyName.toLowerCase().includes(searchCompany.toLowerCase()) && item.trapName.toLowerCase().includes(searchTrapName.toLowerCase()) && (searchMinDate === '' || item.createAt >= searchMinDate) && (searchMaxDate === '' || item.createAt <= searchMaxDate)
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const [modalShowMap, setModalShowMap] = useState({});
    // Function to toggle the modal show state for a specific reportID
    const toggleModalShow = (reportID) => {
        setModalShowMap((prevModalShowMap) => ({
            ...prevModalShowMap,
            [reportID]: !prevModalShowMap[reportID] // Toggle the show state
        }));
    };

    return (
        <div>
            <Container className="reportPage">
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Filter By Service Name</InputGroup.Text>
                    <Form.Control
                        id="serviceName"
                        placeholder="Search by Service Name"
                        aria-describedby="basic-addon1"
                        value={searchService}
                        onChange={handleSearchService}
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
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Filter By Attacker IP</InputGroup.Text>
                    <Form.Control
                        id="attackerIP"
                        placeholder="Search by Attacker IP"
                        aria-describedby="basic-addon1"
                        value={searchAttackerIP}
                        onChange={handleSearchAttackerIP}
                    />
                </InputGroup>
                <InputGroup className="mb-3 reportInputs">
                    <InputGroup.Text id="basic-addon1">Filter By Trap Name</InputGroup.Text>
                    <Form.Control
                        id="trapName"
                        placeholder="Search by Trap Name"
                        aria-describedby="basic-addon1"
                        value={searchTrapName}
                        onChange={handleSearchTrapName}
                    />
                </InputGroup>

                <Button variant="secondary" onClick={handleClearSearch}>Clear</Button>

                <br />
                <Button id="save-button" variant="success" onClick={() => downloadCsv(filteredData)}>Save Data as CSV</Button>
                <Table id="reportTable" striped>
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Service Name</th>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Attacker IP</th>
                            <th>Trap Name</th>
                            <th>Logs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.slice(startIndex, endIndex).map((item) => (
                            <tr key={item.reportID}>
                                <td>{item.reportID}</td>
                                <td>{item.companies_services_name}</td>
                                <td>{item.createAt}</td>
                                <td>{item.companyName}</td>
                                <td>{item.attackerIP}</td>
                                <td>{item.trapName}</td>
                                <td id={item.sessionLogID} style={{ cursor: 'pointer' }} onClick={() => toggleModalShow(item.sessionLogID)}><img
                                    src="/images/Information_icon.png" style={{ width: '40px', height: '40px' }} /></td>
                                <MyVerticallyCenteredModal
                                    sessionLogID={item.sessionLogID}
                                    ServiceName={item.companies_services_name}
                                    TrapName={item.trapName}
                                    show={modalShowMap[item.sessionLogID] || false} // Use modalShowMap to determine the show state
                                    onHide={() => toggleModalShow(item.sessionLogID)}
                                />
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="pagination" id="tablePages">
                    {pageNumbers.map((number) => (
                        <button key={number} onClick={() => setCurrentPage(number)}>
                            {number}
                        </button>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default ReportsTable;
