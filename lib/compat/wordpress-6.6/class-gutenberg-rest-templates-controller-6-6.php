<?php
/**
 * REST API: Gutenberg_REST_Templates_Controller_6_6 class
 *
 * @package    gutenberg
 */

/**
 * Gutenberg_REST_Templates_Controller_6_6 class
 *
 * Templates and template parts currently only allow access to administrators with the
 * `edit_theme_options` capability. In order to allow other roles to also view the templates,
 * we need to override the permissions check for the REST API endpoints.
 */
class Gutenberg_REST_Templates_Controller_6_6 extends Gutenberg_REST_Templates_Controller_6_4 {

	/**
	 * Checks if a given request has access to read templates.
	 *
	 * @since 6.6
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) { // phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		if ( current_user_can( 'edit_posts' ) ) {
			return true;
		}
		foreach ( get_post_types( array( 'show_in_rest' => true ), 'objects' ) as $post_type ) {
			if ( current_user_can( $post_type->cap->edit_posts ) ) {
				return true;
			}
		}

		return new WP_Error(
			'rest_cannot_manage_templates',
			__( 'Sorry, you are not allowed to access the templates on this site.', 'default' ),
			array(
				'status' => rest_authorization_required_code(),
			)
		);
	}

	/**
	 * Checks if a given request has access to read templates.
	 *
	 * @since 6.6
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
	 */
	public function get_item_permissions_check( $request ) { // phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		if ( current_user_can( 'edit_posts' ) ) {
			return true;
		}
		foreach ( get_post_types( array( 'show_in_rest' => true ), 'objects' ) as $post_type ) {
			if ( current_user_can( $post_type->cap->edit_posts ) ) {
				return true;
			}
		}

		return new WP_Error(
			'rest_cannot_manage_templates',
			__( 'Sorry, you are not allowed to access the templates on this site.', 'default' ),
			array(
				'status' => rest_authorization_required_code(),
			)
		);
	}

	/**
	 * Returns the fallback template for the given slug.
	 *
	 * @since 6.1.0
	 *
	 * @param WP_REST_Request $request The request instance.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_template_fallback( $request ) {
		$hierarchy = gutenberg_get_template_hierarchy( $request['slug'], $request['is_custom'], $request['template_prefix'] );

		do {
			$fallback_template = resolve_block_template( $request['slug'], $hierarchy, '' );
			array_shift( $hierarchy );
		} while ( ! empty( $hierarchy ) && empty( $fallback_template->content ) );

		if ( ! $fallback_template ) {
			return new WP_Error( 'rest_template_not_found', __( 'No fallback templates exist for that slug.', 'default' ), array( 'status' => 404 ) );
		}

		$response = $this->prepare_item_for_response( $fallback_template, $request );

		return rest_ensure_response( $response );
	}
}
