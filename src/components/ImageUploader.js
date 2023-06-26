import { useState } from 'react';
import sharp from 'sharp';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    // Convert image to webp format
    const convertedImageBuffer = await sharp(file)
      .webp()
      .toBuffer();

    // Do something with the converted image buffer
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
};

export default ImageUploader;
