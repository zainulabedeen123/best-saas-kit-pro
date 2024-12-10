-- Create customers table
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  stripe_customer_id text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id),
  UNIQUE(stripe_customer_id)
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own customer data" ON customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all customer data" ON customers
  USING (auth.jwt()->>'role' = 'service_role');

-- Indexes
CREATE INDEX customers_user_id_idx ON customers(user_id);
CREATE INDEX customers_stripe_customer_id_idx ON customers(stripe_customer_id); 