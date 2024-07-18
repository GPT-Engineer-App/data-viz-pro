import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const FilePreview = ({ file }) => {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
      };
      reader.readAsText(file.content);
    }
  }, [file]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes back to the file
    toast.success("Changes saved successfully");
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  if (!file) {
    return <div>No file selected</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">File Preview: {file.name}</h2>
      {isEditing ? (
        <>
          <Textarea
            value={content}
            onChange={handleContentChange}
            className="w-full h-[400px] mb-2"
          />
          <Button onClick={handleSave}>Save Changes</Button>
        </>
      ) : (
        <>
          <pre className="bg-muted p-4 rounded-md overflow-auto h-[400px] mb-2">
            {content}
          </pre>
          <Button onClick={handleEdit}>Edit</Button>
        </>
      )}
    </div>
  );
};

export default FilePreview;