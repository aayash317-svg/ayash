-- ========================================================
-- CLEAN UP FAILED USER STATE
-- Run this script in the Supabase SQL Editor to delete the stuck user.
-- ========================================================

-- Replace this with the email of the user you want to delete
DO $$
DECLARE
  target_email text := 'aayash317@gmail.com'; -- The email stuck in "User already registered"
BEGIN
  -- 1. Delete from public.profiles (if exists, though cascade should handle it)
  DELETE FROM public.profiles WHERE email = target_email;

  -- 2. Delete from auth.users (This is the critical part to fix "User already registered")
  DELETE FROM auth.users WHERE email = target_email;

  RAISE NOTICE 'User % has been deleted. You can now sign up again.', target_email;
END $$;
