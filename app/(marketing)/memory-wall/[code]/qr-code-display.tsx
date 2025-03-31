import Image from "next/image"

interface QRCodeDisplayProps {
  qrCode: string
}

export default function QRCodeDisplay({ qrCode }: QRCodeDisplayProps) {
  return (
    <div className="absolute top-4 left-4 z-50 flex max-w-md items-center gap-4 rounded-lg bg-black/80 p-4">
      <div className="relative h-24 w-24">
        <Image src={qrCode || "/placeholder.svg"} alt="QR Code" fill className="object-contain" />
      </div>
      <p className="text-sm text-white">Scan the QR code to upload your images to this memory wall</p>
    </div>
  )
}

