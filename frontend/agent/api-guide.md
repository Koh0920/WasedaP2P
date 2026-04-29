# WasedaP2P API Guide
## For the Backend Team (FastAPI)

---

### Quick Overview

Hey team, this document outlines all the API endpoints the frontend expects from the FastAPI backend. We've got the frontend pretty much ready to go.

**Base URL**: `http://localhost:8000` (configurable via `VITE_API_URL` env var on frontend)

**All endpoints should be prefixed with `/api/`** — e.g., `/api/notes`, `/api/auth/login`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Notes](#notes)
3. [Users](#users)
4. [Data Models](#data-models)
5. [Frontend Types (for reference)](#frontend-types-for-reference)
6. [Notes for the Backend Team](#notes-for-the-backend-team)

---

## Authentication

### POST /api/auth/login

Log in with email and password.

**Request:**
```json
{
  "email": "sato_taro@waseda.jp",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "u1",
    "username": "sato_taro",
    "email": "sato_taro@waseda.jp",
    "totalNotes": 5,
    "totalUpvotes": 127,
    "coursesContributed": 4,
    "timetables": [
      {
        "semester": "Spring",
        "year": 2026,
        "entries": [
          {
            "courseId": "c1",
            "courseName": "Data Structures",
            "professor": "Prof. Tanaka",
            "room": "55-N-201",
            "day": "Mon",
            "period": 1
          }
        ]
      }
    ]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401):**
```json
{
  "detail": "Invalid email or password"
}
```

---

### POST /api/auth/signup

Register a new user.

**Request:**
```json
{
  "username": "sato_taro",
  "email": "sato_taro@waseda.jp",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "u1",
    "username": "sato_taro",
    "email": "sato_taro@waseda.jp",
    "totalNotes": 0,
    "totalUpvotes": 0,
    "coursesContributed": 0,
    "timetables": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST /api/auth/reset-password

*(Not implemented on frontend yet, but might need in the future)*

**Request:**
```json
{
  "email": "sato_taro@waseda.jp"
}
```

**Response (200):**
```json
{
  "message": "Password reset email sent"
}
```

---

### POST /api/auth/verify-email

*(For email verification flow)*

**Request:**
```json
{
  "token": "..."
}
```

**Response (200):**
```json
{
  "message": "Email verified successfully"
}
```

---

## Notes

### GET /api/notes

Get all notes. Supports filtering via query params.

**Query Parameters (all optional):**

| Parameter | Type | Example |
|-----------|------|---------|
| `faculty` | string | `?faculty=School of Engineering` |
| `department` | string | `?department=Computer Science` |
| `course` | string | `?course=Data Structures` |
| `uploader` | string | `?uploader=sato_taro` |
| `semester` | string | `?semester=Spring` |
| `year` | number | `?year=2024` |
| `sort` | string | `?sort=recent` (or `upvoted`, `name`) |

**Response (200):**
```json
[
  {
    "id": "n1",
    "courseName": "Data Structures",
    "professorName": "Prof. Tanaka",
    "faculty": "School of Engineering",
    "department": "Computer Science",
    "year": 2024,
    "semester": "Spring",
    "uploader": {
      "username": "sato_taro",
      "id": "u1"
    },
    "uploadDate": "2024-01-15T00:00:00.000Z",
    "fileType": "PDF",
    "fileName": "data_structures_week1.pdf",
    "upvotes": 45,
    "downvotes": 2,
    "netScore": 43,
    "description": "Comprehensive notes on arrays, linked lists, and stacks"
  },
  ...
]
```

---

### GET /api/notes/{id}

Get a single note by ID.

**Response (200):**
```json
{
  "id": "n1",
  "courseName": "Data Structures",
  "professorName": "Prof. Tanaka",
  "faculty": "School of Engineering",
  "department": "Computer Science",
  "year": 2024,
  "semester": "Spring",
  "uploader": {
    "username": "sato_taro",
    "id": "u1"
  },
  "uploadDate": "2024-01-15T00:00:00.000Z",
  "fileType": "PDF",
  "fileName": "data_structures_week1.pdf",
  "upvotes": 45,
  "downvotes": 2,
  "netScore": 43,
  "description": "Comprehensive notes on arrays, linked lists, and stacks"
}
```

**Error (404):**
```json
{
  "detail": "Note not found"
}
```

---

### POST /api/notes

Upload a new note. Requires authentication.

**Request (multipart/form-data):**
```
courseName: Data Structures
professorName: Prof. Tanaka
faculty: School of Engineering
department: Computer Science
year: 2024
semester: Spring
fileType: PDF
description: Comprehensive notes on arrays, linked lists, and stacks
file: <binary data>
```

**Response (201):**
```json
{
  "id": "n123",
  "courseName": "Data Structures",
  "professorName": "Prof. Tanaka",
  "faculty": "School of Engineering",
  "department": "Computer Science",
  "year": 2024,
  "semester": "Spring",
  "uploader": {
    "username": "sato_taro",
    "id": "u1"
  },
  "uploadDate": "2026-03-10T10:30:00.000Z",
  "fileType": "PDF",
  "fileName": "data_structures_week1.pdf",
  "upvotes": 0,
  "downvotes": 0,
  "netScore": 0,
  "description": "Comprehensive notes on arrays, linked lists, and stacks"
}
```

---

### POST /api/notes/{id}/vote

Vote on a note (upvote or downvote). Requires authentication.

**Request:**
```json
{
  "type": "up"
}
```

`type` can be `"up"` or `"down"`

**Response (200):**
```json
{
  "upvotes": 46,
  "downvotes": 2,
  "netScore": 44
}
```

---

### POST /api/notes/{id}/report

Report a note for inappropriate content. Requires authentication.

**Request:**
```json
{
  "reason": "Contains copyrighted material"
}
```

**Response (200):**
```json
{
  "message": "Report submitted successfully"
}
```

---

### GET /api/notes/{id}/download

Download the actual note file. Requires authentication (or maybe not? up to you).

**Response (200):**
- Returns the file as binary (PDF, image, or document)
- Should set appropriate `Content-Disposition` header

---

## Users

### GET /api/users

Get all users (probably won't be used much, but good to have).

**Response (200):**
```json
[
  {
    "id": "u1",
    "username": "sato_taro",
    "email": "sato_taro@waseda.jp",
    "totalNotes": 5,
    "totalUpvotes": 127,
    "coursesContributed": 4,
    "timetables": [...]
  },
  ...
]
```

---

### GET /api/users/{username}

Get a user profile by username.

**Response (200):**
```json
{
  "id": "u1",
  "username": "sato_taro",
  "email": "sato_taro@waseda.jp",
  "totalNotes": 5,
  "totalUpvotes": 127,
  "coursesContributed": 4,
  "timetables": [
    {
      "semester": "Spring",
      "year": 2026,
      "entries": [
        {
          "courseId": "c1",
          "courseName": "Data Structures",
          "professor": "Prof. Tanaka",
          "room": "55-N-201",
          "day": "Mon",
          "period": 1
        }
      ]
    }
  ]
}
```

**Error (404):**
```json
{
  "detail": "User not found"
}
```

---

### GET /api/users/{username}/notes

Get all notes uploaded by a specific user.

**Response (200):**
```json
[
  {
    "id": "n1",
    "courseName": "Data Structures",
    ...
  },
  ...
]
```

---

### GET /api/faculties

Get all faculties, departments, and courses (for the filter dropdowns).

**Response (200):**
```json
[
  {
    "id": "f1",
    "name": "School of Engineering",
    "departments": [
      {
        "id": "d1",
        "name": "Computer Science",
        "courses": [
          { "id": "c1", "name": "Data Structures", "professor": "Prof. Tanaka" },
          { "id": "c2", "name": "Algorithms", "professor": "Prof. Suzuki" }
        ]
      }
    ]
  }
]
```

---

## Data Models

### Note

```typescript
interface Note {
  id: string;                    // Unique identifier (e.g., "n1", "n123")
  courseName: string;            // e.g., "Data Structures"
  professorName: string;        // e.g., "Prof. Tanaka"
  faculty: string;               // e.g., "School of Engineering"
  department: string;           // e.g., "Computer Science"
  year: number;                  // e.g., 2024
  semester: "Spring" | "Fall";   // Semester
  uploader: {
    username: string;
    id: string;
  };
  uploadDate: string;            // ISO 8601 format
  fileType: "PDF" | "Image" | "Document";
  fileName: string;              // Original filename
  upvotes: number;
  downvotes: number;
  netScore: number;             // upvotes - downvotes
  description?: string;         // Optional description
}
```

### User

```typescript
interface User {
  id: string;
  username: string;
  email?: string;                 // Optional - may be private
  totalNotes: number;
  totalUpvotes: number;
  coursesContributed: number;
  timetables?: Timetable[];
}

interface Timetable {
  semester: string;
  year: number;
  entries: TimetableEntry[];
}

interface TimetableEntry {
  courseId: string;
  courseName: string;
  professor: string;
  room: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  period: 1 | 2 | 3 | 4 | 5 | 6;
}
```

### Faculty (for filters)

```typescript
interface Faculty {
  id: string;
  name: string;
  departments: Department[];
}

interface Department {
  id: string;
  name: string;
  courses: Course[];
}

interface Course {
  id: string;
  name: string;
  professor: string;
}
```

---

## Frontend Types (For Reference)

If you're using Pydantic on the backend, here are the equivalent models you'll want:

```python
from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime

class TimetableEntry(BaseModel):
    course_id: str
    course_name: str
    professor: str
    room: str
    day: Literal["Mon", "Tue", "Wed", "Thu", "Fri"]
    period: Literal[1, 2, 3, 4, 5, 6]

class Timetable(BaseModel):
    semester: str
    year: int
    entries: list[TimetableEntry]

class Uploader(BaseModel):
    username: str
    id: str

class Note(BaseModel):
    id: str
    course_name: str
    professor_name: str
    faculty: str
    department: str
    year: int
    semester: Literal["Spring", "Fall"]
    uploader: Uploader
    upload_date: datetime
    file_type: Literal["PDF", "Image", "Document"]
    file_name: str
    upvotes: int
    downvotes: int
    net_score: int
    description: Optional[str] = None

class User(BaseModel):
    id: str
    username: str
    email: Optional[str] = None
    total_notes: int
    total_upvotes: int
    courses_contributed: int
    timetables: list[Timetable] = []

class Course(BaseModel):
    id: str
    name: str
    professor: str

class Department(BaseModel):
    id: str
    name: str
    courses: list[Course]

class Faculty(BaseModel):
    id: str
    name: str
    departments: list[Department]

# Request/Response models
class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    username: str
    email: str
    password: str

class VoteRequest(BaseModel):
    type: Literal["up", "down"]

class ReportRequest(BaseModel):
    reason: str

class NoteUploadRequest(BaseModel):
    course_name: str
    professor_name: str
    faculty: str
    department: str
    year: int
    semester: Literal["Spring", "Fall"]
    file_type: Literal["PDF", "Image", "Document"]
    file_name: str
    description: Optional[str] = None
```

---

## Notes for the Backend Team

### Authentication

- We're currently using mock authentication on the frontend
- **Recommendation**: Use JWT tokens for auth
- Send the token in the `Authorization: Bearer <token>` header
- Frontend will handle storing the token in localStorage

### File Upload

- For the note upload, you'll need to handle multipart/form-data
- Store files somewhere (S3? local disk?) and return a file URL/path
- The `GET /api/notes/{id}/download` endpoint should serve the file

### User Stats

- When a user uploads a note, increment their `totalNotes` and `coursesContributed`
- When someone upvotes a note, increment the uploader's `totalUpvotes`
- You might want to cache or compute these values efficiently

### CORS

- Make sure to enable CORS for the frontend origin (`http://localhost:5173` for dev)
- Add proper CORS headers for cross-origin requests

### Error Handling

- Use standard HTTP status codes:
  - `200` for successful GET/PUT
  - `201` for successful POST (creation)
  - `400` for bad request
  - `401` for unauthorized
  - `404` for not found
  - `500` for server errors
- Return errors in the format `{"detail": "Error message"}` (FastAPI's default is fine)

### Pagination (Optional but Recommended)

For `GET /api/notes`, consider adding pagination:
- `?page=1&limit=20`

Response:
```json
{
  "items": [...],
  "total": 150,
  "page": 1,
  "limit": 20
}
```

