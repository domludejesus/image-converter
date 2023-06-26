import ImageUploader from '@/components/ImageUploader'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <h1> Image Converter </h1>
      <ImageUploader />
    </main>
  )
}
