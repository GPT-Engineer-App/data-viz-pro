import { useState } from "react";
import { Table } from "@/components/ui/table";

const ImportPage = () => {
  const [previewData, setPreviewData] = useState(null);

  // This function would be called when a file is successfully uploaded
  const handleFileUpload = (data) => {
    // Process the data and set the preview
    setPreviewData(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Import</h1>
      {previewData ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Data Preview</h2>
          <Table>
            <Table.Header>
              <Table.Row>
                {Object.keys(previewData[0]).map((header) => (
                  <Table.Head key={header}>{header}</Table.Head>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {previewData.slice(0, 5).map((row, index) => (
                <Table.Row key={index}>
                  {Object.values(row).map((value, cellIndex) => (
                    <Table.Cell key={cellIndex}>{value}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <p>Upload a file to see a preview of your data.</p>
      )}
    </div>
  );
};

export default ImportPage;