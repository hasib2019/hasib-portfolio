import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUsers, createUser, deleteUser, getUserByEmail } from "@/lib/db";
import type { User } from "@/lib/types";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// GET all users – admin only
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = getUsers().map(({ password: _, ...u }) => u);
  return NextResponse.json(users);
}

// POST – public registration
export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (email.toLowerCase() === adminEmail?.toLowerCase()) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  if (getUserByEmail(email)) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user: User = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hashed,
    role: "user",
    createdAt: new Date().toISOString(),
  };

  createUser(user);
  const { password: _, ...safe } = user;
  return NextResponse.json(safe, { status: 201 });
}

// DELETE – admin deletes a user
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  const success = deleteUser(id);
  return success
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
