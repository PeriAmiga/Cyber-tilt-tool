import React, { useState } from 'react';
import "./ReportsTable.css"

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
            item.fullName.toLowerCase().includes(searchFullName.toLowerCase()) && item.email.toLowerCase().includes(searchEmail.toLowerCase()) && item.phone.toLowerCase().includes(searchPhone.toLowerCase()) && (isCompany ? item.company.toLowerCase().includes(searchCompany.toLowerCase()) : true) && (searchMinDate === '' || item.birthdate >= searchMinDate) && (searchMaxDate === '' || item.birthdate <= searchMaxDate)
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            <p>
                <p>
                    <label htmlFor="username-input">Filter By Full Name:</label>
                    <input type="text" value={searchFullName} id="fullName" onChange={handleSearchFullName} placeholder="Search by Full Name" />
                </p>
                <p>
                    <label htmlFor="username-input">Filter By Birth Date From:</label>
                    <input type="Date" value={searchMinDate} id="fromDate" onChange={handleSearchMinDate} placeholder="From Date" />
                    <label htmlFor="username-input">To:</label>
                    <input type="Date" value={searchMaxDate} id="toDate" onChange={handleSearchMaxDate} placeholder="To Date" />
                </p>
                {isCompany && (
                    <p>
                        <label htmlFor="username-input">Filter By Company:</label>
                        <input
                            type="text"
                            id="company"
                            value={searchCompany}
                            onChange={handleSearchCompany}
                            placeholder="Search by Company"
                        />
                    </p>
                )}
                <p>
                    <label htmlFor="username-input">Filter By Email:</label>
                    <input type="text" value={searchEmail} id="email" onChange={handleSearchEmail} placeholder="Search by Email" />
                </p>
                <p>
                    <label htmlFor="username-input">Filter By Phone:</label>
                    <input type="text" value={searchPhone} id="phone" onChange={handleSearchPhone} placeholder="Search by Phone" />
                </p>
                <button onClick={handleClearSearch}>Clear</button>
            </p>
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
                        {isCompany && <td>{item.company}</td>}
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
        </div>
    );
}
export default ClientsTable;