/**
 * API Service Layer
 *
 * All functions currently return mock data.
 * When the FastAPI backend is ready, replace each function body with:
 *   return fetch(`${BASE_URL}/endpoint`, { ... }).then(r => r.json())
 *
 * Set VITE_API_URL in .env:
 *   VITE_API_URL=http://localhost:8000
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

// --- Notes ---

export async function getNotes(): Promise<Note[]> {
  return Promise.resolve([...mockNotes]);
}

export async function getNoteByIdApi(id: string): Promise<Note | null> {
  return Promise.resolve(getNoteById(id) ?? null);
}

export async function getNotesByUploaderApi(username: string): Promise<Note[]> {
  return Promise.resolve(getNotesByUploader(username));
}

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

export async function reportNote(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _id: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _reason: string
): Promise<void> {
  // Backend will log and review this
  return Promise.resolve();
}

// --- Users ---

export async function getUsers(): Promise<User[]> {
  return Promise.resolve([...mockUsers]);
}

export async function getUserApi(username: string): Promise<User | null> {
  return Promise.resolve(getUserByUsername(username) ?? null);
}

// --- Auth ---

export async function loginApi(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _email: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _password: string
): Promise<User> {
  // Mock: returns first user. Replace with real JWT endpoint.
  await new Promise((r) => setTimeout(r, 500));
  return mockUsers[0];
}

export async function signupApi(data: {
  username: string;
  email: string;
  password: string;
}): Promise<void> {
  // Mock: just simulate a delay. Replace with real endpoint.
  void data;
  await new Promise((r) => setTimeout(r, 500));
}
