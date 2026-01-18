-- Drop the conflicting trigger that attempts to auto-insert profiles
-- This is necessary because we are manually inserting profiles with specific roles in the other script.

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
