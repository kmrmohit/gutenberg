/**
 * WordPress dependencies
 */
import { ResizableBox } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { __unstableUseBlockElement as useBlockElement } from '../block-list/use-block-props/use-block-refs';
import BlockPopoverCover from '../block-popover/cover';
import { getComputedCSS } from './utils';

export function GridItemResizer( { clientId, onChange } ) {
	const blockElement = useBlockElement( clientId );
	const rootBlockElement = blockElement.parentElement;
	const [ resizeDirection, setResizeDirection ] = useState( null );

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

	const gridHeight = rootBlockElement.offsetHeight;
	const blockMinHeight = blockElement.offsetHeight;

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
					bottom: true,
					bottomLeft: false,
					bottomRight: false,
					left: true,
					right: true,
					top: true,
					topLeft: false,
					topRight: false,
				} }
				bounds={ rootBlockElement }
				boundsByDirection
				maxHeight={ gridHeight }
				minHeight={ blockMinHeight }
				onResizeStart={ ( event, direction ) => {
					setResizeDirection( direction );
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
						blockElement.offsetLeft
					);
					const rowStart = getClosestLine(
						gridRowLines,
						blockElement.offsetTop
					);
					const columnEnd = getClosestLine(
						gridColumnLines,
						blockElement.offsetLeft + boxElement.offsetWidth
					);
					const rowEnd = getClosestLine(
						gridRowLines,
						blockElement.offsetTop + boxElement.offsetHeight
					);
					onChange( {
						columnSpan: Math.max( columnEnd - columnStart, 1 ),
						rowSpan: Math.max( rowEnd - rowStart, 1 ),
					} );
				} }
			/>
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
