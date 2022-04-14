# Dicoding Story

> API untuk berbagi story seputar Dicoding, mirip seperti post Instagram namun special untuk Dicoding.

## Endpoint 
https://story-api.dicoding.dev/v1

### Register
- URL
  - `/register`
- Method
  - POST
- Request Body
  - `name` as `string`
  - `email` as `string`, must be unique
  - `password` as `string`, must be at least 6 characters
- Response
    ```json
    {
      "error": false,
      "message": "User Created"
    }
    ```

### Login
- URL
  - `/login`
- Method
  - POST
- Request Body
  - `email` as `string`
  - `password` as `string`
- Response
    ```json
    {
        "error": false,
        "message": "success",
        "loginResult": {
            "userId": "user-yj5pc_LARC_AgK61",
            "name": "Arif Faizin",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
        }
    }
    ```

### Add New Story
- URL
  - `/stories`
- Method
  - POST
- Headers
  - `Content-Type`: `multipart/form-data`
  - `Authorization`: `Bearer <token>`
- Request Body
  - `description` as `string`
  - `photo` as `file`, must be a valid image file, max size 1MB
  - `lat` as `float`, optional
  - `lon` as `float`, optional
- Response
    ```json
    {
        "error": false,
        "message": "success" 
    }
    ```

### Add New Story with Guest Account (without Authentication)
- URL
  - `/stories/guest`
- Method
  - POST
- Request Body
    - `description` as `string`
    - `photo` as `file`, must be a valid image file, max size 1MB
    - `lat` as `float`, optional
    - `lon` as `float`, optional
- Response
    ```json
    {
        "error": false,
        "message": "success"
    }
    ```

### Get All Stories
- URL
  - `/stories`
- Parameters
  - `page` as `int`, optional
  - `size` as `int`, optional
  - `location` as `1 | 0`, optional, default `0`
- Method
  - GET
- Headers
  - `Authorization`: `Bearer <token>`
- Response
    ```json
    {
        "error": false,
        "message": "Stories fetched successfully",
        "listStory": [
            {
                "id": "story-FvU4u0Vp2S3PMsFg",
                "name": "Dimas",
                "description": "Lorem Ipsum",
                "photoUrl": "https://story-api.dicoding.dev/images/stories/photos-1641623658595_dummy-pic.png",
                "createdAt": "2022-01-08T06:34:18.598Z",
                "lat": -10.212,
                "lon": -16.002
            }
        ]
    }
    
    ```
