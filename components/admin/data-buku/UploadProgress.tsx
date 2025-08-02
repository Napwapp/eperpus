"use client";

import { Loader2 } from "lucide-react";

interface UploadProgressProps {
  isUploading: boolean;
  progress: number;
}

export default function UploadProgress({ isUploading, progress }: UploadProgressProps) {
  if (!isUploading) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Uploading Image</h3>
            <p className="text-sm text-gray-600">Please wait while we upload your image...</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-violet-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600 mt-2 text-center">
          {progress}% Complete
        </p>
      </div>
    </div>
  );
} 