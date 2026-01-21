-- ========================================================
-- FIX LOGIN FOR AARAV
-- Run this to force a simple password for testing.
-- ========================================================

create extension if not exists pgcrypto;

DO $$
DECLARE
    target_email text := 'aarav1@student.edu';
    new_password text := '123456'; -- Simple password for testing
BEGIN
    -- Update auth.users directly
    UPDATE auth.users
    SET 
        encrypted_password = crypt(new_password, gen_salt('bf')),
        email_confirmed_at = now(), -- Ensure email is confirmed
        updated_at = now()
    WHERE email = target_email;

    RAISE NOTICE 'Password for % has been reset to: %', target_email, new_password;
END $$;
