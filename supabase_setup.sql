-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Enum Types
create type user_role as enum ('student', 'staff');
create type enrollment_status as enum ('Completed', 'In Progress', 'Pending', 'Dropped', 'Withdrawn');
create type task_status as enum ('Pending', 'In Progress', 'Completed');

-- 1. Profiles Table (Base for all users)
-- This table mirrors auth.users and is safe to query by the app
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  role user_role default 'student',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Trigger to create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', (new.raw_user_meta_data->>'role')::user_role);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Students Table (Extends Profiles for student-specific data)
create table public.students (
  id uuid references public.profiles(id) on delete cascade not null primary key,
  major text,
  level text, -- e.g., 'Undergraduate', 'Graduate', 'B.Sc.'
  cgpa numeric(3, 2),
  credits_earned integer default 0,
  credits_required integer default 120,
  current_semester text, -- e.g., 'Fall 2026'
  academic_standing text default 'Good Standing'
);

alter table public.students enable row level security;

create policy "Students can view their own data" on public.students
  for select using (auth.uid() = id);

create policy "Staff can view all student data" on public.students
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'staff')
  );


-- 3. Courses Table (Catalog)
create table public.courses (
  code text primary key,
  title text not null,
  credits integer not null,
  description text
);

alter table public.courses enable row level security;

create policy "Courses are viewable by everyone" on public.courses
  for select using (true);


-- 4. Enrollments / Academic History
create table public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  course_code text references public.courses(code) not null,
  semester text not null,
  grade text, -- Null if in progress
  status enrollment_status default 'In Progress',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.enrollments enable row level security;

create policy "Students can view their own enrollments" on public.enrollments
  for select using (auth.uid() = student_id);

create policy "Staff can view all enrollments" on public.enrollments
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'staff')
  );


-- 5. Staff Tasks (For Dashboard)
create table public.staff_tasks (
  id uuid default uuid_generate_v4() primary key,
  staff_id uuid references public.profiles(id) on delete cascade not null, -- Assigned to
  title text not null,
  description text,
  course_code text references public.courses(code), -- Optional, linked to a course
  due_date timestamp with time zone,
  status task_status default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.staff_tasks enable row level security;

create policy "Staff can view and manage their own tasks" on public.staff_tasks
  for all using (auth.uid() = staff_id);


-- SEED DATA (Optional - run this to populate tables)
-- Note: You cannot seed 'profiles' or 'students' directly easily because they depend on auth.users IDs.
-- The following seeds Courses which is independent.

insert into public.courses (code, title, credits, description) values
('CS101', 'Intro to Programming', 4, 'Introduction to Python and basic programming concepts.'),
('CS102', 'Data Structures', 4, 'Stacks, queues, trees, and graphs.'),
('MA101', 'Calculus I', 3, 'Limits, derivatives, and integrals.'),
('CS201', 'Algorithms', 4, 'Analysis of algorithms and complexity.'),
('HS201', 'Intro to Psychology', 3, 'Basic principles of psychology.');
