import { CroppedImage } from "./CroppedImage";
import { appImages } from "../assets/appImages";
import { imageCrops } from "../assets/imageCrops";

// Renders a named image-slot from the handoff's image map by id, with its
// exact designer crop applied automatically.
export function SlotImage({ id, alt = "", radius, className = "", style, imgStyle }) {
  const src = appImages[id];
  const crop = imageCrops[id] || { scale: 1, panX: 0, panY: 0 };
  if (!src) {
    console.warn(`SlotImage: no image found for id "${id}"`);
    return null;
  }
  return (
    <CroppedImage
      src={src}
      alt={alt}
      scale={crop.scale}
      panX={crop.panX}
      panY={crop.panY}
      radius={radius}
      className={className}
      style={style}
      imgStyle={imgStyle}
    />
  );
}
