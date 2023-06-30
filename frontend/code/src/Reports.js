import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { apiGet } from "./services/apiService";
import ReportsTable from "./ReportsTable";
import "./reports.css"

function Reports() {

    const [user, setUser] = useState("");
    const [data, setdata] = useState([]);
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

        async function getReports() {
            try {
                const res = await apiGet('/report');
                setdata(res.data.sort(x => x.reportID));
            } catch (error) {
                setdata([])
            }
        }
        getReports();
    }, []);

    return (
        user !== null && (<div id="reports">
            <h1 id="titleReport">Reports</h1>
            <br />
            <ReportsTable data={data}></ReportsTable>
        </div>)
    );
}

export default Reports;