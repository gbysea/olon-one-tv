<?php
/**
 * Fallback index.php for OLON block theme.
 *
 * This file provides a minimal PHP fallback loop so the front-end
 * shows content if block templates or the Query block render nothing
 * (for example, on a clean site with no posts or if template parsing
 * is not available). It's intentionally small and safe for block themes.
 */
defined( 'ABSPATH' ) || exit;
get_template_part( 'template-parts/header' );

if ( have_posts() ) :
    echo '<main class="site-main container">';
    while ( have_posts() ) : the_post();
        echo '<article id="post-' . get_the_ID() . '" class="post">';
        echo '<h2 class="post-title"><a href="' . esc_url( get_permalink() ) . '">' . get_the_title() . '</a></h2>';
        echo '<div class="post-excerpt">' . get_the_excerpt() . '</div>';
        echo '</article>';
    endwhile;
    echo '</main>';
else :
    echo '<main class="site-main container"><p>No posts found. Please create a post to display here.</p></main>';
endif;

get_template_part( 'template-parts/footer' );
