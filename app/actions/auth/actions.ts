"use server";
import { AuthResponse, LoginData, SignupData } from "@/lib/types/auth";
import {
  createSession,
  deleteSession,
  deleteSessionJwt,
  getSession,
} from "@/app/actions/auth/session";
import { cookies } from "next/headers";

export async function signup(data: SignupData): Promise<AuthResponse | null> {
  const response = await fetch(
    `${process.env.API_BASE_URL}/auth/local/signup`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    },
  );

  const res = await response.json();
  // console.log(res);
  if (response.status === 201) {
    await createSession({
      token: res.access_token,
      refreshToken: res.refresh_token,
      id: res.id,
    });
    return res;
  }
  return null;
}

export async function login(data: LoginData): Promise<AuthResponse | null> {
  const response = await fetch(
    `${process.env.API_BASE_URL}/auth/local/signin`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    },
  );
  if (response.ok) {
    const data = await response.json();
    console.log("auth actions login() data ===> ", data);
    await createSession({
      token: data.access_token,
      refreshToken: data.refresh_token,
      id: data.id,
    });
    return data;
  }
  return null;
}

export async function deleteAuthSession(): Promise<void> {
  await logoutFromApi();
  await deleteSession();
}

export async function refreshTokens() {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.rt}`,
    },
  });
  const data = await response.json();
  console.log("data in refreshTokens()==>", data);
  if (!response.ok) return null;
  await createSession({
    token: data.access_token,
    refreshToken: data.refresh_token,
    id: data.id,
  });
  return data;
}

export async function deleteJwt() {
  await deleteSessionJwt();
  return await getSession();
}

export async function logoutFromApi(): Promise<boolean> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  return response.ok;
}
