import sharp from 'sharp';
import potrace from 'potrace';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { image } = req.body;

    // Convert image to webp format
    const convertedImageBuffer = await sharp(Buffer.from(image, 'base64'))
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

    res.status(200).json({ svgData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
