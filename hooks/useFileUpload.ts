import { useState } from "react"

export const useFileUpload = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleImageUpload = (file: File) => {
        setImageInfo(file)
    }

    const setImageInfo = async (file: File) => {
        if (!file) return

        const reader = new FileReader()
        const img = new Image()

        reader.onload = () => {
            img.onload = () => {
                img.src = reader.result as string
            }

            setImageUrl(reader.result as string)
            setImageFile(file)
        }

        reader.readAsDataURL(file)
    }

    const handleImageDelete = () => {
        setImageFile(null)
        setImageUrl(null)
    }

    return {
        imageFile,
        imageUrl,
        handleImageUpload,
        handleImageDelete
    }
}
