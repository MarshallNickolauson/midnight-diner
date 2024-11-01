# Midnight Diner

Welcome to the Midnight Diner project! This full-stack MERN (MongoDB, Express, React, Node.js) application allows you to explore a delightful culinary experience. Follow the instructions below to set up the project locally on your machine.

![alt text](image.png)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14 or later)
- **npm** (comes with Node.js)
- **MongoDB** (local server)
- **MongoDB Compass** (optional, for a GUI interface)

## Getting Started

1. **Clone the Repository:**

   First, clone the repository to your local machine using the following command:

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies:**

   Navigate to the root directory of the project and run:

   ```bash
   npm install
   ```

   Next, navigate to the frontend directory:

   ```bash
   cd frontend
   ```

   Then, install the frontend dependencies:

   ```bash
   npm install
   ```

   Now, navigate back to the root directory:
   
   ```bash
   cd ..
   ```

3. **Configure Environment Variables:**

   Create a .env file in the root directory of the project and add the following environment variables

   ```bash
   NODE_ENV=development
   BACKEND_PORT=5000
   MONGO_URI=mongodb://localhost:27017/midnightDiner
   JWT_SECRET=test123
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Install MongoDB:**

   Ensure you have MongoDB installed on your local machine as well as MongoDB Compass. When both are installed, run the local MongoDB Server from a terminal. Use Compass to make a "midnightDiner" database under your "localdb".

5. **Install MongoDB:**

   After ensuring that your MongoDB server is running, navigate back to the root directory of your project and run:

   ```bash
   npm run dev
   ```

6. **Open Your Browser:**
   
   Open your browser and go to:

   ```bash
   http://localhost:3000
   ```

   You should see the Midnight Diner application up and running!
