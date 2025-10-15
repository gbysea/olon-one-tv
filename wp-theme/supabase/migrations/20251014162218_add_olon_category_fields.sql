/*
  # Add OLON category fields

  1. Changes to categories table
    - Add `color` field for category brand color
    - Add `icon_up` field for default icon image URL
    - Add `icon_hover` field for hover state icon image URL
    - Add `post_count` field to track number of posts (computed)
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add new fields to categories table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'color'
  ) THEN
    ALTER TABLE categories ADD COLUMN color TEXT DEFAULT '#666666';
  END IF;

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
