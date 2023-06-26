import { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const imageData = reader.result.replace('data:image/jpeg;base64,', '');

      try {
        const response = await axios.post('/api/upload', { image: imageData });
        // Handle the response and do something with the SVG data
        console.log(response.data.svgData);
      } catch (error) {
        console.error(error);
      }
    };
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
};

export default ImageUploader;
