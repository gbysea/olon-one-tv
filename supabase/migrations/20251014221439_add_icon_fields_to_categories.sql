/*
  Add icon and post_count fields to categories
  This migration is idempotent and will only add columns if they don't exist.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'icon_up'
  ) THEN
    ALTER TABLE categories ADD COLUMN icon_up TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'icon_hover'
  ) THEN
    ALTER TABLE categories ADD COLUMN icon_hover TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'post_count'
  ) THEN
    ALTER TABLE categories ADD COLUMN post_count INTEGER DEFAULT 0;
  END IF;
END $$;
