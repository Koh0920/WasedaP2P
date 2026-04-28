/**
 * API Service Layer
 *
 * Hey backend team
 * Right now, all these functions are hitting mock data.
 * When you're ready with the FastAPI backend, each function below needs to make
 * a real fetch call to your endpoints.
 * 
 * - All endpoints should live under /api/... for now
 *
 */

import type { Note, User } from "@/types";
import {
  mockNotes,
  mockUsers,
  getNoteById,
  getNotesByUploader,
  getUserByUsername,
} from "@/data/mockData";

const _BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
void _BASE_URL;

// ============================================================================
// NOTES
// ============================================================================

/**
 * Get all notes from the platform
 * Used on: BrowsePage, ForumPage
 * Backend: GET /api/notes
 * Returns: Array of all notes with basic info (no file content, just metadata)
 */
export async function getNotes(): Promise<Note[]> {
  return Promise.resolve([...mockNotes]);
}

/**
 * Get a single note by its ID
 * Used on: NoteDetailPage
 * Backend: GET /api/notes/{id}
 * Returns: Single note object or null if not found
 */
export async function getNoteByIdApi(id: string): Promise<Note | null> {
  return Promise.resolve(getNoteById(id) ?? null);
}

/**
 * Get all notes uploaded by a specific user
 * Used on: ProfilePage (to show user's contributions)
 * Backend: GET /api/notes?uploader={username} or GET /api/users/{username}/notes
 * Returns: Array of notes uploaded by that user
 */
export async function getNotesByUploaderApi(username: string): Promise<Note[]> {
  return Promise.resolve(getNotesByUploader(username));
}

/**
 * Upload a new note to the platform
 * Used on: UploadPage
 * Backend: POST /api/notes
 * Payload: {
 *   courseName: string,
 *   professorName: string,
 *   faculty: string,
 *   department: string,
 *   year: number,
 *   semester: "Spring" | "Fall",
 *   fileType: "PDF" | "Image" | "Document",
 *   fileName: string,
 *   description?: string
 * }
 * Returns: The newly created note with generated id, scores, and uploadDate
 */
export async function uploadNote(data: Omit<Note, "id" | "upvotes" | "downvotes" | "netScore" | "uploadDate">): Promise<Note> {
  const newNote: Note = {
    ...data,
    id: `n${Date.now()}`,
    upvotes: 0,
    downvotes: 0,
    netScore: 0,
    uploadDate: new Date(),
  };
  mockNotes.unshift(newNote);
  return Promise.resolve(newNote);
}

/**
 * Vote on a note (upvote or downvote)
 * Used on: NoteCard, NoteListItem, NoteDetailPage
 * Backend: POST /api/notes/{id}/vote
 * Payload: { type: "up" | "down" }
 * Returns: void (just update the count on frontend)
 */
export async function voteNote(id: string, type: "up" | "down"): Promise<void> {
  const note = mockNotes.find((n) => n.id === id);
  if (!note) return;
  if (type === "up") {
    note.upvotes += 1;
  } else {
    note.downvotes += 1;
  }
  note.netScore = note.upvotes - note.downvotes;
  return Promise.resolve();
}

/**
 * Report a note for inappropriate content
 * Used on: ReportButton component
 * Backend: POST /api/notes/{id}/report
 * Payload: { reason: string }
 * Returns: void (backend will handle review process)
 *
 * Note: We don't really do anything with the response yet,
 * but you guys should probably store this for admin review
 */
export async function reportNote(
  _id: string,
  _reason: string
): Promise<void> {
  // Backend will log and review this
  return Promise.resolve();
}


// USERS


/**
 * Get all users (probably won't need this often, but hey)
 * Backend: GET /api/users
 * Returns: Array of all user profiles
 */
export async function getUsers(): Promise<User[]> {
  return Promise.resolve([...mockUsers]);
}

/**
 * Get a single user by username
 * Used on: ProfilePage, anywhere we display user info
 * Backend: GET /api/users/{username}
 * Returns: User object or null if not found
 */
export async function getUserApi(username: string): Promise<User | null> {
  return Promise.resolve(getUserByUsername(username) ?? null);
}


// AUTH

/**
 * Login with email and password
 * Used on: LoginPage
 * Backend: POST /api/auth/login
 * Payload: { email: string, password: string }
 * Returns: User object (including JWT token somehow?)
 *
 * Important: We need some way to persist the session. JWT in response?
 * Let us know what you guys prefer!
 */
export async function loginApi(
  _email: string,
  _password: string
): Promise<User> {
  // Mock: returns first user. Replace with real JWT endpoint.
  await new Promise((r) => setTimeout(r, 500));
  return mockUsers[0];
}

/**
 * Register a new user
 * Used on: SignupPage
 * Backend: POST /api/auth/signup
 * Payload: { username: string, email: string, password: string }
 * Returns: void (or maybe the new user object?)
 *
 * Quick note: We probably want to return the user + token on signup too
 */
export async function signupApi(data: {
  username: string;
  email: string;
  password: string;
}): Promise<void> {
  // Mock: just simulate a delay. Replace with real endpoint.
  void data;
  await new Promise((r) => setTimeout(r, 500));
}


// FUTURE STUFF (Not implemented yet)
/*
 * Things we might need later:
 * - Password reset: POST /api/auth/reset-password
 * - Email verification: POST /api/auth/verify-email
 * - Timetable management: GET/POST /api/users/{username}/timetable
 * - File download: GET /api/notes/{id}/download
 * - Search: GET /api/notes/search?q=...
 */
