import ClientsTable from "./ClientsTable";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiGet} from "./services/apiService";

function CompanyUsers() {

    const [user, setUser] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                if (!user.data.isCompanyAdmin)
                    throw Error();
                setUser(user.data);
            } catch (error) {
                setUser(null);
                navigate('/error');
            }
        }
        getUser();

        async function getUsersData() {
            try {
                const res = await apiGet('/company/users');
                setData(res.data);
            } catch (error) {
                setData([])
            }
        }
        getUsersData();

    }, []);

    return (
        user && (<div id="reports">
            <h1 id="companyClients">{user.companyName} - Users</h1>
            <br/>
            <ClientsTable data={data} isCompany={false}></ClientsTable>
        </div>)
    );
}

export default CompanyUsers;