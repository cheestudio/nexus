import {__} from "@wordpress/i18n";
import {useBlockProps} from "@wordpress/block-editor";

export default function Edit({attributes, setAttributes}) {
  const {test} = attributes;
  const blockProps = useBlockProps({
    className: "example-php-block",
  });

  return (
    <div {...blockProps}>
      <h1>Example PHP Block: BACKEND</h1>
    </div>
  );
}
