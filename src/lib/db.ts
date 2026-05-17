import fs from "fs";
import path from "path";
import type { PortfolioData, User, Message, Quotation } from "./types";

const dataDir = path.join(process.cwd(), "data");

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filename}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ─── Portfolio ───────────────────────────────────────────────────────────────

export function getPortfolio(): PortfolioData {
  return readJSON<PortfolioData>("portfolio.json");
}

export function savePortfolio(data: PortfolioData): void {
  writeJSON("portfolio.json", data);
}

// ─── Users ───────────────────────────────────────────────────────────────────

export function getUsers(): User[] {
  return readJSON<{ users: User[] }>("users.json").users;
}

export function saveUsers(users: User[]): void {
  writeJSON("users.json", { users });
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function createUser(user: User): void {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

export function updateUser(id: string, updates: Partial<User>): boolean {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
  return true;
}

export function deleteUser(id: string): boolean {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length) return false;
  saveUsers(filtered);
  return true;
}

// ─── Messages ────────────────────────────────────────────────────────────────

export function getMessages(): Message[] {
  return readJSON<{ messages: Message[] }>("messages.json").messages;
}

export function saveMessages(messages: Message[]): void {
  writeJSON("messages.json", { messages });
}

export function getMessagesByUser(userId: string): Message[] {
  return getMessages().filter((m) => m.userId === userId);
}

export function createMessage(msg: Message): void {
  const messages = getMessages();
  messages.push(msg);
  saveMessages(messages);
}

export function markMessageRead(id: string): boolean {
  const messages = getMessages();
  const idx = messages.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  messages[idx].status = "read";
  saveMessages(messages);
  return true;
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;
  saveMessages(filtered);
  return true;
}

// ─── Quotations ──────────────────────────────────────────────────────────────

export function getQuotations(): Quotation[] {
  return readJSON<{ quotations: Quotation[] }>("quotations.json").quotations;
}

export function saveQuotations(quotations: Quotation[]): void {
  writeJSON("quotations.json", { quotations });
}

export function getQuotationsByUser(userId: string): Quotation[] {
  return getQuotations().filter((q) => q.userId === userId);
}

export function createQuotation(q: Quotation): void {
  const quotations = getQuotations();
  quotations.push(q);
  saveQuotations(quotations);
}

export function updateQuotationStatus(
  id: string,
  status: Quotation["status"],
  adminNote: string
): boolean {
  const quotations = getQuotations();
  const idx = quotations.findIndex((q) => q.id === id);
  if (idx === -1) return false;
  quotations[idx].status = status;
  quotations[idx].adminNote = adminNote;
  saveQuotations(quotations);
  return true;
}

export function deleteQuotation(id: string): boolean {
  const quotations = getQuotations();
  const filtered = quotations.filter((q) => q.id !== id);
  if (filtered.length === quotations.length) return false;
  saveQuotations(filtered);
  return true;
}
