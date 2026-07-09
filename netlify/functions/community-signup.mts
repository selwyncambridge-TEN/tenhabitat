import { getDatabase } from "@netlify/database";
import type { Config } from "@netlify/functions";

import { communitySignupSchema } from "../../lib/validation/community-signup";

function jsonResponse(body: unknown, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });
}

async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

const handler = async (request: Request) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  const payload = await readJson(request);
  const parsed = communitySignupSchema.safeParse(payload);

  if (!parsed.success) {
    return jsonResponse(
      {
        error: "Invalid signup payload",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const db = getDatabase();
    const [signup] = await db.sql`
      INSERT INTO community_signups (
        role,
        name,
        email,
        organization,
        country,
        interest_area,
        message,
        source_page
      )
      VALUES (
        ${data.role},
        ${data.name},
        ${data.email},
        ${data.organization ?? null},
        ${data.country ?? null},
        ${data.interestArea ?? null},
        ${data.message ?? null},
        ${data.sourcePage ?? null}
      )
      RETURNING id, follow_up_status, created_at
    `;

    return jsonResponse({ signup }, { status: 201 });
  } catch {
    return jsonResponse({ error: "Unable to save signup" }, { status: 500 });
  }
};

export default handler;

export const config: Config = {
  path: "/api/community-signup",
};
