# Store Management API
This project is a RESTful API built with Node.js and MongoDB to manage products, orders, and users for a online store.

## Getting Started
To get started with the project, follow these instructions:

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running locally or accessible remotely

### Installation
- Clone the repository to your local machine:
  git clone https://github.com/your-username/shop-api.git
- Install dependencies:
cd <folderName>
npm install

- Configure environment variables:
Create a .env file in the root directory of the project and specify the following environment variables:
PORT=3000
MONGO_URI= <your_mongodb_uri>
JWT_SECRET= <your_jwt_secret>
Replace your_jwt_secret with a secret key for JWT token generation.

- Run the server:
npm start

### Usage
Once the server is running, you can access the API endpoints using tools like Postman. Here are the available endpoints:

/products: Endpoint to manage products (GET, POST)
/products/{productId}: Endpoint to get, update, or delete a product by ID (GET, PATCH, DELETE)
/orders: Endpoint to manage orders (GET, POST)
/orders/{orderId}: Endpoint to get or delete an order by ID (GET, DELETE)
/users/signup: Endpoint to register a new user (POST)
/users/login: Endpoint to authenticate a user and generate a JWT token (POST)
/users/{userId}: Endpoint to delete a user by ID (DELETE)

#### Make sure to include the required authentication token in the headers for protected routes.

## Built With
Node.js - JavaScript runtime environment
Express.js - Web application framework for Node.js
MongoDB - NoSQL database
JWT - JSON Web Tokens for user authentication
Multer - Middleware for handling multipart/form-data (file uploads)

## Author
Apsara De Silva


# THANK YOU ❤️
