/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { closeSmall } from '@wordpress/icons';
import {
	useViewportMatch,
	__experimentalUseDialog as useDialog,
} from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editorStore } from '../../store';

export default function InserterSidebar( {
	closeGeneralSidebar,
	isRightSidebarOpen,
} ) {
	const { insertionPoint, showMostUsedBlocks } = useSelect( ( select ) => {
		const { getInsertionPoint } = unlock( select( editorStore ) );
		const { get } = select( preferencesStore );
		return {
			insertionPoint: getInsertionPoint(),
			showMostUsedBlocks: get( 'core', 'mostUsedBlocks' ),
		};
	}, [] );
	const { setIsInserterOpened } = useDispatch( editorStore );

	const isMobileViewport = useViewportMatch( 'medium', '<' );
	const [ inserterDialogRef, inserterDialogProps ] = useDialog( {
		onClose: () => setIsInserterOpened( false ),
		focusOnMount: true,
	} );

	const libraryRef = useRef();

	return (
		<div
			ref={ inserterDialogRef }
			{ ...inserterDialogProps }
			className="editor-inserter-sidebar"
		>
			<div className="editor-inserter-sidebar__header">
				<Button
					className="editor-inserter-sidebar__close-button"
					icon={ closeSmall }
					label={ __( 'Close block inserter' ) }
					onClick={ () => setIsInserterOpened( false ) }
					size="small"
				/>
			</div>
			<div className="editor-inserter-sidebar__content">
				<Library
					showMostUsedBlocks={ showMostUsedBlocks }
					showInserterHelpPanel
					shouldFocusBlock={ isMobileViewport }
					rootClientId={ insertionPoint.rootClientId }
					__experimentalInsertionIndex={
						insertionPoint.insertionIndex
					}
					__experimentalFilterValue={ insertionPoint.filterValue }
					__experimentalOnPatternCategorySelection={
						isRightSidebarOpen ? closeGeneralSidebar : undefined
					}
					ref={ libraryRef }
				/>
			</div>
		</div>
	);
}
