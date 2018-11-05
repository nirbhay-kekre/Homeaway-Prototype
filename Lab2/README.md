## AWS Instances
S3: http://homeaway2525.s3-website.us-east-2.amazonaws.com/ <br>
EC2: 52.14.46.43

## Architecture Diagram
All the routes are implemented in the following way: 
![alt https://github.com/Anuragis/CMPE273-37/blob/master/Lab2/BackendArchitecture.png](https://github.com/Anuragis/CMPE273-37/blob/master/Lab2/BackendArchitecture.png)

## Prerequisites

Node, npm, Java, kafka_2.11-1.1.0, zookeeper

## Install frontend:
get the code from frontend Folder and run 
    **npm install** and
    **npm start**

## Start kafka and zookeeper
  please refer to https://kafka.apache.org/quickstart <br>
  **Create all the topics listed in** https://github.com/Anuragis/CMPE273-37/blob/master/Lab2/backend/kafka/topics.js
  
## Running Backend Routes
get the code from backend folder and do the changes needed for Host and port variables based on where server is running in https://github.com/Anuragis/CMPE273-37/blob/master/Lab2/backend/authProxy/config/settings.js <br><br>
run **npm install** and **node index.js**

## Running Kafka Backend:
get the code from Kafka backend and do the changes in https://github.com/Anuragis/CMPE273-37/blob/master/Lab2/kafka-backend/connection/mongoose.js for mongoDb Connection. <br><br>
run **npm install** and **npm start**
