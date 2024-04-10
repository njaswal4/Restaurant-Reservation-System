import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Form, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import { getToken } from '../lib/authenticate';

export default function Newreservation() {
    //set states and config router
    const [reservations, setReservations] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [partySize, setPartySize] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const router = useRouter();

    useEffect(() => {
        //Redirect to login page if there's no token in local storage
        const token = getToken();
        if (!token) {
            router.push('/login');
        }
    }, []);

    const makeReservation = async (e) => {
        e.preventDefault();
        try {
            //Get the user_id of the currently logged-in user
            const user_id = localStorage.getItem('user_id');
            const res = await axios.post('http://localhost:8000/reservations', { user_id, date, time, partySize });
            setReservations([...reservations, res.data]);
            setConfirmation('Reservation created successfully!'); 
        } catch (err) {
            console.error(err);
        }
    };

    //render the new reservation form
    return (
        <Container>
            <Form onSubmit={makeReservation}>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control required type="date" onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
                <br></br>
                <Form.Group controlId="time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control required type="time" onChange={(e) => setTime(e.target.value)} />
                </Form.Group>
                <br></br>
                <Form.Group controlId="partySize">
                    <Form.Label>Party Size</Form.Label>
                    <Form.Control min={0} max={12} required type="number" onChange={(e) => setPartySize(e.target.value)} />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">Make Reservation</Button>
            </Form>
            <br></br>
            {confirmation && <Alert variant="success">{confirmation}</Alert>} 
        </Container>
    );
}