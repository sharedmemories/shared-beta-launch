'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface MediaUploadProps {
  eventCode: string;
  galleries: {
    id: string;
    name: string;
  }[];
  preselectedGalleryId?: string;
  lockGallerySelection?: boolean;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  preview?: string;
  selected: boolean;
  description?: string;
}

export function MediaUpload({
  eventCode,
  galleries,
  preselectedGalleryId,
  lockGallerySelection = false,
}: MediaUploadProps) {
  const [selectedGallery, setSelectedGallery] = useState<string>(
    preselectedGalleryId || ''
  );
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: 'pending' as const,
      preview: URL.createObjectURL(file),
      selected: true,
    }));

    setUploadingFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    disabled: isUploading,
  });

  const toggleFileSelection = (fileId: string) => {
    setUploadingFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      )
    );
  };

  const clearFiles = () => {
    uploadingFiles.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setUploadingFiles([]);
  };

  const handleUpload = async () => {
    if (!selectedGallery) {
      toast.warning('Please select a gallery first');
      return;
    }

    const selectedFiles = uploadingFiles.filter((file) => file.selected);
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file to upload');
      return;
    }

    setIsUploading(true);

    try {
      for (const file of selectedFiles) {
        if (file.status !== 'pending') continue;

        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: 'uploading' } : f
          )
        );

        const response = await fetch(`/api/aws/upload/${eventCode}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.file.name,
            contentType: file.file.type,
            size: file.file.size,
            galleryId: selectedGallery,
            description: file.description,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get upload URL');
        }

        const { presignedUrl } = await response.json();

        // Use a FormData approach to upload through our own API
        const formData = new FormData();
        formData.append('file', file.file);

        const uploadResponse = await fetch(
          `/api/aws/proxy-upload?url=${encodeURIComponent(presignedUrl)}`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error(
            'Upload failed:',
            errorText,
            'Status:',
            uploadResponse.status
          );
          throw new Error(
            `Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`
          );
        }

        // Add a small delay to ensure S3 consistency
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: 'complete', progress: 100 } : f
          )
        );
      }

      toast.success('Files uploaded successfully');

      clearFiles();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload Media</CardTitle>
          <CardDescription>
            Choose a gallery and upload your photos and videos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedGallery}
            onValueChange={setSelectedGallery}
            disabled={
              isUploading || (lockGallerySelection && galleries.length === 1)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a gallery" />
            </SelectTrigger>
            <SelectContent>
              {galleries.map((gallery) => (
                <SelectItem key={gallery.id} value={gallery.id}>
                  {gallery.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div
            {...getRootProps()}
            className={cn(
              'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/25 hover:border-primary/50',
              isUploading && 'pointer-events-none opacity-50'
            )}
          >
            <input {...getInputProps()} />
            <Upload className="text-muted-foreground mx-auto h-8 w-8" />
            <p className="text-muted-foreground mt-2 text-sm">
              {isDragActive
                ? 'Drop your files here'
                : 'Drag & drop files here, or click to select'}
            </p>
          </div>

          {uploadingFiles.length > 0 && (
            <>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {uploadingFiles.map((file) => (
                    <div
                      key={file.id}
                      className="group relative aspect-square overflow-hidden rounded-lg"
                    >
                      {file.file.type.includes('image') ? (
                        <img
                          src={file.preview}
                          alt={file.file.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video
                          src={file.preview}
                          className="h-full w-full object-cover"
                          controls
                        />
                      )}
                      <button
                        onClick={() => toggleFileSelection(file.id)}
                        className={cn(
                          'absolute top-2 left-2 rounded-full p-1 transition-colors',
                          file.selected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background/80 text-muted-foreground'
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      {file.status === 'uploading' && (
                        <div className="bg-background/80 absolute inset-0 flex items-center justify-center">
                          <Progress value={file.progress} className="w-3/4" />
                        </div>
                      )}
                      <div className="bg-background/80 absolute right-0 bottom-0 left-0 p-2">
                        <input
                          type="text"
                          placeholder="Add a description..."
                          value={file.description || ''}
                          onChange={(e) => {
                            setUploadingFiles((prev) =>
                              prev.map((f) =>
                                f.id === file.id
                                  ? { ...f, description: e.target.value }
                                  : f
                              )
                            );
                          }}
                          className="w-full border-none bg-transparent text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={clearFiles}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Upload Selected'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
