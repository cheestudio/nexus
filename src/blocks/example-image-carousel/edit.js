import {__} from "@wordpress/i18n";
import {useBlockProps, MediaUpload} from "@wordpress/block-editor";
import {Button} from "@wordpress/components";

export default function Edit({attributes, setAttributes}) {
  const blockProps = useBlockProps({
    className: "example-image-carousel-block",
  });

  const {images = []} = attributes;

  const removeImage = (imageToRemove) => {
    const newImages = images.filter((image) => image.id !== imageToRemove.id);
    setAttributes({images: newImages});
  };

  const displayImages = (images) =>
    images.map((image) => {
      const imgSrc = image?.sizes?.large?.url || image.url;
      return (
        <div
          className="image-container"
          key={image.id}
        >
          <img
            src={imgSrc}
            alt={image.alt || ""}
          />
          <div
            className="remove-item"
            onClick={() => removeImage(image)}
          >
            <span className="dashicons dashicons-trash"></span>
          </div>
          <div className="caption-text">{image.caption}</div>
        </div>
      );
    });

  return (
    <div {...blockProps}>
      <div className="grid">{displayImages(images)}</div>
      <MediaUpload
        onSelect={(selectedImages) => setAttributes({images: selectedImages})}
        type="image"
        multiple={true}
        gallery={true}
        value={images.map((img) => img.id)}
        render={({open}) => (
          <Button
            variant="primary"
            onClick={open}
          >
            {images.length === 0 ? "Add Images" : "Update Images"}
          </Button>
        )}
      />
    </div>
  );
}
