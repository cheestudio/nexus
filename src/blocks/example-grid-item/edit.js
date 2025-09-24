import {__} from "@wordpress/i18n";
import {useBlockProps, InspectorControls, RichText} from "@wordpress/block-editor";
import {Panel, PanelBody, BaseControl} from "@wordpress/components";
import {ImageUpload} from "../../js/lib/ImageUpload";

export default function Edit({attributes, setAttributes}) {
  const {imageObject, name, title} = attributes;
  const handleImageChange = (newImageData) => {
    setAttributes({
      imageObject: newImageData,
    });
  };
  const handleImageRemove = () => {
    setAttributes({
      imageObject: undefined,
    });
  };
  const blockProps = useBlockProps({
    className: "example-grid-item-block",
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <Panel>
          <PanelBody
            title={__("Title Here", "chee")}
            initialOpen={true}
          >
            <BaseControl>
              <BaseControl.VisualLabel>{__("Image", "chee")}</BaseControl.VisualLabel>
              <ImageUpload
                imageObject={imageObject}
                onImageChange={handleImageChange}
                onImageRemove={handleImageRemove}
                customSize="large"
              />
            </BaseControl>
          </PanelBody>
        </Panel>
      </InspectorControls>

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
      <RichText
        tagName="h3"
        className="name"
        placeholder="Name"
        allowedFormats={[]}
        value={name}
        onChange={(value) => setAttributes({name: value})}
      />
      <RichText
        tagName="p"
        className="title"
        placeholder="Title / Position"
        value={title}
        onChange={(value) => setAttributes({title: value})}
      />
    </div>
  );
}
