import React, { useState } from 'react';
import "./table.css"
import Papa from 'papaparse';

function downloadCsv(data) {
    try {
        const csv = Papa.unparse(data);
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


const Table = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchService, setSearchService] = useState('');
    const [searchCompany, setSearchCompany] = useState('');
    const [searchAttackerIP, setSearchAttackerIP] = useState('');
    const [searchTrapName, setSearchTrapName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
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

    const filteredData = data.filter((item) =>
        item.attackerIP.includes(searchAttackerIP) &&
    item.serviceName.toLowerCase().includes(searchService.toLowerCase()) && item.company.toLowerCase().includes(searchCompany.toLowerCase()) && item.trapName.toLowerCase().includes(searchTrapName.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    return (
        <div>
            <p>
                <p>
                    <label htmlFor="username-input">Filter By Service Name:</label>
                    <input type="text" value={searchService} id="serviceName" onChange={handleSearchService} placeholder="Search by Service Name" />
                </p>
                <p>
                    <label htmlFor="username-input">Filter By Date From:</label>
                    <input type="Date" value={searchTerm} id="fromDate" onChange={handleSearch} placeholder="From Date" />
                    <label htmlFor="username-input">To:</label>
                    <input type="Date" value={searchTerm} id="toDate" onChange={handleSearch} placeholder="To Date" />
                </p>
                <p>
                    <label htmlFor="username-input">Filter By Company:</label>
                    <input type="text" value={searchCompany} id="company" onChange={handleSearchCompany} placeholder="Search by Company" />
                </p>
                <p>
                    <label htmlFor="username-input">Filter By Attacker IP:</label>
                    <input type="text" value={searchAttackerIP} id="attackerIP" onChange={handleSearchAttackerIP} placeholder="Search by Attacker IP" />
                </p>
                <p>
                    <label htmlFor="username-input">Filter By Trap Name:</label>
                    <input type="text" value={searchTrapName} id="trapName" onChange={handleSearchTrapName} placeholder="Search by Trap Name" />
                </p>
            </p>
            <br/>
            <button id="save-button" onClick={() => downloadCsv(data)}>Save Data as CSV</button>
            <table>
                <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Service Name</th>
                    <th>Date</th>
                    <th>Company</th>
                    <th>Attacker IP</th>
                    <th>Trap Name</th>
                    <th>Session INFO</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.slice(startIndex, endIndex).map((item) => (
                    <tr key={item.reportID}>
                        <td>{item.reportID}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.date}</td>
                        <td>{item.company}</td>
                        <td>{item.attackerIP}</td>
                        <td>{item.trapName}</td>
                        <td>{item.sessionINFO}</td>
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
        </div>
    );
};

export default Table;
