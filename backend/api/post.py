import unittest
import http.client
import json

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.conn = http.client.HTTPConnection("localhost", 8000) #connection

    def tearDown(self):
        self.conn.close()

    #TESTING to register for a account
    def test_1_register(self):
        new_user_data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'password123'
        }
        headers = {'Content-Type': 'application/json'}
        self.conn.request("POST", "/register", body=json.dumps(new_user_data), headers=headers)

        response = self.conn.getresponse()
        self.assertEqual(response.status, 201)

        data = json.loads(response.read())
        self.assertEqual(data, {'message': 'User registered successfully'})
        print('User registered')
    
    #TESTING to login for a account
    def test_2_login(self):
        user_data = {
            'username': 'newuser',
            'password': 'password123'
        }
        headers = {'Content-Type': 'application/json'}
        self.conn.request("POST", "/login", body=json.dumps(user_data), headers=headers)

        response = self.conn.getresponse()
        self.assertEqual(response.status, 200)

        data = json.loads(response.read())
        self.assertEqual(data['message'], 'Login successful')
        self.assertIsNotNone(data['token'])
        self.assertIsNotNone(data['user_id'])
        print('User logged in')
        print(data)

    #TESTING to make a new reservation
    def test_3_make_reservation(self):
        reservation_data = {
            'user_id': '1',
            'date': '2024-04-08',
            'time': '19:00',
            'partySize': 4
        }
        valid_token = 'token' #auto test
        headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {valid_token}'}
        self.conn.request("POST", "/reservations", body=json.dumps(reservation_data), headers=headers)

        response = self.conn.getresponse()
        self.assertEqual(response.status, 201)

        data = json.loads(response.read())
        self.assertEqual(data, {'message': 'Reservation made successfully'})
        print("Reservation made:")
        print(data)


if __name__ == '__main__':
    unittest.main()