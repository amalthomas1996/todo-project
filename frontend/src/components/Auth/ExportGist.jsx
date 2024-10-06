import React, { useState } from "react";
import axios from "axios";

const ExportGist = ({ markdownContent, title }) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://api.github.com/gists",
        {
          description: `${title} Summary`,
          public: false, // Making the Gist secret
          files: {
            [`${title}_summary.md`]: {
              content: markdownContent,
            },
          },
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      setMessage(
        `Gist created successfully! Gist URL: ${response.data.html_url}`
      );
    } catch (error) {
      setMessage(
        "Error creating Gist: " + (error.response.data.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <h3 className="text-xl mb-2">Export as Gist</h3>
      <input
        type="text"
        placeholder="Enter GitHub Personal Access Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleExport}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Exporting..." : "Export Gist"}
      </button>
      {message && <div className="mt-2 text-green-600">{message}</div>}
    </div>
  );
};

export default ExportGist;
