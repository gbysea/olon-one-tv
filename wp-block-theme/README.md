# OLON Sentiment TV — WordPress Block Theme

Installation (development)

1. Place the `wp-block-theme/` directory into your WordPress `wp-content/themes/` folder or activate from this repository when developing.
2. Add Bolt Database credentials to your `wp-config.php` (do NOT commit these values):

```php
// OLON Bolt Database configuration - add before "That's all, stop editing!"
define('BoltDatabase_URL', 'https://your-project.supabase.co');
define('BoltDatabase_ANON_KEY', 'your-anon-key-here');
// If you prefer the spaced keys used by some scripts:
define('Bolt_Database_URL', 'https://your-project.supabase.co');
define('Bolt_Database_ANON_KEY', 'your-anon-key-here');
```

3. Activate the theme and visit the front-end. Open DevTools to confirm `OLON_CONFIG` is present and assets load.

Notes
- Never commit real Bolt Database credentials to the repository.
- If you need a production key, configure it in your hosting environment (environment variables) and pass to WordPress securely.
