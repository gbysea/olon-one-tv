
# olon-one-tv WordPress Theme

Bolt Database Setup

This theme requires a Bolt Database project with the following tables and fields:

- categories (id, name, slug, description, icon_up, icon_hover)
- posts (id, title, content, category_id, created_at)

Ensure proper RLS policies and anon/public keys are configured.

Features

- 6 Quantum Categories: TOP, UP, CHARM, STRANGE, DOWN, BOTTOM
- Interactive Aura Effects: Hover states with particle icons
- Bolt Database Backend: Real-time data synchronization
- Block Theme: Full Site Editing support
- Responsive Design: Mobile-first approach

File Structure

```
wordpress-theme/
├── functions.php          # Theme setup & Bolt Database integration
├── theme.json            # Theme configuration & colors
├── style.css             # Theme metadata
├── templates/            # Block templates
│   ├── index.html
│   ├── single.html
│   └── archive.html
├── parts/                # Template parts
│   ├── header.html
│   └── footer.html
└── assets/
	├── css/              # Stylesheets
	├── js/               # JavaScript (Bolt Database client)
	└── images/           # 12 category PNGs
```

Support

For issues or questions, open an issue on GitHub.

License

MIT License - See LICENSE file for details
