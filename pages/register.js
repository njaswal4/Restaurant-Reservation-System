import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
    //set states and config router
    const [warning, setWarning] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const router = useRouter();

    //register function 
    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/register', { username, password, email });
            router.push('/login');
        } catch (err) {
            console.error(err);
        }
    }

    //render register form 
    return (
        <>
        <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          Enter your register information below:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={register}>
        <Form.Group>
            <Form.Label>User:</Form.Label>
            <Form.Control type="text" value={username} id="username" name="userName" onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        {warning && <>
          <br />
          <Alert variant='danger'>
            {warning}
          </Alert>
        </>}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
      </>
    );
}