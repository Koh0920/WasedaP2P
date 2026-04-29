# PostgreSQL Database Setup Guide

This document explains how to connect to PostgreSQL, create a database, and verify the setup.

---

## Prerequisites

* PostgreSQL installed on your system
* Access to the `postgres` user and password

---

## Step 1: Connect to PostgreSQL

Open your terminal and run:

```
psql -U postgres
```

You will see prompts like below. Press **Enter** to use default values:

```
Server [localhost]: (Press Enter)
Database [postgres]: (Press Enter)
Port [5432]: (Press Enter)
Username [postgres]: (Press Enter)
Password for user postgres: <your-password>
```

---

## Step 2: Create a New Database

After connecting successfully, create a database:

```
CREATE DATABASE wasedap2p;
```

---

## Step 3: Verify Database Creation

List all available databases:

```
\l
```

Check that `wasedap2p` appears in the list.

---

## Step 4: Connect to the Database

Switch to the newly created database:

```
\c wasedap2p
```

If successful, you should see a message like:

```
You are now connected to database "wasedap2p"
```

---

## Summary

* Connected to PostgreSQL using default settings
* Created a new database: `wasedap2p`
* Verified the database exists
* Connected to the database

---

## ⚠️ Notes

* Make sure PostgreSQL service is running
* Default port is `5432` unless changed
* Keep your database credentials secure

---

## 🧑‍💻 Useful Commands

* `\l` → List all databases
* `\c <db_name>` → Connect to a database
* `\dt` → List tables in current database
* `\q` → Quit psql

---

## 📌 Next Steps

You can now:

* Create tables
* Connect your backend (e.g., FastAPI, Prisma)
* Set up migrations

---

If you want, I can make a **version tailored to your FastAPI + Spotter + Docker setup**, which would look much stronger on GitHub.
