import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import ws from 'ws';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    fetch: (...args) => fetch(...args),
  },
  realtime: {
    transport: ws,
  },
});

const dataDir = path.join(process.cwd(), 'data');

async function migrate() {
  console.log('Starting migration...');

  // 1. Portfolio
  const portfolioPath = path.join(dataDir, 'portfolio.json');
  if (fs.existsSync(portfolioPath)) {
    const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'));
    
    // Personal Info
    console.log('Migrating Personal Info...');
    const pi = portfolio.personalInfo;
    await supabase.from('personal_info').upsert({
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

    // Experiences
    console.log('Migrating Experiences...');
    await supabase.from('experiences').delete().neq('id', 0);
    if (portfolio.experiences?.length > 0) {
      await supabase.from('experiences').insert(portfolio.experiences.map((e: any, i: number) => ({
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
    console.log('Migrating Projects...');
    await supabase.from('projects').delete().neq('id', 0);
    if (portfolio.projects?.length > 0) {
      await supabase.from('projects').insert(portfolio.projects.map((p: any, i: number) => ({
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
    console.log('Migrating Education...');
    await supabase.from('education').delete().neq('id', 0);
    if (portfolio.education?.length > 0) {
      await supabase.from('education').insert(portfolio.education.map((e: any, i: number) => ({
        degree: e.degree,
        institution: e.institution,
        duration: e.duration,
        gpa: e.gpa,
        icon: e.icon,
        display_order: i
      })));
    }

    // Certifications
    console.log('Migrating Certifications...');
    await supabase.from('certifications').delete().neq('id', 0);
    if (portfolio.certifications?.length > 0) {
      await supabase.from('certifications').insert(portfolio.certifications.map((c: any, i: number) => ({
        name: c.name,
        issuer: c.issuer,
        validation_no: c.validationNo,
        verify_url: c.verifyUrl,
        category: c.category,
        display_order: i
      })));
    }

    // Skills
    console.log('Migrating Skills...');
    await supabase.from('skills').delete().neq('id', 0);
    if (portfolio.skills) {
      const skills = Object.entries(portfolio.skills).map(([category, items], i) => ({
        category,
        items,
        display_order: i
      }));
      await supabase.from('skills').insert(skills);
    }
  }

  // 2. Users
  const usersPath = path.join(dataDir, 'users.json');
  if (fs.existsSync(usersPath)) {
    const { users } = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    if (users && users.length > 0) {
      console.log('Migrating Users...');
      await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('users').insert(users.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role,
        created_at: u.createdAt
      })));
    }
  }

  console.log('Migration finished!');
}

migrate().catch(console.error);
