-- ========================================================
-- COMPLETE FIX & SETUP SCRIPT
-- Run this entire script in Supabase SQL Editor to fix errors.
-- ========================================================

-- 1. FIX LOGIN ERROR: Remove conflicting trigger
-- This fixes "Database error saving new user"
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 2. FIX TYPE ERROR: Handle "user_role already exists"
-- We wrap type creation in a safe block using DO
do $$ 
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('student', 'staff');
  end if;
end $$;

-- 3. ENSURE TABLES EXIST
-- We use existing tables if present, or create new ones if missing.

-- Profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role text default 'student', -- Accept text or enum (postgres handles casting usually fine for simple retrieval)
  full_name text,
  email text
);
-- Ensure RLS is on
alter table public.profiles enable row level security;
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
drop policy if exists "Staff can insert profiles" on public.profiles;
create policy "Staff can insert profiles" on public.profiles for insert with check (true);


-- Courses
create table if not exists public.courses (
  course_code text primary key,
  course_name text not null,
  credits integer not null,
  semester integer not null
);
alter table public.courses enable row level security;
drop policy if exists "Courses are viewable by everyone" on public.courses;
create policy "Courses are viewable by everyone" on public.courses for select using (true);


-- Student Grades (Critical for New Dashboard)
create table if not exists public.student_grades (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) not null,
  course_code text references public.courses(course_code) not null,
  grade text,
  semester integer,
  constraint unique_student_course unique (student_id, course_code)
);
alter table public.student_grades enable row level security;
drop policy if exists "Students view own grades" on public.student_grades;
create policy "Students view own grades" on public.student_grades for select using (auth.uid() = student_id);
drop policy if exists "Staff manage grades" on public.student_grades;
create policy "Staff manage grades" on public.student_grades for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'staff') -- Adjust role check based on your actual data
);


-- 4. DEGREE AUDIT FUNCTION (RPC)
create or replace function get_degree_audit(student_uid uuid)
returns table (
  full_name text,
  credits_completed bigint
) 
language plpgsql
security definer
as $$
begin
  return query
  select
    p.full_name,
    sum(c.credits) as credits_completed
  from public.student_grades sg
  join public.courses c on sg.course_code = c.course_code
  join public.profiles p on p.id = sg.student_id
  where p.id = student_uid
  group by p.full_name;
end;
$$;


-- ========================================================
-- INSTRUCTIONS FOR DATA:
-- 1. Create your Users in Authentication -> Users (email/password).
-- 2. Copy their User UUIDs.
-- 3. Run INSERT statements below manually replacing UUIDs.
-- ========================================================

-- Example (Uncomment and replace IDs to run):
/*
insert into public.profiles (id, role, full_name, email) values
('REPLACE_WITH_STUDENT_ID', 'student', 'Student Name', 's1@univ.edu')
on conflict (id) do nothing; -- Safe insert

insert into public.student_grades (student_id, course_code, grade, semester) values
('REPLACE_WITH_STUDENT_ID', 'CS101', 'A', 1),
('REPLACE_WITH_STUDENT_ID', 'MA101', 'B', 1)
on conflict do nothing;
*/
