import type { PixelCrop } from 'react-image-crop'

export async function getCroppedImg(
    image: HTMLImageElement,
    crop: PixelCrop
): Promise<string> {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        throw new Error('No 2d context')
    }

    // 1. Calculate scaling (Screen Size vs Original Image Size)
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    // 2. Handle High DPI screens (Retina)
    const pixelRatio = window.devicePixelRatio
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'

    // 3. Calculate crop position relative to the original image
    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    // 4. Move the canvas origin to the top-left of the crop area
    ctx.save()
    ctx.translate(-cropX, -cropY)

    // 5. Draw the full image
    // (We translate the canvas so only the cropped part is visible)
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
    )

    ctx.restore()

    // 6. Output the result
    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file))
            } else {
                reject(new Error('Canvas is empty'))
            }
        }, 'image/jpeg')
    })
}