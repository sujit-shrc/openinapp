"use client";

import { useState, useRef } from "react";
import Papa, { ParseResult } from "papaparse";
import Image from "next/image";

interface UploadedData {
  id: string;
  link: string;
  prefix: string;
  tags: string[];
}

type CSVRow = {
  id: string;
  links: string;
  prefix: string;
  "select tags"?: string; // Making it optional
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: string[] }>(
    {},
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref to access file input

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null); // Remove the selected file
    setUploadedData([]); // Clear uploaded data
    setSelectedTags({}); // Clear selected tags

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  const handleUpload = () => {
    if (file) {
      setIsLoading(true); // Start loading
      Papa.parse<CSVRow>(file, {
        header: true, // Consider the first row as the header
        dynamicTyping: true,
        complete: (results: ParseResult<CSVRow>) => {
          console.log(results);

          const parsedData: UploadedData[] = results.data.map((row) => ({
            id: row.id,
            link: row.links,
            prefix: row.prefix,
            tags: row["select tags"]
              ? row["select tags"].split(",").map((tag: string) => tag.trim())
              : [],
          }));

          setUploadedData(parsedData);
          setIsLoading(false); // Stop loading
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
          setIsLoading(false); // Stop loading
        },
      });
    }
  };

  const handleClickArea = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click on area click
    }
  };

  const handleTagSelect = (rowId: string, selectedTag: string) => {
    setSelectedTags((prevState) => {
      const updatedTags = prevState[rowId] || [];
      if (!updatedTags.includes(selectedTag)) {
        updatedTags.push(selectedTag);
      }
      return { ...prevState, [rowId]: updatedTags };
    });
  };

  const removeTag = (rowId: string, tagToRemove: string) => {
    setSelectedTags((prevState) => ({
      ...prevState,
      [rowId]: prevState[rowId].filter((tag) => tag !== tagToRemove),
    }));
  };

  const getAvailableTags = (row: UploadedData) => {
    return row.tags.filter((tag) => !selectedTags[row.id]?.includes(tag));
  };

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Upload CSV</h1>
      <div className="flex flex-col items-center">
        <div
          onClick={() => !file && handleClickArea()}
          className={`${!file && "cursor-pointer"} border-2 border-dashed border-gray-300 w-full max-w-xl rounded-lg p-2 sm:p-4 md:p-8 text-center`}
        >
          <div className="flex justify-center pb-1">
            <Image src="/excel.png" alt="Upload" width={50} height={100} />
          </div>
          {!file && (
            <p className="mb-4">
              Drop your excel sheet here or{" "}
              <span className="text-blue-500">browse</span>
            </p>
          )}
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            id="fileInput"
          />
          {file && <p className="text-sm">{file.name}</p>}
          {file && (
            <button
              onClick={handleRemoveFile}
              className="ml-4 text-red-600 px-4 py-2 rounded-md"
            >
              Remove File
            </button>
          )}
        </div>
        <button
          onClick={handleUpload}
          className={`mt-4 bg-blue-500 w-full max-w-xl text-white px-6 py-2 rounded-md ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!file || isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {uploadedData.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Uploads</h2>
          <table className="min-w-full bg-white text-black border border-gray-200 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left min-w-[100px] max-w-[100px]">
                  Sl No.
                </th>
                <th className="px-4 py-2 border-b text-left min-w-[150px] max-w-[250px]">
                  Links
                </th>
                <th className="px-4 py-2 border-b text-left min-w-[100px] max-w-[200px]">
                  Prefix
                </th>
                <th className="px-4 py-2 border-b text-left min-w-[150px] max-w-[250px]">
                  Add Tags
                </th>
                <th className="px-4 py-2 border-b text-left min-w-[300px] max-w-[350px]">
                  Selected Tags
                </th>
              </tr>
            </thead>
            <tbody>
              {uploadedData.map((row, index) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{row.link}</td>
                  <td className="px-4 py-2 border-b">{row.prefix}</td>
                  <td className="px-4 py-2 border-b">
                    <select
                      className="border rounded-md p-2"
                      onChange={(e) => handleTagSelect(row.id, e.target.value)}
                      value=""
                      style={{
                        backgroundColor: "var(--option-bg)",
                        color: "var(--option-text)",
                      }} // Option styles for light/dark theme
                    >
                      <option value="" disabled>
                        Select Tag
                      </option>
                      {getAvailableTags(row).map((tag) => (
                        <option key={tag} value={tag} className="rounded-md">
                          {tag}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex flex-wrap gap-y-1">
                      {(selectedTags[row.id] || []).map((tag) => (
                        <div
                          key={tag}
                          className="bg-blue-600 text-white text-sm flex px-2 gap-2 py-1 rounded mr-1"
                        >
                          <span>{tag}</span>
                          <span
                            className="cursor-pointer"
                            onClick={() => removeTag(row.id, tag)}
                          >
                            x
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
