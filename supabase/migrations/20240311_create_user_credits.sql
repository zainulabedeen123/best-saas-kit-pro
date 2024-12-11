-- Enable RLS
ALTER TABLE IF EXISTS user_credits ENABLE ROW LEVEL SECURITY;

-- Create the user_credits table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_credits (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    credits INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id)
);

-- Create an index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_credits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_credits_updated_at ON user_credits;

CREATE TRIGGER update_user_credits_updated_at
    BEFORE UPDATE ON user_credits
    FOR EACH ROW
    EXECUTE FUNCTION update_user_credits_updated_at();

-- Create policies
CREATE POLICY "Users can view their own credits"
    ON user_credits FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
    ON user_credits FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits"
    ON user_credits FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON user_credits TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE user_credits_id_seq TO authenticated; 