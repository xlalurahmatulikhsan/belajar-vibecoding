import { Elysia, t } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const port = Number(process.env.PORT) || 3000;

export const app = new Elysia()
  .decorate("db", db)
  .get("/", () => ({
    message: "Hello World! Server ElysiaJS with Bun, Drizzle ORM, and MySQL is running.",
    status: "ok",
    timestamp: new Date().toISOString(),
  }))
  .get("/users", async ({ db }) => {
    try {
      const allUsers = await db.select().from(users);
      return {
        success: true,
        data: allUsers,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch users. Ensure MySQL connection is active.",
      };
    }
  })
  .post(
    "/users",
    async ({ db, body, set }) => {
      try {
        const [result] = await db.insert(users).values({
          name: body.name,
          email: body.email,
        });

        set.status = 201;
        return {
          success: true,
          message: "User created successfully",
          userId: result.insertId,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          message: error.message || "Failed to create user",
        };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )
  .listen(port);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
