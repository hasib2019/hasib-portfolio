import { supabaseAdmin } from "./supabase";
import type { PortfolioData, User, Message, Quotation } from "./types";

// ─── Portfolio ───────────────────────────────────────────────────────────────

export async function getPortfolio(): Promise<PortfolioData> {
  const [
    { data: pi },
    { data: exps },
    { data: projs },
    { data: edu },
    { data: certs },
    { data: skillsData },
  ] = await Promise.all([
    supabaseAdmin.from("personal_info").select("*").single(),
    supabaseAdmin.from("experiences").select("*").order("display_order"),
    supabaseAdmin.from("projects").select("*").order("display_order"),
    supabaseAdmin.from("education").select("*").order("display_order"),
    supabaseAdmin.from("certifications").select("*").order("display_order"),
    supabaseAdmin.from("skills").select("*").order("display_order"),
  ]);

  const skills: Record<string, string[]> = {};
  skillsData?.forEach((s) => {
    skills[s.category] = s.items;
  });

  return {
    personalInfo: {
      name: pi?.name || "",
      title: pi?.title || "",
      tagline: pi?.tagline || "",
      email: pi?.email || "",
      phone: pi?.phone || "",
      website: pi?.website || "",
      github: pi?.github || "",
      linkedin: pi?.linkedin || "",
      facebook: pi?.facebook || "",
      location: pi?.location || "",
      bloodGroup: pi?.blood_group || "",
      summary: pi?.summary || "",
      availableForWork: pi?.available_for_work ?? true,
      footerCredit: pi?.footer_credit || "",
    },
    experiences: exps?.map((e) => ({
      id: e.id,
      role: e.role,
      company: e.company,
      location: e.location,
      duration: e.duration,
      current: e.current,
      technologies: e.technologies,
      description: e.description,
    })) || [],
    projects: projs?.map((p) => ({
      id: p.id,
      name: p.name,
      company: p.company,
      type: p.type,
      description: p.description,
      technologies: p.technologies,
      link: p.link,
      linkLabel: p.link_label,
      featured: p.featured,
      demo: p.demo,
    })) || [],
    education: edu?.map((e) => ({
      id: e.id,
      degree: e.degree,
      institution: e.institution,
      duration: e.duration,
      gpa: e.gpa,
      icon: e.icon,
    })) || [],
    certifications: certs?.map((c) => ({
      id: c.id,
      name: c.name,
      issuer: c.issuer,
      validationNo: c.validation_no,
      verifyUrl: c.verify_url,
      category: c.category,
    })) || [],
    skills,
  };
}

export async function savePortfolio(data: PortfolioData): Promise<void> {
  const pi = data.personalInfo;
  
  // 1. Update Personal Info
  await supabaseAdmin.from("personal_info").upsert({
    id: 1,
    name: pi.name,
    title: pi.title,
    tagline: pi.tagline,
    email: pi.email,
    phone: pi.phone,
    website: pi.website,
    github: pi.github,
    linkedin: pi.linkedin,
    facebook: pi.facebook,
    location: pi.location,
    blood_group: pi.bloodGroup,
    summary: pi.summary,
    available_for_work: pi.availableForWork,
    footer_credit: pi.footerCredit
  });

  // 2. Update nested collections (Delete and Re-insert to maintain order and clean state)
  // Experiences
  await supabaseAdmin.from("experiences").delete().neq("id", 0);
  if (data.experiences.length > 0) {
    await supabaseAdmin.from("experiences").insert(data.experiences.map((e, i) => ({
      role: e.role,
      company: e.company,
      location: e.location,
      duration: e.duration,
      current: e.current,
      technologies: e.technologies,
      description: e.description,
      display_order: i
    })));
  }

  // Projects
  await supabaseAdmin.from("projects").delete().neq("id", 0);
  if (data.projects.length > 0) {
    await supabaseAdmin.from("projects").insert(data.projects.map((p, i) => ({
      name: p.name,
      company: p.company,
      type: p.type,
      description: p.description,
      technologies: p.technologies,
      link: p.link,
      link_label: p.linkLabel,
      featured: p.featured,
      demo: p.demo,
      display_order: i
    })));
  }

  // Education
  await supabaseAdmin.from("education").delete().neq("id", 0);
  if (data.education.length > 0) {
    await supabaseAdmin.from("education").insert(data.education.map((e, i) => ({
      degree: e.degree,
      institution: e.institution,
      duration: e.duration,
      gpa: e.gpa,
      icon: e.icon,
      display_order: i
    })));
  }

  // Certifications
  await supabaseAdmin.from("certifications").delete().neq("id", 0);
  if (data.certifications.length > 0) {
    await supabaseAdmin.from("certifications").insert(data.certifications.map((c, i) => ({
      name: c.name,
      issuer: c.issuer,
      validation_no: c.validationNo,
      verify_url: c.verifyUrl,
      category: c.category,
      display_order: i
    })));
  }

  // Skills
  await supabaseAdmin.from("skills").delete().neq("id", 0);
  const skills = Object.entries(data.skills).map(([category, items], i) => ({
    category,
    items,
    display_order: i
  }));
  if (skills.length > 0) {
    await supabaseAdmin.from("skills").insert(skills);
  }
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  const { data } = await supabaseAdmin.from("users").select("*").order("created_at", { ascending: false });
  return (data || []).map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    password: u.password,
    role: u.role as any,
    createdAt: u.created_at
  }));
}

export async function saveUsers(users: User[]): Promise<void> {
  if (users.length === 0) return;
  await supabaseAdmin.from("users").upsert(users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    password: u.password,
    role: u.role,
    created_at: u.createdAt
  })));
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const { data } = await supabaseAdmin.from("users").select("*").eq("email", email.toLowerCase()).maybeSingle();
  if (!data) return undefined;
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role as any,
    createdAt: data.created_at
  };
}

export async function getUserById(id: string): Promise<User | undefined> {
  const { data } = await supabaseAdmin.from("users").select("*").eq("id", id).maybeSingle();
  if (!data) return undefined;
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role as any,
    createdAt: data.created_at
  };
}

export async function createUser(user: User): Promise<void> {
  await supabaseAdmin.from("users").insert({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    created_at: user.createdAt
  });
}

export async function updateUser(id: string, updates: Partial<User>): Promise<boolean> {
  const mappedUpdates: any = { ...updates };
  if (updates.createdAt) {
    mappedUpdates.created_at = updates.createdAt;
    delete mappedUpdates.createdAt;
  }
  const { error } = await supabaseAdmin.from("users").update(mappedUpdates).eq("id", id);
  return !error;
}

export async function deleteUser(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("users").delete().eq("id", id);
  return !error;
}

// ─── Messages ────────────────────────────────────────────────────────────────

export async function getMessages(): Promise<Message[]> {
  const { data } = await supabaseAdmin.from("messages").select("*").order("created_at", { ascending: false });
  return (data || []).map(m => ({
    id: m.id,
    userId: m.user_id,
    userName: m.user_name,
    userEmail: m.user_email,
    subject: m.subject,
    body: m.body,
    status: m.status as any,
    createdAt: m.created_at
  }));
}

export async function saveMessages(messages: Message[]): Promise<void> {
  if (messages.length === 0) return;
  await supabaseAdmin.from("messages").upsert(messages.map(m => ({
    id: m.id,
    user_id: m.userId,
    user_name: m.userName,
    user_email: m.userEmail,
    subject: m.subject,
    body: m.body,
    status: m.status,
    created_at: m.createdAt
  })));
}

export async function getMessagesByUser(userId: string): Promise<Message[]> {
  const { data } = await supabaseAdmin.from("messages").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  return (data || []).map(m => ({
    id: m.id,
    userId: m.user_id,
    userName: m.user_name,
    userEmail: m.user_email,
    subject: m.subject,
    body: m.body,
    status: m.status as any,
    createdAt: m.created_at
  }));
}

export async function createMessage(msg: Message): Promise<void> {
  await supabaseAdmin.from("messages").insert({
    id: msg.id,
    user_id: msg.userId,
    user_name: msg.userName,
    user_email: msg.userEmail,
    subject: msg.subject,
    body: msg.body,
    status: msg.status,
    created_at: msg.createdAt
  });
}

export async function markMessageRead(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("messages").update({ status: "read" }).eq("id", id);
  return !error;
}

export async function deleteMessage(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("messages").delete().eq("id", id);
  return !error;
}

// ─── Quotations ──────────────────────────────────────────────────────────────

export async function getQuotations(): Promise<Quotation[]> {
  const { data } = await supabaseAdmin.from("quotations").select("*").order("created_at", { ascending: false });
  return (data || []).map(q => ({
    id: q.id,
    userId: q.user_id,
    userName: q.user_name,
    userEmail: q.user_email,
    projectName: q.project_name,
    description: q.description,
    budget: q.budget,
    deadline: q.deadline,
    techStack: q.tech_stack,
    status: q.status as any,
    adminNote: q.admin_note,
    createdAt: q.created_at
  }));
}

export async function saveQuotations(quotations: Quotation[]): Promise<void> {
  if (quotations.length === 0) return;
  await supabaseAdmin.from("quotations").upsert(quotations.map(q => ({
    id: q.id,
    user_id: q.userId,
    user_name: q.userName,
    user_email: q.userEmail,
    project_name: q.projectName,
    description: q.description,
    budget: q.budget,
    deadline: q.deadline,
    tech_stack: q.techStack,
    status: q.status,
    admin_note: q.adminNote,
    created_at: q.createdAt
  })));
}

export async function getQuotationsByUser(userId: string): Promise<Quotation[]> {
  const { data } = await supabaseAdmin.from("quotations").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  return (data || []).map(q => ({
    id: q.id,
    userId: q.user_id,
    userName: q.user_name,
    userEmail: q.user_email,
    projectName: q.project_name,
    description: q.description,
    budget: q.budget,
    deadline: q.deadline,
    techStack: q.tech_stack,
    status: q.status as any,
    adminNote: q.admin_note,
    createdAt: q.createdAt
  }));
}

export async function createQuotation(q: Quotation): Promise<void> {
  await supabaseAdmin.from("quotations").insert({
    id: q.id,
    user_id: q.userId,
    user_name: q.userName,
    user_email: q.userEmail,
    project_name: q.projectName,
    description: q.description,
    budget: q.budget,
    deadline: q.deadline,
    tech_stack: q.techStack,
    status: q.status,
    admin_note: q.adminNote,
    created_at: q.createdAt
  });
}

export async function updateQuotationStatus(
  id: string,
  status: Quotation["status"],
  adminNote: string
): Promise<boolean> {
  const { error } = await supabaseAdmin.from("quotations").update({
    status,
    admin_note: adminNote
  }).eq("id", id);
  return !error;
}

export async function deleteQuotation(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("quotations").delete().eq("id", id);
  return !error;
}
