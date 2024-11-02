'use client';

import { memo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { ImageUploadProps } from '@/types/props';

export const ImageUpload = ({ onChange, value, folder = 'default' }: ImageUploadProps) => {
    const [imageUrl, setImageUrl] = useState<string>(value);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (file: File) => {
        try {
            setIsUploading(true);

            const response = await fetch('/api/cloudinary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folder }),
            });



            if (!response.ok) throw new Error('Failed to get upload credentials');

            const { signature, timestamp, cloudName, apiKey } = await response.json();

            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp.toString());
            formData.append('api_key', apiKey);
            formData.append('folder', folder);

            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            console.log(uploadResponse);

            if (!uploadResponse.ok) throw new Error('Upload failed');

            const uploadResult = await uploadResponse.json();
            const url = uploadResult.secure_url;

            setImageUrl(url);
            onChange(url);
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: "Upload failed",
                description: "Please try again",
                variant: "destructive",
                duration: 3000
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        setImageUrl('');
        onChange('');
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleUpload(file);
                        };
                        input.click();
                    }}
                    disabled={isUploading}
                >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                </Button>
                {imageUrl && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleRemove}
                        disabled={isUploading}
                    >
                        <X className="mr-2 h-4 w-4" />
                        Remove Image
                    </Button>
                )}
            </div>
            {imageUrl && (
                <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg">
                    <Image
                        src={imageUrl}
                        fill
                        className="object-cover"
                        alt="Uploaded image"
                    />
                </div>
            )}
        </div>
    );
};


export default memo(ImageUpload);