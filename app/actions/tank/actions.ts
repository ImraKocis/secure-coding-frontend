"use server";

import { Tank, TankType } from "@/lib/types/user";
import { getSession } from "@/app/actions/auth/session";

interface TankCreateData {
  name: string;
  nation: string;
  hitpoints: number;
  numofcrew: number;
  type: TankType;
}

export async function getTanks(): Promise<Tank[] | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/tanks`, {
    next: { revalidate: 2 },
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function getByName(name: string): Promise<Tank[] | null> {
  const response = await fetch(
    `${process.env.API_BASE_URL}/tank/by-name?name=${name}`,
  );

  if (!response.ok) return null;
  return await response.json();
}

export async function addTank(data: TankCreateData): Promise<Tank | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/tank`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function updateTank(data: Tank): Promise<Tank | null> {
  const session = await getSession();
  const updateData: TankCreateData = {
    name: data.name,
    nation: data.nation,
    hitpoints: data.hitpoints,
    numofcrew: data.numofcrew,
    type: data.type,
  };
  const response = await fetch(
    `${process.env.API_BASE_URL}/tank/${data.id.toString()}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      body: JSON.stringify(updateData),
    },
  );

  if (!response.ok) return null;
  return await response.json();
}

export async function deleteTank(id: number): Promise<boolean> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/tank/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  return response.ok;
}
