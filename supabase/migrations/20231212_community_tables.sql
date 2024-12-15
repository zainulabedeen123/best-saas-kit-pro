-- Drop existing triggers first
drop trigger if exists handle_updated_at on public.community_posts;
drop trigger if exists handle_updated_at on public.community_comments;

-- Drop existing policies
drop policy if exists "Anyone can view posts" on public.community_posts;
drop policy if exists "Authenticated users can create posts" on public.community_posts;
drop policy if exists "Users can update their own posts" on public.community_posts;
drop policy if exists "Users can delete their own posts" on public.community_posts;

drop policy if exists "Anyone can view votes" on public.post_votes;
drop policy if exists "Authenticated users can vote" on public.post_votes;
drop policy if exists "Users can update their own votes" on public.post_votes;
drop policy if exists "Users can delete their own votes" on public.post_votes;

drop policy if exists "Anyone can view comments" on public.community_comments;
drop policy if exists "Authenticated users can create comments" on public.community_comments;
drop policy if exists "Users can update their own comments" on public.community_comments;
drop policy if exists "Users can delete their own comments" on public.community_comments;

-- Drop existing views
drop view if exists public.posts_with_users;

-- Drop existing functions (after dropping triggers that depend on them)
drop function if exists public.update_post_vote_count;
drop function if exists public.handle_updated_at;

-- Create community posts table
create table if not exists public.community_posts (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    title text not null,
    content text not null,
    type text not null check (type in ('general', 'bug_report')),
    vote_count integer default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create post votes table
create table if not exists public.post_votes (
    id uuid default gen_random_uuid() primary key,
    post_id uuid references public.community_posts(id) on delete cascade not null,
    user_id uuid references auth.users(id) not null,
    vote_type text not null check (vote_type in ('up', 'down')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(post_id, user_id)
);

-- Create comments table
create table if not exists public.community_comments (
    id uuid default gen_random_uuid() primary key,
    post_id uuid references public.community_posts(id) on delete cascade not null,
    user_id uuid references auth.users(id) not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create view for posts with user information
create view public.posts_with_users as
select 
    p.*,
    u.email as user_email,
    u.raw_user_meta_data->>'full_name' as user_full_name
from 
    public.community_posts p
    left join auth.users u on p.user_id = u.id;

-- Enable RLS
alter table public.community_posts enable row level security;
alter table public.post_votes enable row level security;
alter table public.community_comments enable row level security;

-- Create policies for community_posts
create policy "Anyone can view posts"
    on public.community_posts for select
    using (true);

create policy "Authenticated users can create posts"
    on public.community_posts for insert
    with check (auth.role() = 'authenticated');

create policy "Users can update their own posts"
    on public.community_posts for update
    using (auth.uid() = user_id);

create policy "Users can delete their own posts"
    on public.community_posts for delete
    using (auth.uid() = user_id);

-- Create policies for post_votes
create policy "Anyone can view votes"
    on public.post_votes for select
    using (true);

create policy "Authenticated users can vote"
    on public.post_votes for insert
    with check (auth.role() = 'authenticated');

create policy "Users can update their own votes"
    on public.post_votes for update
    using (auth.uid() = user_id);

create policy "Users can delete their own votes"
    on public.post_votes for delete
    using (auth.uid() = user_id);

-- Create policies for community_comments
create policy "Anyone can view comments"
    on public.community_comments for select
    using (true);

create policy "Authenticated users can create comments"
    on public.community_comments for insert
    with check (auth.role() = 'authenticated');

create policy "Users can update their own comments"
    on public.community_comments for update
    using (auth.uid() = user_id);

create policy "Users can delete their own comments"
    on public.community_comments for delete
    using (auth.uid() = user_id);

-- Create function to update post vote count
create function public.update_post_vote_count(post_id uuid, vote_change int)
returns void as $$
begin
    update public.community_posts
    set vote_count = vote_count + vote_change
    where id = post_id;
end;
$$ language plpgsql security definer;

-- Create trigger function for updated_at
create function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_updated_at
    before update on public.community_posts
    for each row
    execute function public.handle_updated_at();

create trigger handle_updated_at
    before update on public.community_comments
    for each row
    execute function public.handle_updated_at(); 