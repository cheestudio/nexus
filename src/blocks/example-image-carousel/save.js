import {useBlockProps} from "@wordpress/block-editor";

export default function Save({attributes}) {
  const {images = []} = attributes;

  const blockProps = useBlockProps.save({
    className: "example-image-carousel-block",
  });

  const displayImages = () =>
    images.map((image, index) => {
      const imgSrc = image?.sizes?.large?.url || image?.url;
      if (!imgSrc) return null;

      return (
        <div
          className="swiper-slide"
          key={image.id || index}
        >
          <img
            src={imgSrc}
            alt={image?.alt || ""}
            loading="lazy"
            width={image?.sizes?.large?.width || image?.width}
            height={image?.sizes?.large?.height || image?.height}
          />
        </div>
      );
    });

  const swiperButtons = () => (
    <div className="swiper-buttons">
      <div
        className="swiper-button prev"
        type="button"
        aria-label="Previous Slide"
      >
        <svg
          width="33"
          height="25"
          viewBox="0 0 33 25"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M32.324 10.7412H4.33383V14.3589H32.324V10.7412Z"
            fill="#000000"
          />
          <path
            d="M12.0979 24.6726L14.6272 22.1387L5.05502 12.551L14.6272 2.96331L12.0979 0.429443L-0.000171661 12.5511L12.0979 24.6726Z"
            fill="#000000"
          />
        </svg>
      </div>

      <div
        className="swiper-button next"
        type="button"
        aria-label="Next Slide"
      >
        <svg
          width="33"
          height="25"
          viewBox="0 0 33 25"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M0.38501 10.7195H28.3752V14.3371H0.38501V10.7195Z"
            fill="#000000"
          />
          <path
            d="M20.6111 24.6509L18.0818 22.117L27.654 12.5293L18.0818 2.94159L20.6111 0.407715L32.7092 12.5293L20.6111 24.6509Z"
            fill="#000000"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div {...blockProps}>
      <div className="swiper">
        <div className="swiper-wrapper">{displayImages()}</div>
        {images.length > 1 && swiperButtons()}
      </div>
    </div>
  );
}
