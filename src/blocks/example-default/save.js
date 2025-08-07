import {useBlockProps} from "@wordpress/block-editor";

export default function Save({attributes}) {
  const {text} = attributes;

  const blockProps = useBlockProps.save({
    className: "example-block",
  });

  return (
    <div {...blockProps}>
      <h1>Example Block: FRONTEND</h1>
      <h3>{text}</h3>
    </div>
  );
}
