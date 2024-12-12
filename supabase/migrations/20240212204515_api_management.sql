-- Create API Keys table
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    key_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_used_at TIMESTAMPTZ,
    UNIQUE (user_id, name)
);

-- Create row level security for api_keys
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own API keys"
    ON api_keys FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own API keys"
    ON api_keys FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys"
    ON api_keys FOR DELETE
    USING (auth.uid() = user_id);

-- Create Webhooks table
CREATE TABLE IF NOT EXISTS webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    events TEXT[] NOT NULL,
    description TEXT,
    secret_hash TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_triggered_at TIMESTAMPTZ,
    UNIQUE (user_id, url)
);

-- Create row level security for webhooks
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own webhooks"
    ON webhooks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own webhooks"
    ON webhooks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own webhooks"
    ON webhooks FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own webhooks"
    ON webhooks FOR DELETE
    USING (auth.uid() = user_id);

-- Create Webhook Events table to track webhook delivery attempts
CREATE TABLE IF NOT EXISTS webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    webhook_id UUID NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    status TEXT NOT NULL,
    response_status INTEGER,
    response_body TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at TIMESTAMPTZ
);

-- Create row level security for webhook_events
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own webhook events"
    ON webhook_events FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM webhooks
            WHERE webhooks.id = webhook_events.webhook_id
            AND webhooks.user_id = auth.uid()
        )
    );

-- Create function to update last_used_at timestamp for API keys
CREATE OR REPLACE FUNCTION update_api_key_last_used()
RETURNS trigger AS $$
BEGIN
    UPDATE api_keys
    SET last_used_at = now()
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_api_key_last_used_trigger
    AFTER UPDATE OF last_used_at ON api_keys
    FOR EACH ROW
    EXECUTE FUNCTION update_api_key_last_used();

-- Create function to update last_triggered_at timestamp for webhooks
CREATE OR REPLACE FUNCTION update_webhook_last_triggered()
RETURNS trigger AS $$
BEGIN
    UPDATE webhooks
    SET last_triggered_at = now()
    WHERE id = NEW.webhook_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_webhook_last_triggered_trigger
    AFTER INSERT ON webhook_events
    FOR EACH ROW
    EXECUTE FUNCTION update_webhook_last_triggered();
