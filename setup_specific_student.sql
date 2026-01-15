-- ========================================================
-- SETUP DATA FOR: aayas317@gmail.com
-- Prerequisite: You must have created this user in Authentication tab (or signed up) FIRST.
-- ========================================================

DO $$
DECLARE
  target_email text := 'aayas317@gmail.com';
  user_record record;
BEGIN
  -- 1. Find the user in auth.users
  SELECT * INTO user_record FROM auth.users WHERE email = target_email;

  IF user_record.id IS NOT NULL THEN
    
    -- 2. Insert Profile (Link Auth User to Public Profile)
    INSERT INTO public.profiles (id, role, full_name, email)
    VALUES (user_record.id, 'student', 'Aayas User', target_email)
    ON CONFLICT (id) DO UPDATE 
    SET role = 'student', full_name = 'Aayas User';

    -- 3. Insert Sample Courses (if not exist)
    INSERT INTO public.courses (course_code, course_name, credits, semester) VALUES
    ('CS101', 'Programming Fundamentals', 4, 1),
    ('MA101', 'Engineering Mathematics', 4, 1),
    ('PH101', 'Physics', 3, 1)
    ON CONFLICT (course_code) DO NOTHING;

    -- 4. Insert Student Grades (So Dashboard shows data)
    INSERT INTO public.student_grades (student_id, course_code, grade, semester)
    VALUES
    (user_record.id, 'CS101', 'A', 1),
    (user_record.id, 'MA101', 'B+', 1),
    (user_record.id, 'PH101', 'B', 1)
    ON CONFLICT (student_id, course_code) DO NOTHING;

    RAISE NOTICE 'SUCCESS: Data set up for %', target_email;
    
  ELSE
    RAISE EXCEPTION 'ERROR: User % not found in Authentication. please create the user in Supabase Auth first!', target_email;
  END IF;
END $$;
