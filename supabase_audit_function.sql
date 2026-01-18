-- 9. Degree Audit Query (Supabase RPC)
-- This function allows the AI agent or Frontend to easily fetch audit data

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
