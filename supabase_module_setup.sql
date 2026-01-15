-- 1. Create Profiles Table (Merging Staff and Student Info)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role text check (role in ('staff', 'student')) not null,
  full_name text,
  email text
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);
  
-- Note: Insert policy is usually handled by a trigger on auth.users, but here we allow manual inserts as per instructions.
create policy "Staff can insert profiles" on public.profiles
  for insert with check (true);

-- 2. Create Courses Table
create table public.courses (
  course_code text primary key,
  course_name text not null,
  credits integer not null,
  semester integer not null
);

alter table public.courses enable row level security;

create policy "Courses are viewable by everyone" on public.courses
  for select using (true);

-- 3. Create Grade Audit Log Table
create table public.grade_audit_log (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid,
  course_code text,
  old_grade text,
  changed_at timestamp with time zone default now(),
  changed_by uuid default auth.uid()
);

alter table public.grade_audit_log enable row level security;

create policy "Staff can view audit logs" on public.grade_audit_log
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'staff')
  );

-- 4. Create Student Grades Table
create table public.student_grades (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) not null,
  course_code text references public.courses(course_code) not null,
  grade text,
  semester integer
);

-- Unique constraint to prevent duplicate grades for same course/student
alter table public.student_grades add constraint unique_student_course unique (student_id, course_code);

alter table public.student_grades enable row level security;

-- RLS: Student sees only their records
create policy "Students view own grades" on public.student_grades
  for select using (auth.uid() = student_id);

-- RLS: Staff can Insert/Update/Select all
create policy "Staff manage grades" on public.student_grades
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'staff')
  );

-- 5. Create Attendance Table
create table public.attendance (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) not null,
  course_code text references public.courses(course_code) not null,
  attendance_percentage integer check (attendance_percentage >= 0 and attendance_percentage <= 100)
);

alter table public.attendance enable row level security;

create policy "Students view own attendance" on public.attendance
  for select using (auth.uid() = student_id);

create policy "Staff manage attendance" on public.attendance
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'staff')
  );


-- 6. Trigger for Grade Audit (Auto Replace Logic)
create or replace function log_grade_update()
returns trigger as $$
begin
  if (TG_OP = 'UPDATE') then
    insert into public.grade_audit_log (student_id, course_code, old_grade)
    values (old.student_id, old.course_code, old.grade);
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_grade_change
  before update on public.student_grades
  for each row execute procedure log_grade_update();


-- ==========================================
-- DATA SEEDING SCRIPTS (Run these after creating users in Auth)
-- ==========================================

-- 3. Insert Profiles (Role Assignment)
-- REPLACE 'STAFF_UID', 'STUDENT1_UID', etc., with actual UUIDs from Authentication tab
/*
insert into profiles (id, role, full_name, email) values
('STAFF_UID', 'staff', 'Staff Name', 'staff@univ.edu'),
('STUDENT1_UID', 'student', 'Student One', 's1@univ.edu'),
('STUDENT2_UID', 'student', 'Student Two', 's2@univ.edu');
*/

-- 4. Insert Course Master Data
insert into courses (course_code, course_name, credits, semester) values
('CS101', 'Programming Fundamentals', 4, 1),
('MA101', 'Engineering Mathematics', 4, 1),
('PH101', 'Physics', 3, 1),
('CS201', 'Data Structures', 4, 2);

-- 5. Staff Enters Grades (Main Data)
/*
insert into student_grades (student_id, course_code, grade, semester) values
('STUDENT1_UID', 'CS101', 'A', 1),
('STUDENT1_UID', 'MA101', 'B+', 1),
('STUDENT2_UID', 'PH101', 'B', 1);
*/

-- 6. Staff Updates Grade (Test Auto Replace/Audit)
/*
update student_grades
set grade = 'A+'
where student_id = 'STUDENT1_UID'
and course_code = 'MA101';
*/

-- 8. Attendance Entry
/*
insert into attendance (student_id, course_code, attendance_percentage) values
('STUDENT1_UID', 'CS101', 90);
*/

-- 9. Degree Audit Query (To be used by AI Agent)
/*
select
  p.full_name,
  sum(c.credits) as credits_completed
from student_grades sg
join courses c on sg.course_code = c.course_code
join profiles p on p.id = sg.student_id
where p.id = 'STUDENT1_UID' -- Replace with dynamic ID in app
group by p.full_name;
*/
