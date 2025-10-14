/*
  # Populate OLON category data

  1. Data Population
    - Insert or update the 6 OLON sentiment categories
    - Set colors, icons, and descriptions for each category
  
  2. Categories
    - Top (red)
    - Up (teal)
    - Charm (yellow)
    - Bottom (mint)
    - Down (blue)
    - Strange (purple)
*/

-- Insert or update categories with OLON data
INSERT INTO categories (name, slug, description, color, icon_up, icon_hover, post_count)
VALUES
  (
    'Top',
    'top',
    'Excellence and peak performance content',
    '#FF6B6B',
    '/images/top-UP-olon-120.png',
    '/images/top-HOVER-olon-120.png',
    0
  ),
  (
    'Up',
    'up',
    'Positive and uplifting sentiment',
    '#4ECDC4',
    '/images/up-UP-olon-120.png',
    '/images/up-HOVER-olon-120.png',
    0
  ),
  (
    'Charm',
    'charm',
    'Captivating and engaging content',
    '#FFE66D',
    '/images/charm-UP-olon-120.png',
    '/images/charm-HOVER-olon-120.png',
    0
  ),
  (
    'Bottom',
    'bottom',
    'Foundational and grounded perspectives',
    '#95E1D3',
    '/images/bottom-UP-olon-120.png',
    '/images/bottom-HOVER-olon-120.png',
    0
  ),
  (
    'Down',
    'down',
    'Reflective and introspective content',
    '#A8DADC',
    '/images/down-UP-olon-120.png',
    '/images/down-HOVER-olon-120.png',
    0
  ),
  (
    'Strange',
    'strange',
    'Unique and unconventional perspectives',
    '#C77DFF',
    '/images/strange-UP-olon-120.png',
    '/images/strange-HOVER-olon-120.png',
    0
  )
ON CONFLICT (slug) 
DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  color = EXCLUDED.color,
  icon_up = EXCLUDED.icon_up,
  icon_hover = EXCLUDED.icon_hover;
