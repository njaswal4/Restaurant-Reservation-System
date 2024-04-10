import unittest
import http.client
import json

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.conn = http.client.HTTPConnection("localhost", 8000)

    def tearDown(self):
        self.conn.close()

    #TESTING to delete for a account
    def test_delete_reservation(self):
        valid_token = 'token' 
        reservation_id = 'id' 

        headers = {'Authorization': f'Bearer {valid_token}'}
        self.conn.request("DELETE", f"/reservations/{reservation_id}", headers=headers)

        response = self.conn.getresponse()
        self.assertEqual(response.status, 200)

        data = json.loads(response.read())
        self.assertEqual(data, {'message': 'Reservation deleted successfully'})
        print('Reservation deleted')

    
if __name__ == '__main__':
    unittest.main()