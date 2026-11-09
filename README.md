# Nursery Management API

A REST API for managing nursery child records, built with Node.js, Express, Sequelize, and PostgreSQL.

## Features

- Create, view, update, and remove child enrollment records.
- Store guardian and emergency contact details, allergies, room assignment, and enrollment status.
- Paginate the child directory with `page` and `limit` query parameters.
- Validate request bodies and UUID route parameters.

## API

Base URL: `http://localhost:8081`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/children` | List child records (`?page=1&limit=10`) |
| `GET` | `/api/children/:childId` | Get one child record |
| `POST` | `/api/children` | Enroll a child / create a record |
| `PATCH` | `/api/children/:childId` | Update one or more child fields |
| `DELETE` | `/api/children/:childId` | Remove a child record |
| `GET` | `/api/healthchecker` | Check that the API is running |

### Create a child record

Required fields: `firstName`, `lastName`, `dateOfBirth` (`YYYY-MM-DD`), `guardianName`, and `guardianPhone`.

Optional fields: `emergencyContact`, `allergies`, `room`, and `enrollmentStatus`. Enrollment status is `enrolled`, `waitlisted`, or `withdrawn` and defaults to `enrolled`.

```json
{
  "firstName": "Ava",
  "lastName": "Morgan",
  "dateOfBirth": "2022-04-18",
  "guardianName": "Jamie Morgan",
  "guardianPhone": "+1 555 010 1234",
  "emergencyContact": "Taylor Morgan, +1 555 010 9876",
  "allergies": "Peanuts",
  "room": "Sunflower Room",
  "enrollmentStatus": "enrolled"
}
```

## Run locally

1. Copy `.env.sample` to `.env` and set the PostgreSQL connection details (`DATABASE_URL`).
2. Run `yarn install`.
3. Start PostgreSQL with `make dev` or use an existing database.
4. Run `yarn start`; the API listens on port `8081`.

The database tables are synchronized by Sequelize when the server starts. Existing data is not migrated into child records.
