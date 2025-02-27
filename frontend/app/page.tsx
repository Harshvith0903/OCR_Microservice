"use client";

import { useState } from "react";
import axios from "axios";
import { CSSProperties } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [tags, setTags] = useState<{ Tag: string; Count: number }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post(`${process.env.OCR_BACKEND_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDownloadUrl(response.data.download_url);

      // Fetch extracted tags after processing
      const tagsResponse = await axios.get(`${process.env.OCR_BACKEND_URL}/tags`);
      setTags(tagsResponse.data.tags);

      alert("File uploaded and processed successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Upload a PDF for OCR Processing</h2>

        {/* Custom File Upload Button */}
        <label htmlFor="file-upload" style={styles.fileButton}>
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={styles.hiddenFileInput}
        />

        {/* Display Selected File Name */}
        <p style={styles.fileName}>{file ? file.name : "No file selected"}</p>

        {/* Upload Button */}
        <button onClick={handleUpload} disabled={uploading} style={styles.uploadButton}>
          {uploading ? "Uploading..." : "Upload and Process"}
        </button>

        {/* Tags Table (Displayed only after processing) */}
        {tags.length > 0 && (
          <div style={styles.tagSection}>
            <h3 style={styles.subtitle}>Extracted Tags</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Tag</th>
                  <th style={styles.tableHeader}>Count</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{tag.Tag}</td>
                    <td style={styles.tableCell}>{tag.Count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Download Section */}
        {downloadUrl && (
          <div style={styles.downloadSection}>
            <h3 style={styles.subtitle}>Download Processed File:</h3>
            <a href={`${process.env.OCR_BACKEND_URL}/${downloadUrl}`} download>
              <button style={styles.downloadButton}>Download Excel File</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Define correct typings for styles
const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover",  
    backgroundPosition: "center",  
    backgroundRepeat: "no-repeat",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    maxWidth: "450px",
    width: "100%",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  fileButton: {
    display: "inline-block",
    backgroundColor: "#6c757d",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  hiddenFileInput: {
    display: "none",
  },
  fileName: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    marginTop: "10px",
  },
  tagSection: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    textAlign: "center" as const,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  tableHeader: {
    borderBottom: "2px solid #ddd",
    padding: "8px",
    fontWeight: "bold",
    color: "#000", 
  },
  tableCell: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    color: "#000",
  },
  downloadSection: {
    marginTop: "20px",
  },
  downloadButton: {
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "16px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
  },
};
