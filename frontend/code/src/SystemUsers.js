import ClientsTable from "./ClientsTable";
import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { apiGet } from "./services/apiService";

function SystemUsers() {

    const [user, setUser] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                if (!user.data.isSysAdmin)
                    throw Error();
                setUser(user.data);
            } catch (error) {
                setUser(null)
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
            <h1 id="systemUsersClients">System Users</h1>
            <br/>
            <ClientsTable data={data} isCompany={true}></ClientsTable>
        </div>)
    );
}

export default SystemUsers;