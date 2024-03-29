/**
 * WordPress dependencies
 */
import {
	DropdownMenu,
	MenuGroup,
	__experimentalHStack as HStack,
	__experimentalHeading as Heading,
	__experimentalText as Text,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { moreVertical } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import AddNewPattern from '../add-new-pattern';
import RenameCategoryMenuItem from './rename-category-menu-item';
import DeleteCategoryMenuItem from './delete-category-menu-item';
import usePatternCategories from '../sidebar-navigation-screen-patterns/use-pattern-categories';
import { TEMPLATE_PART_POST_TYPE, PATTERN_TYPES } from '../../utils/constants';

export default function PatternsHeader( {
	categoryId,
	type,
	titleId,
	descriptionId,
} ) {
	const { patternCategories } = usePatternCategories();
	const templatePartAreas = useSelect(
		( select ) =>
			select( editorStore ).__experimentalGetDefaultTemplatePartAreas(),
		[]
	);

	let title, description, patternCategory;
	if ( type === TEMPLATE_PART_POST_TYPE ) {
		const templatePartArea = templatePartAreas.find(
			( area ) => area.area === categoryId
		);
		title = templatePartArea?.label;
		description = templatePartArea?.description;
	} else if ( type === PATTERN_TYPES.theme ) {
		patternCategory = patternCategories.find(
			( category ) => category.name === categoryId
		);
		title = patternCategory?.label;
		description = patternCategory?.description;
	}

	if ( ! title ) return null;

	return (
		<VStack className="edit-site-patterns__section-header" gap={ 3 }>
			<HStack justify="space-between">
				<Heading as="h2" level={ 4 } id={ titleId }>
					{ title }
				</Heading>
				<HStack expanded={ false }>
					<AddNewPattern showTextButton />
					{ !! patternCategory?.id && (
						<DropdownMenu
							icon={ moreVertical }
							label={ __( 'Actions' ) }
							toggleProps={ {
								className: 'edit-site-patterns__button',
								describedBy: sprintf(
									/* translators: %s: pattern category name */
									__( 'Action menu for %s pattern category' ),
									title
								),
								size: 'compact',
							} }
						>
							{ ( { onClose } ) => (
								<MenuGroup>
									<RenameCategoryMenuItem
										category={ patternCategory }
										onClose={ onClose }
									/>
									<DeleteCategoryMenuItem
										category={ patternCategory }
										onClose={ onClose }
									/>
								</MenuGroup>
							) }
						</DropdownMenu>
					) }
				</HStack>
			</HStack>
			{ description ? (
				<Text variant="muted" as="p" id={ descriptionId }>
					{ description }
				</Text>
			) : null }
		</VStack>
	);
}
