"use server";

import { cookies } from "next/headers";
import { Session, SessionCookie } from "@/lib/types/auth";

const jwtExpireAt = new Date(Date.now() + 30 * 1000);
const rtExpireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export async function createSession(payload: SessionCookie) {
  cookies().set("jwt-token", payload.token, {
    httpOnly: true,
    secure: true,
    expires: jwtExpireAt,
    sameSite: "lax",
    path: "/",
  });

  cookies().set("rt-token", payload.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: rtExpireAt,
    sameSite: "lax",
    path: "/",
  });

  cookies().set("user-id", payload.id.toString(), {
    httpOnly: true,
    secure: true,
    expires: rtExpireAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSessionJwt() {
  cookies().delete("jwt-token");
}

export async function deleteSession() {
  cookies().delete("jwt-token");
  cookies().delete("rt-token");
  cookies().delete("user-id");
}

export async function getSession(): Promise<Session> {
  const jwt = cookies().get("jwt-token")?.value;
  const rt = cookies().get("rt-token")?.value;
  return { jwt, rt };
}

export async function getSessionUserId(): Promise<{ id?: string }> {
  const id = cookies().get("user-id")?.value;
  return { id };
}
