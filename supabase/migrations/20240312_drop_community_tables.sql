-- Drop community-related tables
DROP TABLE IF EXISTS public.community_comments CASCADE;
DROP TABLE IF EXISTS public.post_votes CASCADE;
DROP TABLE IF EXISTS public.community_posts CASCADE;

-- Drop community-related views
DROP VIEW IF EXISTS public.posts_with_users CASCADE;

-- Drop community-related functions
DROP FUNCTION IF EXISTS public.update_post_vote_count CASCADE; 