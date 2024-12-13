# AWS API Project

This project is an Express.js application for managing `Alumno` and `Profesor` entities. It uses Prisma for database interactions, AWS SDK for S3, SNS, and DynamoDB integrations, and Express Validator for request validation.

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/16) file in the root directory and add your environment variables:
    ```env
    DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>"
    AWS_ACCESS_KEY_ID="<your-access-key-id>"
    AWS_SECRET_ACCESS_KEY="<your-secret-access-key>"
    AWS_SESSION_TOKEN="<your-session-token>"
    AWS_REGION="<your-region>"
    SNS_TOPIC_ARN="<your-sns-topic-arn>"
    S3_BUCKET_NAME="<your-s3-bucket-name>"
    ```

4. Run database migrations:
    ```sh
    npx prisma migrate deploy
    ```

5. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### Alumnos

- `GET /alumnos`: Get all alumnos.
- `GET /alumnos/:id`: Get a single alumno by ID.
- `POST /alumnos`: Create a new alumno.
- `PUT /alumnos/:id`: Update an existing alumno by ID.
- `DELETE /alumnos/:id`: Delete an alumno by ID.
- `POST /alumnos/:id/fotoPerfil`: Upload a profile photo for an alumno.
- `POST /alumnos/:id/session/login`: Login session for an alumno.
- `POST /alumnos/:id/session/logout`: Logout session for an alumno.
- `POST /alumnos/:id/session/verify`: Verify session for an alumno.
- `POST /alumnos/:id/email`: Send an email notification for an alumno.

### Profesores

- `GET /profesores`: Get all profesores.
- `GET /profesores/:id`: Get a single profesor by ID.
- `POST /profesores`: Create a new profesor.
- `PUT /profesores/:id`: Update an existing profesor by ID.
- `DELETE /profesores/:id`: Delete a profesor by ID.
