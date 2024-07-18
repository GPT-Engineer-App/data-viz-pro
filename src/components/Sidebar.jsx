import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const Sidebar = () => {
  const [dragActive, setDragActive] = useState(false);
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
    // Handle file upload
    console.log("Files selected:", files);
    toast.success(`File "${files[0].name}" selected successfully`);
    // Here you would typically start the upload process
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-64 border-r bg-background p-6">
      <h2 className="text-lg font-semibold mb-4">Data Import</h2>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
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
        />
        <Button
          variant="secondary"
          className="mt-4"
          onClick={onButtonClick}
        >
          Select File
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;