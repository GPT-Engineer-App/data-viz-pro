import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import Papa from 'papaparse';

const FilePreview = ({ file, onHeadersVerified }) => {
  const [content, setContent] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (file) {
      parseFile(file.content);
    }
  }, [file]);

  const parseFile = (fileContent) => {
    Papa.parse(fileContent, {
      complete: (results) => {
        setContent(results.data);
        setHeaders(results.data[0]);
        setIsVerifying(true);
      },
      header: false,
    });
  };

  const handleVerifyHeaders = () => {
    setIsVerifying(false);
    onHeadersVerified(headers);
    toast.success("Headers verified successfully");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes back to the file
    toast.success("Changes saved successfully");
  };

  if (!file) {
    return <div>No file selected</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">File Preview: {file.name}</h2>
      {isVerifying ? (
        <div className="mb-4">
          <p>Please verify that the following headers are correct:</p>
          <div className="flex flex-wrap gap-2 my-2">
            {headers.map((header, index) => (
              <span key={index} className="bg-primary/10 px-2 py-1 rounded">{header}</span>
            ))}
          </div>
          <Button onClick={handleVerifyHeaders}>Verify Headers</Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.slice(1, 6).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="mt-4">
        {isEditing ? (
          <Button onClick={handleSave}>Save Changes</Button>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )}
      </div>
    </div>
  );
};

export default FilePreview;