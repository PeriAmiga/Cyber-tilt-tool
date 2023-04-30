import React from 'react'
import Button from 'react-bootstrap/Button';

function Home() {
    return (
        <div id="reports">
            <Button variant="outline-primary">HTTP</Button>{' '}
            <Button variant="outline-primary">FTP</Button>{' '}
            <Button variant="outline-primary">SMTP</Button>{' '}
            <Button variant="outline-primary">SSH</Button>{' '}
        </div>
    );
}

export default Home;