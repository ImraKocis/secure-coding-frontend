import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const jwtExpireAt = new Date(Date.now() + 2 * 60 * 1000);
const rtExpireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export async function POST(req: NextRequest) {
  const { access_token, refresh_token } = await req.json();
  console.log("tokens in api/route ===> ", access_token, refresh_token);
  try {
    cookies().set("jwt-token", access_token, {
      httpOnly: true,
      secure: true,
      expires: jwtExpireAt,
      sameSite: "lax",
      path: "/",
    });

    cookies().set("rt-token", refresh_token, {
      httpOnly: true,
      secure: true,
      expires: rtExpireAt,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
