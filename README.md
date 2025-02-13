# Overview

This is a simple express server whaere a user can register, login, and search by username or fullname.

## To Run the Project Locally

1. Clone the Repository:
     ```bash
          git clone https://github.com/VishalChaudhary01/backend-task
          cd ShopNow
     ```

2. Install Dependencies:
     ```bash
          npm install
     ```

3. Set Up Environment Variables:

     - Copy .env.example to .env:
          ```bash
               cp .env.example .env
          ```

     - Update the .env file:
          ```bash
          PORT=3000
          MONGODB_URI=your mongo db uri
          NODE_ENV=development
          COOKIE_SECRET=your-secret-key
          JWT_SECRET=your-secret-key
          COOKIE_NAME=backend-task
          ```

4. Run the server:
     ```bash
          npm run dev
     ```

## API endpoints

## Register user:

To register a new user
**URL**: `localhost:3000/api/users/register`
**Method**: `POST`

### Request body

**All fields are Required:** `fullName`, `username`, `password`, `gender`, `dateOfBirth`, `country`

**Data**:

```bash
{
    "username": "john@example.com",
    "password": "John@123",
    "fullName": "John xyz",
    "gender": "male",
    "dateOfBirth": "01/02/2002",
    "country": "India"
}
```

### Success response

**Code**: `201 Created`

**Content**:

```bash
{
    "success": true,
    "message": "User registered successfully",
    "user": {
        "fullName": "John xyz",
        "username": "john@example.com",
        "gender": "male",
        "dateOfBirth": "01/02/2002",
        "country": "India"
     }
}
```

## Login user

### Request body

**Required fields:** `username`, `password`

**Data**:

```bash
{
    "username": "john@example.com",
    "password": "John@123"
}
```

### Success response

**Code**: `200 Ok`

**Content**:

```bash
{
    "success": true,
    "message": "User logged in successfully",
    "user": {
        "fullName": "John xyz",
        "username": "john@example.com",
        "gender": "male",
        "dateOfBirth": "01/02/2002",
        "country": "India"
    }
}
```

## Search users:

To search user by their username or fullname, Authentication required
**URL**: `localhost:3000/api/users/search?username=john`
**Method**: `POST`

### Success response

**Code**: `200 Ok`

**Content**:

```bash
{
    "success": true,
    "message": "Users found",
    "users": [
        {
          "fullName": "John xyz",
          "username": "john@example.com",
          "gender": "male",
          "dateOfBirth": "01/02/2002",
          "country": "India"
        }
    ]
}
```
