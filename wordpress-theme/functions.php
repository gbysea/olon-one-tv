<?php
// Enqueue frontend styles
function olon_block_theme_enqueue() {
    // Theme styles
    wp_enqueue_style('olon-variables', get_template_directory_uri() . '/assets/css/variables.css', array(), '1.0');
    wp_enqueue_style('olon-base', get_template_directory_uri() . '/assets/css/base.css', array('olon-variables'), '1.0');
    wp_enqueue_style('olon-components', get_template_directory_uri() . '/assets/css/components.css', array('olon-base'), '1.0');
    wp_enqueue_style('olon-aura', get_template_directory_uri() . '/assets/css/aura.css', array('olon-components'), '1.0');
    wp_enqueue_style('olon-style', get_stylesheet_directory_uri() . '/styles/style.css', array('olon-aura'), '1.0');

    // JS modules: load the Bolt DB client and app entry and small UI modules
    wp_enqueue_script('olon-supabase-cdn', 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm', array(), null, true);
    wp_enqueue_script('olon-bolt-client', get_template_directory_uri() . '/assets/js/bolt-database-client.js', array(), null, true);
    wp_enqueue_script('olon-header-logo', get_template_directory_uri() . '/assets/js/header-logo.js', array(), null, true);
    wp_enqueue_script('olon-aura', get_template_directory_uri() . '/assets/js/aura.js', array(), null, true);
    wp_enqueue_script('olon-main', get_template_directory_uri() . '/assets/js/main.js', array('olon-bolt-client','olon-header-logo','olon-aura'), null, true);

    // Localize Bolt Database config into JS using canonical Option A env names (no spaces).
    $bolt_url = getenv('VITE_BoltDatabase_URL') ?: '';
    $bolt_key = getenv('VITE_BoltDatabase_ANON_KEY') ?: '';

    wp_localize_script('olon-main', 'OLON_CONFIG', array(
        'VITE_BoltDatabase_URL' => $bolt_url,
        'VITE_BoltDatabase_ANON_KEY' => $bolt_key,
        'themeUrl' => get_template_directory_uri()
    ));

    // Ensure the olon-* scripts are loaded as modules (add type="module")
    add_filter('script_loader_tag', function($tag, $handle, $src) {
        $module_handles = array('olon-main','olon-header-logo','olon-aura','olon-bolt-client');
        if ( in_array($handle, $module_handles, true) ) {
            $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }, 10, 3);
}
add_action('wp_enqueue_scripts', 'olon_block_theme_enqueue');

// Editor styles
function olon_block_theme_editor_styles() {
    add_theme_support('editor-styles');
    add_editor_style('styles/style.css');
}
add_action('after_setup_theme', 'olon_block_theme_editor_styles');

// Support wide alignment and responsive embeds
add_theme_support('align-wide');
add_theme_support('responsive-embeds');

// Custom rewrite rules for friendly URLs: /category/{slug} and /post/{slug}
function olon_custom_rewrite_rules() {
    add_rewrite_rule('^category/([^/]+)/?$', 'index.php?olon_category=$matches[1]', 'top');
    add_rewrite_rule('^post/([^/]+)/?$', 'index.php?olon_post=$matches[1]', 'top');
}
add_action('init', 'olon_custom_rewrite_rules');

function olon_query_vars($vars) {
    $vars[] = 'olon_category';
    $vars[] = 'olon_post';
    return $vars;
}
add_filter('query_vars', 'olon_query_vars');

function olon_template_include($template) {
    $cat = get_query_var('olon_category');
    $post = get_query_var('olon_post');
    if ( $cat ) {
        $file = get_template_directory() . '/templates/archive.html';
        if ( file_exists( $file ) ) return $file;
    }
    if ( $post ) {
        $file = get_template_directory() . '/templates/single.html';
        if ( file_exists( $file ) ) return $file;
    }
    return $template;
}
add_filter('template_include', 'olon_template_include');

// Register block patterns found in wp-block-theme/patterns/
function olon_register_patterns() {
    $patterns_dir = get_template_directory() . '/patterns';
    if ( ! is_dir( $patterns_dir ) ) {
        return;
    }

    foreach ( glob( $patterns_dir . '/*.html' ) as $file ) {
        $slug = 'olon/' . basename( $file, '.html' );
        $content = file_get_contents( $file );
        if ( $content ) {
            register_block_pattern( $slug, array(
                'title' => ucwords(str_replace('-', ' ', basename($file, '.html'))),
                'content' => $content,
            ) );
        }
    }
}
add_action( 'init', 'olon_register_patterns' );

// Debug: show active template in footer for admins (temporary - remove after testing)
// Debug footer snippet removed for production release (v1.0.0)
