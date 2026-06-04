-- Create personal_info table
CREATE TABLE IF NOT EXISTS personal_info (
    id BIGINT PRIMARY KEY DEFAULT 1,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    website TEXT NOT NULL,
    github TEXT NOT NULL,
    linkedin TEXT NOT NULL,
    facebook TEXT NOT NULL,
    location TEXT NOT NULL,
    blood_group TEXT NOT NULL,
    summary TEXT NOT NULL,
    available_for_work BOOLEAN DEFAULT TRUE,
    footer_credit TEXT NOT NULL,
    CONSTRAINT single_row CHECK (id = 1)
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT NOT NULL,
    current BOOLEAN DEFAULT FALSE,
    technologies TEXT[] NOT NULL,
    description TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL,
    link TEXT NOT NULL,
    link_label TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    demo JSONB,
    display_order INT DEFAULT 0
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    duration TEXT NOT NULL,
    gpa TEXT,
    icon TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    validation_no TEXT,
    verify_url TEXT,
    category TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    items TEXT[] NOT NULL,
    display_order INT DEFAULT 0
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quotations table
CREATE TABLE IF NOT EXISTS quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    project_name TEXT NOT NULL,
    description TEXT NOT NULL,
    budget TEXT NOT NULL,
    deadline TEXT NOT NULL,
    tech_stack TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    admin_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Create Policies (Simplified for now: Admin has full access, others read only for public tables)
-- For public tables (personal_info, experiences, projects, education, certifications, skills)
CREATE POLICY "Public Read Access" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON education FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON skills FOR SELECT USING (true);

-- Admin policies (assuming service_role will be used for admin tasks)
CREATE POLICY "Admin All Access" ON personal_info FOR ALL USING (true);
CREATE POLICY "Admin All Access" ON experiences FOR ALL USING (true);
CREATE POLICY "Admin All Access" ON projects FOR ALL USING (true);
CREATE POLICY "Admin All Access" ON education FOR ALL USING (true);
CREATE POLICY "Admin All Access" ON certifications FOR ALL USING (true);
CREATE POLICY "Admin All Access" ON skills FOR ALL USING (true);
CREATE POLICY "Admin All Access" ON users FOR ALL USING (true);
CREATE POLICY "Admin All Access" ON messages FOR ALL USING (true);
CREATE POLICY "Admin All Access" ON quotations FOR ALL USING (true);

-- User policies for messages and quotations
CREATE POLICY "Users can create messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can create quotations" ON quotations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can see own messages" ON messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can see own quotations" ON quotations FOR SELECT USING (auth.uid() = user_id);
