// Register custom block styles and unregister core styles
import './backend/registerBlockStyles';

// Unregister blocks
import './backend/unregisterBlocks';

// If a button has a url and placeholder but no text, set the placeholder as the text on save
import './backend/setButtonTextFallbackToPlaceholder';

// Add a max-width setting to paragraphs and headings
import './backend/attributeMaxWidth';

// Add an icon dropdown to paragraphs
import './backend/attributeParagraphIcon';

// Add an icon attribute to lists and buttons
import './backend/attributeIcon';