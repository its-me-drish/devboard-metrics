# DevBoard Metrics

Team analytics dashboard aggregating deploys, incidents and pull request throughput.

## Stack
- Node.js + Express REST API
- MongoDB + Mongoose
- React 18 + Vite client
- JWT auth, Zod validation, Jest + Supertest

## Getting started

```bash
npm install
cp .env.example .env
npm run seed
npm run dev        # API on :4000
npm run dev:client # client on :5173
```

## API

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/auth/signup | Create an account |
| POST | /api/auth/login | Exchange credentials for a JWT |
| GET | /api/events | List events (paginated, searchable) |
| POST | /api/events | Create a event |
| PATCH | /api/events/:id | Update a event |
| DELETE | /api/events/:id | Delete a event |
| GET | /api/metrics/summary | Aggregated DORA-style metrics |

## Testing

```bash
npm test
```

## License

MIT
