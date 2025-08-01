// Utility untuk upload gambar ke Cloudinary melalui API route
export const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Gagal mengupload gambar');
    }

    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Gagal mengupload gambar');
  }
};

// Utility untuk delete image dari Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const response = await fetch('/api/upload/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error('Gagal menghapus gambar');
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Gagal menghapus gambar');
  }
}; 