/**
 * WordPress dependencies
 */
import { ResizableBox } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { __unstableUseBlockElement as useBlockElement } from '../block-list/use-block-props/use-block-refs';
import BlockPopoverCover from '../block-popover/cover';
import { getComputedCSS } from './utils';

export function GridItemResizer( { clientId, onChange } ) {
	const blockElement = useBlockElement( clientId );
	const rootBlockElement = blockElement?.parentElement;
	const [ resizeDirection, setResizeDirection ] = useState( null );

	/*
	 * Resizer dummy is an empty div that exists only so we can
	 * get the bounding client rect of the resizer element. This is
	 * necessary because the resizer exists outside of the iframe, so
	 * its bounding client rect isn't the same as the block element's.
	 */
	const resizerDummyRef = useRef( null );

	if ( ! blockElement ) {
		return null;
	}

	const justification = {
		right: 'flex-start',
		left: 'flex-end',
	};

	const alignment = {
		top: 'flex-end',
		bottom: 'flex-start',
	};

	const styles = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		...( justification[ resizeDirection ] && {
			justifyContent: justification[ resizeDirection ],
		} ),
		...( alignment[ resizeDirection ] && {
			alignItems: alignment[ resizeDirection ],
		} ),
	};

	const blockClientRect = blockElement.getBoundingClientRect();
	const rootBlockClientRect = rootBlockElement.getBoundingClientRect();

	/*
	 * The bounding element is equivalent to the root block element, but
	 * its bounding client rect is modified to account for the resizer
	 * being outside of the editor iframe.
	 */
	const boundingElement = {
		offsetWidth: rootBlockElement.offsetWidth,
		offsetHeight: rootBlockElement.offsetHeight,
		getBoundingClientRect: () => {
			const resizerTop =
				resizerDummyRef.current?.getBoundingClientRect()?.top;
			// Fallback value of 60 to account for editor top bar height.
			const heightDifference = resizerTop
				? resizerTop - blockClientRect.top
				: 60;
			return {
				bottom: rootBlockClientRect.bottom + heightDifference,
				height: rootBlockElement.offsetHeight,
				left: rootBlockClientRect.left,
				right: rootBlockClientRect.right,
				top: rootBlockClientRect.top + heightDifference,
				width: rootBlockClientRect.width,
				x: rootBlockClientRect.x,
				y: rootBlockClientRect.y + heightDifference,
			};
		},
	};

	/*
	 * Only enable resizing to a side if that side is not on the
	 * edge of the grid.
	 */
	const enableTop = blockClientRect.top > rootBlockClientRect.top;
	const enableBottom = blockClientRect.bottom < rootBlockClientRect.bottom;
	const enableLeft = blockClientRect.left > rootBlockClientRect.left;
	const enableRight = blockClientRect.right < rootBlockClientRect.right;

	return (
		<BlockPopoverCover
			className="block-editor-grid-item-resizer"
			clientId={ clientId }
			__unstablePopoverSlot="block-toolbar"
			additionalStyles={ styles }
		>
			<ResizableBox
				className="block-editor-grid-item-resizer__box"
				size={ {
					width: '100%',
					height: '100%',
				} }
				enable={ {
					bottom: enableBottom,
					bottomLeft: false,
					bottomRight: false,
					left: enableLeft,
					right: enableRight,
					top: enableTop,
					topLeft: false,
					topRight: false,
				} }
				bounds={ boundingElement }
				boundsByDirection
				onResizeStart={ ( event, direction ) => {
					/*
					 * The container justification and alignment need to be set
					 * according to the direction the resizer is being dragged in,
					 * so that it resizes in the right direction.
					 */
					setResizeDirection( direction );

					/*
					 * The mouseup event on the resize handle doesn't trigger if the mouse
					 * isn't directly above the handle, so we try to detect if it happens
					 * outside the grid and dispatch a mouseup event on the handle.
					 */
					const rootElementParent = rootBlockElement.parentElement;
					rootElementParent.addEventListener(
						'mouseup',
						() => {
							event.target.dispatchEvent(
								new Event( 'mouseup', { bubbles: true } )
							);
						},
						true
					);
				} }
				onResizeStop={ ( event, direction, boxElement ) => {
					const gridElement = blockElement.parentElement;
					const columnGap = parseFloat(
						getComputedCSS( gridElement, 'column-gap' )
					);
					const rowGap = parseFloat(
						getComputedCSS( gridElement, 'row-gap' )
					);
					const gridColumnLines = getGridLines(
						getComputedCSS( gridElement, 'grid-template-columns' ),
						columnGap
					);
					const gridRowLines = getGridLines(
						getComputedCSS( gridElement, 'grid-template-rows' ),
						rowGap
					);
					const columnStart = getClosestLine(
						gridColumnLines,
						blockElement.offsetLeft + boxElement.offsetLeft
					);
					const rowStart = getClosestLine(
						gridRowLines,
						blockElement.offsetTop + boxElement.offsetTop
					);
					const columnEnd = getClosestLine(
						gridColumnLines,
						blockElement.offsetLeft + boxElement.offsetWidth
					);
					const rowEnd = getClosestLine(
						gridRowLines,
						blockElement.offsetTop +
							( boxElement.offsetHeight + boxElement.offsetTop )
					);
					onChange( {
						columnSpan: Math.max( columnEnd - columnStart, 1 ),
						rowSpan: Math.max( rowEnd - rowStart, 1 ),
					} );
				} }
			/>
			<div
				className="block-editor-grid-item-resizer__dummy"
				ref={ resizerDummyRef }
			></div>
		</BlockPopoverCover>
	);
}

function getGridLines( template, gap ) {
	const lines = [ 0 ];
	for ( const size of template.split( ' ' ) ) {
		const line = parseFloat( size );
		lines.push( lines[ lines.length - 1 ] + line + gap );
	}
	return lines;
}

function getClosestLine( lines, position ) {
	return lines.reduce(
		( closest, line, index ) =>
			Math.abs( line - position ) <
			Math.abs( lines[ closest ] - position )
				? index
				: closest,
		0
	);
}
