function updateTable(table){
    const divTable = document.querySelector(".table");
    if(divTable.firstChild != null)
    {
        divTable.removeChild(divTable.firstChild);
    }
    divTable.appendChild(table);
}

function usersdetails(){
    fetch('/UsersDetails', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            let array = result;
            const table = document.createElement('table');
            const header = document.createElement('tr');
            const col1 = document.createElement("th");
            col1.append("PrivateName");
            const col2 = document.createElement("th");
            col2.append("LastName");
            const col3 = document.createElement("th");
            col3.append("ID");
            const col4 = document.createElement("th");
            col4.append("Phone");
            const col5 = document.createElement("th");
            col5.append("Email");
            const col6 = document.createElement("th");
            col6.append("City");
            header.append(col1);
            header.append(col2);
            header.append(col3);
            header.append(col4);
            header.append(col5);
            header.append(col6);
            table.append(header);
            array.forEach(function(element){
                const pname = document.createTextNode(element.PrivateName);
                const lname = document.createTextNode(element.LastName);
                const id = document.createTextNode(element.ID);
                const phone = document.createTextNode(element.Phone);
                const email = document.createTextNode(element.Email);
                const city = document.createTextNode(element.City);
                const row = document.createElement("tr");
                const col1 = document.createElement("td");
                col1.append(pname);
                const col2 = document.createElement("td");
                col2.append(lname);
                const col3 = document.createElement("td");
                col3.append(id);
                const col4 = document.createElement("td");
                col4.append(phone);
                const col5 = document.createElement("td");
                col5.append(email);
                const col6 = document.createElement("td");
                col6.append(city);
                row.append(col1);
                row.append(col2);
                row.append(col3);
                row.append(col4);
                row.append(col5);
                row.append(col6);
                table.append(row);
                updateTable(table);
                })

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function employmentsdetails(){
    fetch('/EmploymentsDetails', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            let array = result;
            const table = document.createElement('table');
            const header = document.createElement('tr');
            const col1 = document.createElement("th");
            col1.append("PrivateName");
            const col2 = document.createElement("th");
            col2.append("LastName");
            const col3 = document.createElement("th");
            col3.append("UserID");
            const col4 = document.createElement("th");
            col4.append("Phone");
            const col5 = document.createElement("th");
            col5.append("Email");
            const col6 = document.createElement("th");
            col6.append("Region");
            const col7 = document.createElement("th");
            col7.append("JobTitleName");
            header.append(col1);
            header.append(col2);
            header.append(col3);
            header.append(col4);
            header.append(col5);
            header.append(col6);
            header.append(col7);
            table.append(header);
            array.forEach(function(element){
                const pname = document.createTextNode(element.PrivateName);
                const lname = document.createTextNode(element.LastName);
                const userid = document.createTextNode(element.UserID);
                const phone = document.createTextNode(element.Phone);
                const email = document.createTextNode(element.Email);
                const region = document.createTextNode(element.Region);
                const jobTitleName = document.createTextNode(element.JobTitleName);
                const row = document.createElement("tr");
                const col1 = document.createElement("td");
                col1.append(pname);
                const col2 = document.createElement("td");
                col2.append(lname);
                const col3 = document.createElement("td");
                col3.append(userid);
                const col4 = document.createElement("td");
                col4.append(phone);
                const col5 = document.createElement("td");
                col5.append(email);
                const col6 = document.createElement("td");
                col6.append(region);
                const col7 = document.createElement("td");
                col7.append(jobTitleName);
                row.append(col1);
                row.append(col2);
                row.append(col3);
                row.append(col4);
                row.append(col5);
                row.append(col6);
                row.append(col7);
                table.append(row);
                updateTable(table);
            })

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function administratordetails(){
    fetch('/AdministratorDetails', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            let array = result;
            const table = document.createElement('table');
            const header = document.createElement('tr');
            const col1 = document.createElement("th");
            col1.append("PrivateName");
            const col2 = document.createElement("th");
            col2.append("LastName");
            const col3 = document.createElement("th");
            col3.append("UserID");
            const col4 = document.createElement("th");
            col4.append("Phone");
            const col5 = document.createElement("th");
            col5.append("Email");
            const col6 = document.createElement("th");
            col6.append("Region");
            const col7 = document.createElement("th");
            col7.append("JobTitleName");
            header.append(col1);
            header.append(col2);
            header.append(col3);
            header.append(col4);
            header.append(col5);
            header.append(col6);
            header.append(col7);
            table.append(header);
            array.forEach(function(element){
                const pname = document.createTextNode(element.PrivateName);
                const lname = document.createTextNode(element.LastName);
                const userid = document.createTextNode(element.UserID);
                const phone = document.createTextNode(element.Phone);
                const email = document.createTextNode(element.Email);
                const region = document.createTextNode(element.Region);
                const jobTitleName = document.createTextNode(element.JobTitleName);
                const row = document.createElement("tr");
                const col1 = document.createElement("td");
                col1.append(pname);
                const col2 = document.createElement("td");
                col2.append(lname);
                const col3 = document.createElement("td");
                col3.append(userid);
                const col4 = document.createElement("td");
                col4.append(phone);
                const col5 = document.createElement("td");
                col5.append(email);
                const col6 = document.createElement("td");
                col6.append(region);
                const col7 = document.createElement("td");
                col7.append(jobTitleName);
                row.append(col1);
                row.append(col2);
                row.append(col3);
                row.append(col4);
                row.append(col5);
                row.append(col6);
                row.append(col7);
                table.append(row);
                updateTable(table);
            })

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const logout = async() => {
    await fetch('/logout', {
        method: 'post',
    })
        .then((response) => response.text())
        .then((result) => {
            location.reload();
        })
        .catch((error) => console.error($`ERROR logout: ${error}`))
}

document.querySelector("#usersDetails").addEventListener("click", usersdetails);
document.querySelector("#employmentsDetails").addEventListener("click", employmentsdetails);
document.querySelector("#administratorDetails").addEventListener("click", administratordetails);
document.querySelector("#logout").addEventListener("click", logout);