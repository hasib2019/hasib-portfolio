import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  getMessages,
  getMessagesByUser,
  createMessage,
  markMessageRead,
  deleteMessage,
} from "@/lib/db";
import type { Message } from "@/lib/types";
import { randomUUID } from "crypto";

// GET – admin gets all, user gets their own
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const messages =
    session.user.role === "admin"
      ? getMessages()
      : getMessagesByUser(session.user.id);

  return NextResponse.json(messages);
}

// POST – logged-in user sends a message
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, body } = await req.json();
  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
  }

  const msg: Message = {
    id: randomUUID(),
    userId: session.user.id,
    userName: session.user.name,
    userEmail: session.user.email,
    subject: subject.trim(),
    body: body.trim(),
    status: "unread",
    createdAt: new Date().toISOString(),
  };

  createMessage(msg);
  return NextResponse.json(msg, { status: 201 });
}

// PATCH – admin marks message as read
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  const success = markMessageRead(id);
  return success
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

// DELETE – admin deletes a message
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  const success = deleteMessage(id);
  return success
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
