import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { apiGet } from "./services/apiService";
import ReportsTable from "./ReportsTable";
import "./reports.css"

const data = [
    { reportID: 1, serviceName: "HTTP", date: "2023-02-10", company: "intel", attackerIP: "10.0.2.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 2, serviceName: "FTP", date: "2023-02-10", company: "intel", attackerIP: "10.0.2.4", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 3, serviceName: "SMTP", date: "2023-02-10", company: "intel", connectionDuration: "1:25", attackerIP: "10.0.2.2", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 4, serviceName: "SSH", date: "2023-02-10", company: "intel", connectionDuration: "1:25", attackerIP: "10.0.2.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 5, serviceName: "HTTP", date: "2023-03-10", company: "google", attackerIP: "10.0.3.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 6, serviceName: "FTP", date: "2023-03-10", company: "google", attackerIP: "10.0.3.4", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 7, serviceName: "SMTP", date: "2023-03-10", company: "google", connectionDuration: "1:25", attackerIP: "10.0.3.2", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 8, serviceName: "SSH", date: "2023-03-10", company: "google", connectionDuration: "1:25", attackerIP: "10.0.3.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 9, serviceName: "HTTP", date: "2023-04-10", company: "apple", attackerIP: "10.0.4.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 10, serviceName: "FTP", date: "2023-04-10", company: "apple", attackerIP: "10.0.4.4", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 11, serviceName: "SMTP", date: "2023-04-10", company: "apple", connectionDuration: "1:25", attackerIP: "10.0.4.2", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 12, serviceName: "SSH", date: "2023-04-10", company: "apple", connectionDuration: "1:25", attackerIP: "10.0.4.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 13, serviceName: "HTTP", date: "2023-05-10", company: "amazon", attackerIP: "10.0.5.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 14, serviceName: "FTP", date: "2023-05-10", company: "amazon", attackerIP: "10.0.5.4", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 15, serviceName: "SMTP", date: "2023-05-10", company: "amazon", connectionDuration: "1:25", attackerIP: "10.0.5.2", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 16, serviceName: "SSH", date: "2023-05-10", company: "amazon", connectionDuration: "1:25", attackerIP: "10.0.5.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 17, serviceName: "FTP", date: "2023-05-10", company: "amazon", attackerIP: "10.0.5.4", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 18, serviceName: "SMTP", date: "2023-05-10", company: "amazon", connectionDuration: "1:25", attackerIP: "10.0.5.2", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 19, serviceName: "SSH", date: "2023-05-10", company: "amazon", connectionDuration: "1:25", attackerIP: "10.0.5.100", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 20, serviceName: "FTP", date: "2023-05-10", company: "amazon", attackerIP: "10.0.5.4", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 21, serviceName: "SMTP", date: "2023-05-10", company: "amazon", connectionDuration: "1:25", attackerIP: "10.0.5.2", trapName: "Admin", sessionINFO: "hello world" },
    { reportID: 22, serviceName: "SSH", date: "2023-05-10", company: "amazon", connectionDuration: "1:25", attackerIP: "10.0.5.100", trapName: "Admin", sessionINFO: "hello world" },
];

function Reports() {

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
            return
        }
        getUser();

    }, []);

    return (
        user !== null && (<div id="reports">
            <h1 id="titleReport">Reports</h1>
            <br/>
            <ReportsTable data={data}></ReportsTable>
        </div>)
    );
}

export default Reports;