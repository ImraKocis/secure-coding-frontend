"use server";

import { User } from "@/lib/types/user";
import { getSession, getSessionUserId } from "@/app/actions/auth/session";
import { refreshTokens } from "@/app/actions/auth/actions";

export async function getUser(): Promise<User | null> {
  let tokens = await getSession();
  if (!tokens.jwt) return null;
  const response = await fetch(`${process.env.API_BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens.jwt}`,
    },
    next: {
      revalidate: 1,
    },
  });
  const data = await response.json();
  console.log("user actions getUser() data ==> ", data);
  if (response.ok) return data;
  return null;
}

export async function getUserById(id: number): Promise<User | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function assignTank(tankId: number): Promise<boolean> {
  const tokens = await getSession();
  const { id } = await getSessionUserId();
  const response = await fetch(
    `${process.env.API_BASE_URL}/user/assign-tank?userId=${id}&tankId=${tankId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.jwt}`,
      },
    },
  );

  return response.ok;
}

export async function getAllUsersAndTanks(): Promise<User[]> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/user`);

  if (!response.ok) return [];
  return await response.json();
}
