import unittest
import http.client
import json

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.conn = http.client.HTTPConnection("localhost", 8000)

    def tearDown(self):
        self.conn.close()

    #TESTING to update for a account
    def test_update_reservation(self):
        valid_token = 'token' 
        reservation_id = 'id' 
        update_data = {
            'date': '2024-04-09',
            'time': '20:00',
            'party_size': 5
        }
        headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {valid_token}'}
        self.conn.request("PUT", f"/reservations/{reservation_id}", body=json.dumps(update_data), headers=headers)

        response = self.conn.getresponse()
        self.assertEqual(response.status, 200)

        data = json.loads(response.read())
        self.assertEqual(data, {'message': 'Reservation updated successfully'})
        print('Updated reservation')

if __name__ == '__main__':
    unittest.main()