-- ========================================================
-- FIX SIGNUP ERROR
-- Run this to verify "Database error saving new user" goes away.
-- ========================================================

-- Drop the trigger that is crashing the signup process
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function used by the trigger
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Now the Application (Frontend) will handle profile creation safely.
