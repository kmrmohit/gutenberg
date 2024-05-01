/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';
import { __unstableMotion as motion } from '@wordpress/components';
import { store as preferencesStore } from '@wordpress/preferences';
import { useState } from '@wordpress/element';
import { PinnedItems } from '@wordpress/interface';

/**
 * Internal dependencies
 */
import CollapsableBlockToolbar from '../collapsible-block-toolbar';
import DocumentBar from '../document-bar';
import DocumentTools from '../document-tools';
import PostPreviewButton from '../post-preview-button';
import PostSavedState from '../post-saved-state';
import PostViewLink from '../post-view-link';
import PreviewDropdown from '../preview-dropdown';
import MoreMenu from '../more-menu';
import PostPublishButtonOrToggle from '../post-publish-button/post-publish-button-or-toggle';

import { store as editorStore } from '../../store';

const slideY = {
	hidden: { y: '-50px' },
	distractionFreeInactive: { y: 0 },
	hover: { y: 0, transition: { type: 'tween', delay: 0.2 } },
};

function Header( {
	customSaveButton,
	forceIsDirty,
	setEntitiesSavedStatesCallback,
	children,
} ) {
	const isWideViewport = useViewportMatch( 'large' );
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		isTextEditor,
		isPublishSidebarOpened,
		showIconLabels,
		hasFixedToolbar,
	} = useSelect( ( select ) => {
		const { get: getPreference } = select( preferencesStore );
		const { getEditorMode } = select( editorStore );

		return {
			isTextEditor: getEditorMode() === 'text',
			isPublishSidebarOpened:
				select( editorStore ).isPublishSidebarOpened(),
			showIconLabels: getPreference( 'core', 'showIconLabels' ),
			hasFixedToolbar: getPreference( 'core', 'fixedToolbar' ),
		};
	}, [] );

	const hasTopToolbar = isLargeViewport && hasFixedToolbar;

	const [ isBlockToolsCollapsed, setIsBlockToolsCollapsed ] =
		useState( true );

	// The edit-post-header classname is only kept for backward compatibilty
	// as some plugins might be relying on its presence.
	return (
		<div className="editor-header edit-post-header">
			{ children }
			<motion.div
				variants={ slideY }
				transition={ { type: 'tween', delay: 0.8 } }
				className="editor-header__toolbar"
			>
				<DocumentTools disableBlockTools={ isTextEditor } />
				{ hasTopToolbar && (
					<CollapsableBlockToolbar
						isCollapsed={ isBlockToolsCollapsed }
						onToggle={ setIsBlockToolsCollapsed }
					/>
				) }
				<div
					className={ classnames( 'editor-header__center', {
						'is-collapsed':
							! isBlockToolsCollapsed && hasTopToolbar,
					} ) }
				>
					<DocumentBar />
				</div>
			</motion.div>
			<motion.div
				variants={ slideY }
				transition={ { type: 'tween', delay: 0.8 } }
				className="editor-header__settings"
			>
				{ ! customSaveButton && ! isPublishSidebarOpened && (
					// This button isn't completely hidden by the publish sidebar.
					// We can't hide the whole toolbar when the publish sidebar is open because
					// we want to prevent mounting/unmounting the PostPublishButtonOrToggle DOM node.
					// We track that DOM node to return focus to the PostPublishButtonOrToggle
					// when the publish sidebar has been closed.
					<PostSavedState forceIsDirty={ forceIsDirty } />
				) }
				<PreviewDropdown forceIsAutosaveable={ forceIsDirty } />
				<PostPreviewButton
					className="editor-header__post-preview-button"
					forceIsAutosaveable={ forceIsDirty }
				/>
				<PostViewLink />
				{ ! customSaveButton && (
					<PostPublishButtonOrToggle
						forceIsDirty={ forceIsDirty }
						setEntitiesSavedStatesCallback={
							setEntitiesSavedStatesCallback
						}
					/>
				) }
				{ customSaveButton }
				{ ( isWideViewport || ! showIconLabels ) && (
					<PinnedItems.Slot scope="core" />
				) }
				<MoreMenu />
			</motion.div>
		</div>
	);
}

export default Header;
