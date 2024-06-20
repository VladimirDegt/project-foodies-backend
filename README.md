# Project Foodies Backend

This repository contains the backend code for Project Foodies, a social platform for food enthusiasts to share and discover new recipes, review restaurants, and follow other foodies.

## Table of Contents

- [Project Foodies Backend](#project-foodies-backend)
    - [Table of Contents](#table-of-contents)
    - [About the Project](#about-the-project)
    - [Features](#features)
    - [Prerequisites](#prerequisites)
    - [Getting Started](#getting-started)
        - [Installation](#installation)
        - [Setting Up Environment Variables](#setting-up-environment-variables)
        - [Start the Server](#start-the-server)
    - [Scripts](#scripts)
    - [API Documentation](#api-documentation)

## About the Project

Project Foodies Backend is a Node.js application built with Express.js, MongoDB, and other technologies. It provides a RESTful API for managing user authentication, profiles, image uploading, and social features such as following other users.

The backend integrates with Cloudinary for image uploads and utilizes JWT (JSON Web Tokens) for authentication and authorization. It includes comprehensive API documentation using Swagger.

## Features

- **User Authentication**: Secure user registration and login using JWT.
- **User Profile Management**: Edit profile information and upload profile pictures.
- **Follow System**: Follow and unfollow other users to see their activities.
- **Image Uploading**: Upload images to Cloudinary.
- **API Documentation**: Swagger integration for API documentation and testing.
- **Security**: Enhanced security using Helmet and secure password hashing with bcrypt.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- MongoDB Atlas account or local MongoDB installation.

## Getting Started

To run this project locally, follow these steps:

### Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/your-username/project-foodies-backend.git
    ```

2. **Navigate into the project directory:**

    ```bash
    cd project-foodies-backend
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

   or

    ```bash
    yarn install
    ```

### Setting Up Environment Variables

Create a `.env` file in the root of the project with the following environment variables:

```plaintext
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
Replace your_mongodb_uri, your_jwt_secret, your_cloudinary_name, your_cloudinary_api_key, and your_cloudinary_api_secret with your actual values. Here's a guide to obtain them:

- MONGO_URI: This is the connection string for your MongoDB database. You can get this from MongoDB Atlas if you're 
using a cloud database or from your local MongoDB installation. Replace your_mongodb_uri with the actual URI, which should look something like mongodb+srv://<username>:<password>@<cluster-url>/<database-name>.


- JWT_SECRET: This is a secret key used to sign JSON Web Tokens (JWTs) for authentication. You can generate a random 
string for this purpose.


- CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: These are credentials from your Cloudinary account, 
used for uploading images. If you haven't already, sign up for a free Cloudinary account at Cloudinary. After signing up, you can find your cloud name, API key, and API secret on the Dashboard -> Account Details section.

### Start the Server

To start the server, run the following command:

```bash
npm run dev
```
or

```bash
yarn dev
```
The server will start at http://localhost:3000.

### Scripts
- start: Starts the production server.

- dev: Starts the development server with nodemon for automatic restarts.

  
### API Documentation
  API documentation is available using Swagger. To access the documentation, start the server and navigate to:

https://foodies-ua-1497a9d7b69f.herokuapp.com/api/

or on your local server:

```bash
http://localhost:3000/api
```
