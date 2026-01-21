-- ========================================================
-- BULK IMPORT STUDENTS SCRIPT (FIXED)
-- Run this in Supabase SQL Editor.
-- It ensures tables exist before inserting data.
-- ========================================================

-- 1. EXTENSIONS
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- 2. CREATE TYPES (Safe Block)
do $$
begin
    if not exists (select 1 from pg_type where typname = 'user_role') then
        create type user_role as enum ('student', 'staff');
    end if;
end $$;

-- 3. ENSURE TABLES EXIST
-- Profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  role user_role default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Ensure RLS (optional but good practice)
alter table public.profiles enable row level security;
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Students
create table if not exists public.students (
  id uuid references public.profiles(id) on delete cascade not null primary key,
  major text,
  level text,
  cgpa numeric(3, 2),
  credits_earned integer default 0,
  credits_required integer default 120,
  current_semester text,
  academic_standing text default 'Good Standing'
);
alter table public.students enable row level security;


-- 4. SCHEMA UPDATES (Add Columns)
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'roll_number') then
        alter table public.students add column roll_number integer;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'class_id') then
        alter table public.students add column class_id text;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'phone') then
        alter table public.students add column phone text;
    end if;
end $$;


-- 5. BULK INSERT
do $$
declare
    student_data record;
    new_user_id uuid;
begin
    for student_data in select * from (values
        (1, 'Aarav Kumar', 'aarav1@student.edu', '9000000001', 'TU24001'),
        (2, 'Diya Sharma', 'diya2@student.edu', '9000000002', 'TU24001'),
        (3, 'Rohan Verma', 'rohan3@student.edu', '9000000003', 'TU24001'),
        (4, 'Ananya Singh', 'ananya4@student.edu', '9000000004', 'TU24001'),
        (5, 'Vikram Patel', 'vikram5@student.edu', '9000000005', 'TU24001'),
        (6, 'Sneha Iyer', 'sneha6@student.edu', '9000000006', 'TU24006'),
        (7, 'Arjun Reddy', 'arjun7@student.edu', '9000000007', 'TU24007'),
        (8, 'Kavya Nair', 'kavya8@student.edu', '9000000008', 'TU24008'),
        (9, 'Rahul Das', 'rahul9@student.edu', '9000000009', 'TU24009'),
        (10, 'Pooja Mehta', 'pooja10@student.edu', '9000000010', 'TU240010')
    ) as t(roll, name, email, phone, class_id)
    loop
        -- Check if user exists
        select id into new_user_id from auth.users where email = student_data.email;

        if new_user_id is null then
            new_user_id := uuid_generate_v4();
            
            insert into auth.users (
                id,
                email,
                encrypted_password,
                email_confirmed_at,
                raw_app_meta_data,
                raw_user_meta_data,
                aud,
                role
            )
            values (
                new_user_id,
                student_data.email,
                crypt(student_data.class_id, gen_salt('bf')), -- Use Class ID as password
                now(),
                '{"provider": "email", "providers": ["email"]}',
                jsonb_build_object('full_name', student_data.name, 'role', 'student'),
                'authenticated',
                'authenticated'
            );
        else
            -- Update password for existing user to match Class ID
            update auth.users
            set encrypted_password = crypt(student_data.class_id, gen_salt('bf'))
            where id = new_user_id;
        end if;

        -- Profile
        insert into public.profiles (id, email, full_name, role)
        values (new_user_id, student_data.email, student_data.name, 'student')
        on conflict (id) do update set 
            full_name = excluded.full_name;

        -- Student
        insert into public.students (id, roll_number, class_id, phone)
        values (new_user_id, student_data.roll, student_data.class_id, student_data.phone)
        on conflict (id) do update set 
            roll_number = excluded.roll_number,
            class_id = excluded.class_id,
            phone = excluded.phone;

    end loop;
    
    RAISE NOTICE 'Bulk import completed successfully.';
end $$;
