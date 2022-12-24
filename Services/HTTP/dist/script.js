// $(document).ready(function() {
//
//     var state = false;
//
//     //$("input:text:visible:first").focus();
//
//     $('#accesspanel').on('submit', function(e) {
//
//         e.preventDefault();
//
//         state = !state;
//
//         if (state) {
//             document.getElementById("litheader").className = "poweron";
//             document.getElementById("go").className = "";
//             document.getElementById("go").value = "Initializing...";
//         }else{
//             document.getElementById("litheader").className = "";
//             document.getElementById("go").className = "denied";
//             document.getElementById("go").value = "Access Denied";
//         }
//     });
// });

function usersdetails(){
    fetch('/UsersDetails', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            let array = result;
            const table = document.createElement('table');
            table.setAttribute("border", "1");
            table.setAttribute("id", "table");
            const header = document.createElement('tr');
            const col1 = document.createElement("th")
                .append("span", "PrivateName");
            const col2 = document.createElement("th")
                .append("span", "LastName");
            const col3 = document.createElement("th")
                .append("span", "ID");
            const col4 = document.createElement("th")
                .append("span", "Phone");
            const col5 = document.createElement("th")
                .append("span", "Email");
            const col6 = document.createElement("th")
                .append("span", "City");
            array.forEach(function(element){
                const pname = document.createTextNode(element.PrivateName);
                const lname = document.createTextNode(element.LastName);
                const id = document.createTextNode(element.ID);
                const phone = document.createTextNode(element.Phone);
                const email = document.createTextNode(element.Email);
                const city = document.createTextNode(element.City);
                const row = document.createElement("tr");
                const col1 = document.createElement("td").append("span", pname);
                const col2 = document.createElement("td").append("span", lname);
                const col3 = document.createElement("td").append("span", id);
                const col4 = document.createElement("td").append("span", phone);
                const col5 = document.createElement("td").append("span", email);
                const col6 = document.createElement("td").append("span", city);
                row.append(col1).append(col2).append(col3).append(col4).append(col5).append(col6);
                table.append(row);
                })

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

document.querySelector("#btn1").addEventListener("click", usersdetails);
// document.querySelector("#btn2").addEventListener("click", employmentsdetails);
// document.querySelector("#btn3").addEventListener("click", administratordetails);