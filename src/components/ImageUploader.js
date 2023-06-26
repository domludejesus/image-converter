import { useState } from 'react';
import sharp from 'sharp';
import potrace from 'potrace';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    // Convert image to webp format
    const convertedImageBuffer = await sharp(file)
      .webp()
      .toBuffer();

    // Upscale image
    const upscaledImageBuffer = await sharp(convertedImageBuffer)
      .resize(2 * width, 2 * height) // Example: upscale by doubling the width and height
      .toBuffer();

    // Convert image to vector format
    const trace = potrace.imagedata(upscaledImageBuffer);
    trace.process();
    const svgData = trace.getSVG();

    // Do something with the upscaled image buffer and SVG data
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
};

export default ImageUploader;
