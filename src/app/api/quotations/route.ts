import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  getQuotations,
  getQuotationsByUser,
  createQuotation,
  updateQuotationStatus,
  deleteQuotation,
} from "@/lib/db";
import type { Quotation } from "@/lib/types";
import { randomUUID } from "crypto";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const quotations =
    session.user.role === "admin"
      ? getQuotations()
      : getQuotationsByUser(session.user.id);

  return NextResponse.json(quotations);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectName, description, budget, deadline, techStack } = await req.json();
  if (!projectName?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "Project name and description are required" }, { status: 400 });
  }

  const q: Quotation = {
    id: randomUUID(),
    userId: session.user.id,
    userName: session.user.name,
    userEmail: session.user.email,
    projectName: projectName.trim(),
    description: description.trim(),
    budget: budget?.trim() ?? "",
    deadline: deadline?.trim() ?? "",
    techStack: techStack?.trim() ?? "",
    status: "pending",
    adminNote: "",
    createdAt: new Date().toISOString(),
  };

  createQuotation(q);
  return NextResponse.json(q, { status: 201 });
}

// PATCH – admin updates status
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status, adminNote } = await req.json();
  const success = updateQuotationStatus(id, status, adminNote ?? "");
  return success
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  const success = deleteQuotation(id);
  return success
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
