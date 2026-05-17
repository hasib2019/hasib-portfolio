import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getPortfolio, savePortfolio } from "@/lib/db";
import type { PortfolioData } from "@/lib/types";

export async function GET() {
  try {
    const data = getPortfolio();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to load portfolio" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: PortfolioData = await req.json();
    savePortfolio(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save portfolio" }, { status: 500 });
  }
}
