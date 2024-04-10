import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getToken } from "../lib/authenticate";

export default function Login() {
    //set states and config router
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        //Redirect to login page if there's no token in local storage
        const token = getToken();
        if (!token) {
            router.push('/login');
        }
    }, []);

    //login function
    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_id', res.data.user_id);
            router.push('/reservations');
        } catch (err) {
            setError('Invalid username or password')
        }
    };

    //render login form
    return (
        <>
        <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={login}>
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

        {error && <Alert variant="danger">{error}</Alert>}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
        </>
    );
}