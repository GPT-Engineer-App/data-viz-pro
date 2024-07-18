import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import FilePreview from "@/components/FilePreview";

const ImportPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [verifiedHeaders, setVerifiedHeaders] = useState([]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleActiveFileChange = (file) => {
    setActiveFile(file);
  };

  const handleHeadersVerified = (headers) => {
    setVerifiedHeaders(headers);
    // You might want to pass these headers to your visualization component
  };

  return (
    <div className="flex h-full">
      <Sidebar onFileSelect={handleFileSelect} onActiveFileChange={handleActiveFileChange} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Data Import</h1>
        {selectedFile ? (
          <FilePreview file={selectedFile} onHeadersVerified={handleHeadersVerified} />
        ) : (
          <p>Select a file from the sidebar to preview and edit its content.</p>
        )}
      </div>
    </div>
  );
};

export default ImportPage;