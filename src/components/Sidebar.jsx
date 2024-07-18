import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Eye } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const Sidebar = ({ onFileSelect, onActiveFileChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      content: file
    }));
    setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const removeFile = (fileName) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    if (activeFile && activeFile.name === fileName) {
      setActiveFile(null);
      onActiveFileChange(null);
    }
    toast.success(`File "${fileName}" removed`);
  };

  const handleActiveFileChange = (file) => {
    setActiveFile(file);
    onActiveFileChange(file);
  };

  return (
    <div className="w-64 border-r bg-background p-6 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Data Import</h2>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
          dragActive ? "border-primary" : "border-muted-foreground"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop your file here, or click to select
        </p>
        <Label htmlFor="file-upload" className="sr-only">
          Choose a file
        </Label>
        <Input
          id="file-upload"
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".csv,.xml,.json,.parquet"
          multiple
        />
        <Button
          variant="secondary"
          className="mt-4"
          onClick={onButtonClick}
        >
          Select File
        </Button>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Uploaded Files:</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border">
            <div className="p-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Checkbox
                    id={`file-${index}`}
                    checked={activeFile && activeFile.name === file.name}
                    onCheckedChange={() => handleActiveFileChange(file)}
                  />
                  <label
                    htmlFor={`file-${index}`}
                    className="text-sm truncate ml-2 flex-grow"
                  >
                    {file.name}
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onFileSelect(file)}
                      className="mr-1"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Sidebar;