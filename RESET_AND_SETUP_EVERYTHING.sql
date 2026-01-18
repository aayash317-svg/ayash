-- ========================================================
-- RESET AND SETUP EVERYTHING
-- !!! WARNING: THIS WILL DELETE ALL DATA IN PUBLIC TABLES !!!
-- Run this script in the Supabase SQL Editor to fix ALL issues.
-- ========================================================

-- 1. DESTRUCTIVE RESET (Clean Slate)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.student_grades CASCADE;
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.staff_tasks CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.students CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- 2. SCHEMA RE-CREATION
CREATE TYPE user_role AS ENUM ('student', 'staff');

-- Profiles Table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    role user_role DEFAULT 'student',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Courses Table
CREATE TABLE public.courses (
    course_code TEXT PRIMARY KEY,
    course_name TEXT NOT NULL,
    credits INTEGER NOT NULL,
    semester INTEGER NOT NULL
);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Student Grades Table
CREATE TABLE public.student_grades (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    course_code TEXT REFERENCES public.courses(course_code) NOT NULL,
    grade TEXT,
    semester INTEGER,
    CONSTRAINT unique_student_course UNIQUE (student_id, course_code)
);
ALTER TABLE public.student_grades ENABLE ROW LEVEL SECURITY;

-- 3. AUTHENTICATION TRIGGERS (The "Magic" for Sign Up)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Student'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  )
  ON CONFLICT (id) DO NOTHING; -- Safe if inserted manually
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. RLS POLICIES (Fixes "Permission Denied" errors)

-- Profiles: Public Read (for login checks), Self Insert/Update
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Self Insert Profiles" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Self Update Profiles" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Courses: Public Read
CREATE POLICY "Public Read Courses" ON public.courses FOR SELECT USING (true);

-- Grades: Student View Own, Staff View All
CREATE POLICY "Student View Own Grades" ON public.student_grades FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Staff Manage Grades" ON public.student_grades FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'staff')
);

-- 5. HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION get_degree_audit(student_uid UUID)
RETURNS TABLE (full_name TEXT, credits_completed BIGINT) 
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT p.full_name, SUM(c.credits)
  FROM public.student_grades sg
  JOIN public.courses c ON sg.course_code = c.course_code
  JOIN public.profiles p ON p.id = sg.student_id
  WHERE p.id = student_uid
  GROUP BY p.full_name;
END;
$$;

-- 6. SEED DATA (Courses)
INSERT INTO public.courses (course_code, course_name, credits, semester) VALUES
('CS101', 'Intro to CS', 4, 1),
('MA101', 'Calculus I', 4, 1),
('PH101', 'Physics I', 4, 1),
('EN101', 'English Composition', 3, 1),
('CS102', 'Data Structures', 4, 2),
('MA102', 'Calculus II', 4, 2)
ON CONFLICT (course_code) DO NOTHING;

-- 7. SETUP SPECIFIC USER (If they exist in Auth but lost profile)
DO $$
DECLARE
  target_email text := 'aayas317@gmail.com';
  user_record record;
BEGIN
  SELECT * INTO user_record FROM auth.users WHERE email = target_email;
  IF user_record.id IS NOT NULL THEN
    INSERT INTO public.profiles (id, role, full_name, email)
    VALUES (user_record.id, 'student', 'Aayas User', target_email)
    ON CONFLICT (id) DO UPDATE SET role = 'student';
    
    INSERT INTO public.student_grades (student_id, course_code, grade, semester) VALUES
    (user_record.id, 'CS101', 'A', 1),
    (user_record.id, 'MA101', 'B+', 1)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
