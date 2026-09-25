// Renders an image-slot image with the exact crop the designer set in Claude
// Design (scale + pan%, from the handoff README's image map), the same way
// image-slot.js itself composites it: object-fit cover, then an extra
// transform: scale(s) translate(x%, y%).
export function CroppedImage({ src, alt = "", scale = 1, panX = 0, panY = 0, radius, className = "", style, imgStyle }) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: radius,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${panX}%, ${panY}%)`,
          display: "block",
          ...imgStyle,
        }}
      />
    </div>
  );
}
