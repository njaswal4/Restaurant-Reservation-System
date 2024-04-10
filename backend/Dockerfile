# Use the official Python image as base
FROM python:3.9

# Install SQLite3
RUN apt-get update && apt-get install -y sqlite3

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Run server.py when the container launches
CMD ["python", "server.py"]
