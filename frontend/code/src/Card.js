import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiGet } from './services/apiService';
import Table from 'react-bootstrap/Table';

function MyVerticallyCenteredModal(props) {

    const [logs, setLogs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(logs.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        async function getLogs() {
            try {
                const user = await apiGet(`/log/${props.sessionLogID}`);
                setLogs(user.data);
                console.log(user.data);
            } catch (error) {
                setLogs([])
                console.error(error)
            }
        }
        getLogs();
    }, []);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Logs of Service '{props.ServiceName}' and Trap '{props.TrapName}'
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>Description / Step</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.slice(startIndex, endIndex).map((item) => (
                            <tr key={item.logID}>
                                <td>{item.logID}</td>
                                <td>{item.description}</td>
                                <td>{new Date(item.createAt).toLocaleString()}</td>
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
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default MyVerticallyCenteredModal;