import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Card, Container, ListGroup, Badge, Button, Modal, Form } from 'react-bootstrap';

export default function Reservations() {
    //set states and config router
    const [reservations, setReservations] = useState([]);
    const [show, setShow] = useState(false);
    const [currentReservation, setCurrentReservation] = useState(null);
    const [updatedDate, setUpdatedDate] = useState('');
    const [updatedTime, setUpdatedTime] = useState('');
    const [updatedPartySize, setUpdatedPartySize] = useState('');
    const router = useRouter();

    useEffect(() => {
        //Redirect to login page if there's no token in local storage
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchReservations();
        }
    }, []);

    //function to get all the current reservations (GET METHOD from server.py)
    const fetchReservations = async () => {
        try {
            //Get the user_id of the currently logged-in user
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const res = await axios.get('http://localhost:8000/reservations', config);
            setReservations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    //function to check if a reservation (date and time) is expired
    const isExpired = (reservationDate, reservationTime) => {
        const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);
        const currentDateTime = new Date();
        return reservationDateTime < currentDateTime;
    };

    //function to cancel a reservation (DELETE METHOD from server.py)
    const cancelReservation = async (index) => {
        try {
            //Get the user_id of the currently logged-in user
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const reservation = reservations[index];
            await axios.delete(`http://localhost:8000/reservations/${reservation.id}`, config);
            const updatedReservations = [...reservations];
            updatedReservations[index].canceled = true;
            setReservations(updatedReservations);
        } catch (err) {
            console.error(err);
        }
    };

    //function to update reservation (UPDATE METHOD from server.py)
    const updateReservation = async () => {
        if (updatedPartySize < 1 || updatedPartySize > 12) {
            alert('Party size must be between 1 and 12');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.put(`http://localhost:8000/reservations/${currentReservation.id}`, {
                date: updatedDate,
                time: updatedTime,
                party_size: updatedPartySize  
            }, config);
            fetchReservations();
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    //set new values
    const handleClose = () => setShow(false);
    const handleShow = (reservation) => {
        setCurrentReservation(reservation);
        setUpdatedDate(reservation.date);
        setUpdatedTime(reservation.time);
        setUpdatedPartySize(reservation.party_size);
        setShow(true);
    };

    //if not active reservations then display a box message 
    if (reservations.length === 0) {
        return (
        <Card>
            <Card.Body>
                <h4>Nothing Here</h4>
                Make a new reservation today! We look forward to seeing you!
            </Card.Body>
        </Card>
        )
    }

    //render the reservations 
    return (
        <Container>
            <h2>Your Reservations</h2>
            <br></br>
            <ListGroup>
                {reservations.map((reservation, index) => (
                    <ListGroup.Item key={index} style={{ marginBottom: '20px' }}>
                        Date: {reservation.date}, Time: {reservation.time}, Party Size: {reservation.party_size}
                        <div className="d-flex justify-content-between">
                            {isExpired(reservation.date, reservation.time) && <Badge variant="danger">Reservation expired</Badge>}
                            {reservation.canceled && <Badge variant="warning">Canceled reservation</Badge>}
                            {!reservation.canceled && !isExpired(reservation.date, reservation.time) && <Button variant="danger" onClick={() => cancelReservation(index)}>Cancel Reservation</Button>}
                            {!reservation.canceled && !isExpired(reservation.date, reservation.time) && <Button variant="primary" onClick={() => handleShow(reservation)}>Update Reservation</Button>}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" value={updatedDate} onChange={e => setUpdatedDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" value={updatedTime} onChange={e => setUpdatedTime(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formPartySize">
                            <Form.Label>Party Size</Form.Label>
                            <Form.Control type="number" min="1" max="12" value={updatedPartySize} onChange={e => setUpdatedPartySize(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateReservation}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}