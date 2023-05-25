import React, { useState } from 'react';
import "./table.css"
import MyVerticallyCenteredModal from "./Card";

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
        item.serviceName.toLowerCase().includes(searchService.toLowerCase()) && item.company.toLowerCase().includes(searchCompany.toLowerCase()) && item.trapName.toLowerCase().includes(searchTrapName.toLowerCase()) && (searchMinDate === '' || item.date >= searchMinDate) && (searchMaxDate === '' || item.date <= searchMaxDate)
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
            <p>
                <p>
                    <label htmlFor="username-input">Filter By Service Name:</label>
                    <input type="text" value={searchService} id="serviceName" onChange={handleSearchService} placeholder="Search by Service Name" />
                </p>
                <p>
                    <label htmlFor="username-input">Filter By Date From:</label>
                    <input type="Date" value={searchMinDate} id="fromDate" onChange={handleSearchMinDate} placeholder="From Date" />
                    <label htmlFor="username-input">To:</label>
                    <input type="Date" value={searchMaxDate} id="toDate" onChange={handleSearchMaxDate} placeholder="To Date" />
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
            <br />
            <button id="save-button" onClick={() => downloadCsv(filteredData)}>Save Data as CSV</button>
            <table id="reportTable">
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
                            <td>{item.serviceName}</td>
                            <td>{item.date}</td>
                            <td>{item.company}</td>
                            <td>{item.attackerIP}</td>
                            <td>{item.trapName}</td>
                            <td id={item.reportID} style={{ cursor: 'pointer' }} onClick={() => toggleModalShow(item.reportID)}><img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Information_icon.svg/2048px-Information_icon.svg.png" style={{ width: '40px', height: '40px' }}/></td>
                            <MyVerticallyCenteredModal reportID={item.reportID}
                               show={modalShowMap[item.reportID] || false} // Use modalShowMap to determine the show state
                               onHide={() => toggleModalShow(item.reportID)}
                            />
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

export default ReportsTable;
