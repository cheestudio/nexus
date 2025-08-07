import {useBlockProps} from "@wordpress/block-editor";

export default function Save({attributes}) {
  const {imageObject, name, title} = attributes;

  const blockProps = useBlockProps.save({
    className: "example-grid-item-block",
  });

  return (
    <div {...blockProps}>
      <figure>
        {imageObject ? (
          <img
            src={imageObject?.customSize}
            alt={imageObject?.alt || ""}
          />
        ) : (
          <img
            src="https://placehold.co/400x400?text=Placeholder"
            alt="Placeholder Image"
          />
        )}
      </figure>
      {name && <h3>{name}</h3>}
      {title && <p>{title}</p>}
    </div>
  );
}
