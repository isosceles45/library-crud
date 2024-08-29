# Library Management System with SabPaisa Integration

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing a library's book inventory with integrated payment functionality using SabPaisa for monthly subscriptions.

## Features
- CRUD operations for book management
- RESTful API backend
- React frontend with state management
- SabPaisa integration for monthly subscriptions
- Responsive design

## Screenshots

### Payment Page
![Home Page](https://media.discordapp.net/attachments/1278690623121133581/1278692017878077450/image.png?ex=66d1ba3e&is=66d068be&hm=6c570865d7dbb5768d3757b490a572591710952138b041d2a6b2bcab5b1a2207&=&format=webp&quality=lossless&width=1440&height=640)

### Book Management
![Book Management](https://media.discordapp.net/attachments/1278690623121133581/1278691816052625531/image.png?ex=66d1ba0d&is=66d0688d&hm=4db7e7f981fc7283f45739de51f02961b08372a295d9b487dec63446c87b5518&=&format=webp&quality=lossless&width=1440&height=648)

### Subscription Page
![Subscription Page](https://cdn.discordapp.com/attachments/1278690623121133581/1278690654087806976/image.png?ex=66d1b8f8&is=66d06778&hm=b5f3af2eb48b850987856d955b4e5902bb6d9a50e2c81ce5b9a2b6b127aecfa1&)

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux with Redux Thunk
- **Payment Gateway**: SabPaisa

## API Endpoints

- GET `/api/books` - Get all books
- POST `/api/books` - Add a new book
- PUT `/api/books/:id` - Update a book
- DELETE `/api/books/:id` - Delete a book

## Subscription Flow

1. User clicks on "Proceed to Payment" button
2. Application initiates payment request with SabPaisa
3. User is redirected to SabPaisa payment gateway
4. After payment, user is redirected back to the dashboard
5. Application verifies payment status with SabPaisa
6. If payment is successful, application enables full functionality
