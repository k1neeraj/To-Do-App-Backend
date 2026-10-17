# To-Do App Backend

REST API for the To-Do application, built with Node.js, Express 5, MongoDB, and Mongoose.

## Requirements

- Node.js 24 LTS recommended (Node.js 22+ supported by this project)
- npm
- MongoDB database, such as MongoDB Atlas

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set `MONGO_URI` to your MongoDB connection string.

3. Start development mode:

   ```bash
   npm run dev
   ```

   For production/local deployment:

   ```bash
   npm start
   ```

The API listens on port `5500` by default. Set `PORT` to override it.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string |
| `CORS_ORIGIN` | No | Comma-separated frontend origins; defaults to `*` |
| `PORT` | No | Local HTTP port; defaults to `5500` |

For a production frontend, set `CORS_ORIGIN` to its exact origin(s), for example `https://your-frontend.example`. Do not commit real credentials or your `.env` file.

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | List to-do items |
| POST | `/save` | Create an item with `{"text":"Buy milk"}` |
| POST | `/update` | Update an item with `{"_id":"...","text":"Updated text"}` |
| POST | `/delete` | Delete an item with `{"_id":"..."}` |
| GET | `/health` | Process/database readiness check |

Invalid input returns a 400 response; missing items return 404. The health endpoint returns 200 when MongoDB is connected and 503 otherwise.

## Deployment

### Vercel

1. Import this GitHub repository into Vercel.
2. Add `MONGO_URI` and, optionally, `CORS_ORIGIN` under **Project Settings → Environment Variables**.
3. Deploy the `main` branch.
4. Check `/health` after deployment.

Do not add secrets to `vercel.json` or commit them to GitHub.

### Other Node.js hosts

Use `npm install` during build and `npm start` to launch the service. Configure `MONGO_URI` and `CORS_ORIGIN` in the host's environment settings.

## Checks

Run the automated checks with:

```bash
npm test
```
