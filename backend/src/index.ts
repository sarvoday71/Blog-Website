import { Hono } from 'hono'
import userRoute from './routes/user'
import blogRoute from './routes/blog'
import { cors } from 'hono/cors';


const app = new Hono();

app.use(cors());

app.route('/api/v1/user', userRoute);
app.route('/api/v1/blog', blogRoute);




export default app


// postgresql://neondb_owner:npg_kj0DRXsua8ec@ep-frosty-feather-a52mwou1-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjhlMDljM2YtMWY0Yi00NWU4LThiZjQtYzM4MTU2ODcxMjU3IiwidGVuYW50X2lkIjoiNmRlNmMzYjUwNDY2YjBmYmFhMzBmYTcxMmMxODcyN2M5ODVjMzdmNjBjZWQ0MmU4M2E3NzM0NmVjNjA3MzUwMyIsImludGVybmFsX3NlY3JldCI6ImY2MzE4NzRhLTNiNmItNDUzNS1hZDI0LWY1OGYxYmI5YjE4NyJ9.X2l2gjMSdiQsdhzcNHAaHx7_d7xas-ehE_J6TkYj1cY"
// DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"