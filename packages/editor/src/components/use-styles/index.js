/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const DEFAULT_STYLES = {};

export function useStyles() {
	const { styles, isReady } = useSelect( ( select ) => {
		const {
			getEditedEntityRecord,
			hasFinishedResolution,
			__experimentalGetCurrentGlobalStylesId,
		} = select( coreStore );

		const globalStylesId = __experimentalGetCurrentGlobalStylesId();
		const record = globalStylesId
			? getEditedEntityRecord( 'root', 'globalStyles', globalStylesId )
			: undefined;

		let hasResolved = false;
		if (
			hasFinishedResolution( '__experimentalGetCurrentGlobalStylesId' )
		) {
			hasResolved = globalStylesId
				? hasFinishedResolution( 'getEditedEntityRecord', [
						'root',
						'globalStyles',
						globalStylesId,
				  ] )
				: true;
		}

		return {
			isReady: hasResolved,
			styles: record?.styles,
		};
	}, [] );

	// Make sure to update styles when isReady changes.
	const config = useMemo( () => {
		return {
			styles: styles ?? DEFAULT_STYLES,
			isReady,
		};
	}, [ isReady, styles ] );

	return config;
}
