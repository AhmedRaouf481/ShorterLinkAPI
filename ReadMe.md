# Link Shortener API

This is a simple API project that allows you to shorten long URLs into shorter, more manageable links. It is built using Node.js, TypeScript, and MongoDB.

## Prerequisites

Before running the API, ensure that you have the following installed:

- Node.js: [https://nodejs.org](https://nodejs.org)
- MongoDB: [https://www.mongodb.com](https://www.mongodb.com)

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/AhmedRaouf481/ShorterLinkAPI
   ```

2. Install the dependencies:

   ```shell
   npm install
   ```

3. Copy .env.example file into .env file and fill it with your environment variables:
    ```shell
    cp .env.example .env
    ```
4. Build the TypeScript code:

   ```shell
   npm run build
   ```

5. Start the server:

   ```shell
   npm start
   ```

6. The API is now running locally at `http://localhost:8080`.

## API Endpoints

The following API endpoints are available:

- `POST /shortlinks`: Create a shortened link.
- `GET /shortlinks`: Get all shortened links.
- `GET /shortlinks/:slug`: Get a specific shortened link by ID.
- `PUT /shortlinks/:slug`: Update a specific shortened link by ID.

