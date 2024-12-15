-- Create users table first
create table if not exists public.users (
    id uuid references auth.users(id) primary key,
    email text not null,
    credits integer default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Drop existing triggers
drop trigger if exists handle_updated_at on public.users;
drop trigger if exists on_auth_user_created on auth.users;

-- Drop existing functions
drop function if exists public.handle_updated_at();
drop function if exists public.handle_new_user();

-- Drop existing policies
drop policy if exists "Users can view their own data" on public.users;
drop policy if exists "Users can update their own data" on public.users;

-- Create policies
create policy "Users can view their own data"
    on public.users for select
    using (auth.uid() = id);

create policy "Users can update their own data"
    on public.users for update
    using (auth.uid() = id);

-- Create trigger for updated_at
create function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger handle_updated_at
    before update on public.users
    for each row
    execute function public.handle_updated_at();

-- Create function to create user record
create function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users (id, email, credits)
    values (new.id, new.email, 0)
    on conflict (id) do update
    set email = excluded.email;
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute function public.handle_new_user(); 