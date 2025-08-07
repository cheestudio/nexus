import {MediaUpload, MediaUploadCheck} from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import {__} from "@wordpress/i18n";

export function ImageUpload({imageObject, onImageChange, onImageRemove, customSize = "1536x1536"}) {
  const handleImageChange = (media) => {
    const sizes = media.sizes || {};
    const imageUrl = sizes[customSize]?.url || sizes["1536x1536"]?.url || media.url; // custom image size with fallbacks
    onImageChange({
      ...media,
      customSize: imageUrl,
    });
  };

  return (
    <>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={handleImageChange}
          allowedTypes={["image"]}
          value={imageObject}
          render={({open}) => (
            <>
              {imageObject ? (
                <img
                  src={imageObject?.customSize}
                  alt={__("Selected image", "custom")}
                  onClick={open}
                  style={{cursor: "pointer", maxWidth: "100%"}}
                  aria-label={__("Click to replace image", "custom")}
                />
              ) : (
                <Button
                  onClick={open}
                  variant="secondary"
                  aria-label={__("Set image", "custom")}
                >
                  {__("Set image", "custom")}
                </Button>
              )}
            </>
          )}
        />
      </MediaUploadCheck>

      {imageObject && (
        <Button
          onClick={onImageRemove}
          variant="link"
          isDestructive
          aria-label={__("Remove image", "custom")}
        >
          {__("Remove image", "custom")}
        </Button>
      )}
    </>
  );
}
