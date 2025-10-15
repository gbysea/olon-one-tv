<?php
// Enqueue frontend styles
function olon_block_theme_enqueue() {
    wp_enqueue_style('olon-style', get_stylesheet_directory_uri() . '/styles/style.css', array(), '1.0');
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
