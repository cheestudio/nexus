/* Usage:

"attributes": {
  ...,
  "imageObject": {
    "type": "object"
  }
}

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

<ImageUpload
  imageObject={imageObject}
  onImageChange={handleImageChange}
  onImageRemove={handleImageRemove}
  customSize="large"
/>

FocalPoint is property of imageObject:

const blockProps = useBlockProps({
		className: 'BLOCKNAME alignfull',
		style: {
			'--bg-image': imageObject?.customSize
				? `url('${imageObject.customSize}')`
				: undefined,
			'--bg-position': `${(imageObject?.focalPoint?.x ?? 0.5) * 100}% ${(imageObject?.focalPoint?.y ?? 0.5) * 100}%`,
		},
	});

*/

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, FocalPointPicker, BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export function ImageUpload({ imageObject, onImageChange, onImageRemove, customSize = '1536x1536' }) {

  const handleImageChange = (media) => {
    const sizes = media.sizes || {};
    const imageUrl = sizes[customSize]?.url || sizes['1536x1536']?.url || media.url;
    onImageChange({
      ...media,
      customSize: imageUrl,
      focalPoint: imageObject?.focalPoint || { x: 0.5, y: 0.5 },
    });
  };

  const handleFocalPointChange = (newFocalPoint) => {
    onImageChange({
      ...imageObject,
      focalPoint: newFocalPoint,
    });
  };

  return (
    <>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={handleImageChange}
          allowedTypes={['image']}
          value={imageObject}
          render={({ open }) => (
            <>
              {imageObject ? (
                <>
                  <BaseControl label={__('Focal Point', 'custom')}>
                    <FocalPointPicker
                      url={imageObject?.customSize}
                      value={imageObject?.focalPoint || { x: 0.5, y: 0.5 }}
                      onDragStart={handleFocalPointChange}
                      onDrag={handleFocalPointChange}
                      onChange={handleFocalPointChange}
                      aria-label={__('Adjust focal point', 'custom')}
                      style={{ marginBottom: '25px' }}
                    />
                  </BaseControl>
                  <Button
                    onClick={open}
                    variant="secondary"
                    aria-label={__('Replace image', 'custom')}
                    style={{ marginRight: '10px' }}
                  >
                    {__('Replace image', 'custom')}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={open}
                  variant="secondary"
                  aria-label={__('Set image', 'custom')}
                >
                  {__('Set image', 'custom')}
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
          aria-label={__('Remove image', 'custom')}
        >
          {__('Remove image', 'custom')}
        </Button>
      )}
    </>
  );
};
