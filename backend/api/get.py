import unittest
import http.client
import json

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.conn = http.client.HTTPConnection("localhost", 8000)

    def tearDown(self):
        self.conn.close()

    
    def test_get_reservations(self):
        valid_token = 'token' 

        headers = {'Authorization': f'Bearer {valid_token}'}
        self.conn.request("GET", "/reservations", headers=headers)

        response = self.conn.getresponse()
        self.assertEqual(response.status, 200)

        data = json.loads(response.read())
        self.assertIsInstance(data, list)
        print(data)


if __name__ == '__main__':
    unittest.main()