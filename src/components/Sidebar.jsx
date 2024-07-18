import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
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
    const newFiles = Array.from(files).map(file => file.name);
    setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const removeFile = (fileName) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file !== fileName));
    toast.success(`File "${fileName}" removed`);
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
              {uploadedFiles.map((fileName, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span className="text-sm truncate mr-2">{fileName}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(fileName)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
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