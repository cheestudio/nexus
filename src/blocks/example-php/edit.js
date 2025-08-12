import {__} from "@wordpress/i18n";
import {useBlockProps} from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";

export default function Edit({attributes, setAttributes}) {
  const {test} = attributes;
  const blockProps = useBlockProps({
    className: "example-php-block",
  });

  return (
    <div {...blockProps}>
      <ServerSideRender
        block="chee/example-php"
        attributes={attributes}
      />
    </div>
  );
}
