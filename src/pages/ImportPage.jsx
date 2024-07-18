import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import FilePreview from "@/components/FilePreview";

const ImportPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="flex h-full">
      <Sidebar onFileSelect={handleFileSelect} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Data Import</h1>
        {selectedFile ? (
          <FilePreview file={selectedFile} />
        ) : (
          <p>Select a file from the sidebar to preview and edit its content.</p>
        )}
      </div>
    </div>
  );
};

export default ImportPage;