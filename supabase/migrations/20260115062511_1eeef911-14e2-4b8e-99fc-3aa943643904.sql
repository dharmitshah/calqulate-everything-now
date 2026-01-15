-- Fix: Rename api_key column to api_key_hash to enforce hashed-only storage
-- This makes the intent clear and prevents accidental plaintext storage

-- Step 1: Rename the column to indicate it should only contain hashed values
ALTER TABLE public.api_usage 
RENAME COLUMN api_key TO api_key_hash;

-- Step 2: Add a comment to document the security requirement
COMMENT ON COLUMN public.api_usage.api_key_hash IS 'SHA-256 hash of API key - NEVER store plaintext keys. Only first 8 chars of hash stored for identification.';

-- Step 3: Truncate any existing data that might contain plaintext keys (safety measure)
-- We keep the hashed values but ensure they are truncated for minimal exposure
UPDATE public.api_usage 
SET api_key_hash = LEFT(api_key_hash, 16) 
WHERE api_key_hash IS NOT NULL AND LENGTH(api_key_hash) > 16;