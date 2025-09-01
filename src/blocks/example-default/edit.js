import {__} from "@wordpress/i18n";
import {useBlockProps, RichText} from "@wordpress/block-editor";

export default function Edit({attributes, setAttributes}) {
  const {text} = attributes;
  const blockProps = useBlockProps({
    className: "example-block",
  });

  return (
    <div {...blockProps}>
      <h1>Example Block: BACKEND</h1>
      <RichText
        tagName="h3"
        className="name"
        placeholder="Name"
        allowedFormats={[]}
        value={text}
        onChange={(value) => setAttributes({text: value})}
      />
    </div>
  );
}
