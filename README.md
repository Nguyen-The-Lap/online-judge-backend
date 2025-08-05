# Backend Responsibilities (Express + MongoDB)

## Stack
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for Auth
- Bcrypt for password hashing
- Docker (for code sandboxing)

## Models

### User
- `username`, `email`, `password`, `roles`
- `refreshToken`: array of active tokens
- `solved`: array of solved problem metadata

### Problem
- `title`, `difficulty`, `tags`, `description`
- `inputFormat`, `outputFormat`, `constraints`
- `sampleInput`, `sampleOutput`, `explanation`
- `hiddenTestcases`: array of `{input, output}`

### Submission
- `username`, `title`, `lang`, `code`, `timestamp`
- `status`:
  - `success` (boolean)
  - `pass` (number of test cases passed)
  - `error` (stderr or verdict)

## Routes and Controllers

### Auth Routes
- `POST /register` → create user
- `POST /auth` → login, return access/refresh tokens
- `GET /refresh` → refresh access token
- `GET /logout` → logout, remove refresh token

### Problem Routes
- `GET /problemset/` → fetch all problems
- `GET /problemset/:title` → fetch problem by title
- `POST /problemset/` (admin) → create new problem
- `PUT /problemset/:title` (admin) → update problem
- `DELETE /problemset/:title` (admin) → delete problem

### Code Execution
- `POST /run/` → run user code on custom input
- `POST /submit/:title` → run on hidden test cases, save verdict

### Submissions
- `GET /submissions/` → fetch latest submissions by user

### Leaderboard
- `GET /leaderboard/` → fetch ranked users by score

## Code Execution (Dockerized)
- Code is executed inside Docker containers:
  - Languages supported: C++, Java, Python
  - Time/memory limits enforced
  - Execution handled via `child_process` or a job queue (e.g., BullMQ)
- Output is compared to expected output for test case validation

## Security
- Role-based access middleware for admin routes
- Passwords hashed with Bcrypt
- Refresh token rotation and storage
- Limit Docker container capabilities (non-root user, memory, CPU, time)
