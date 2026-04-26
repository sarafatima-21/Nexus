import { useState } from 'react';

export function DocumentChamberPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('Draft');
  const [signed, setSigned] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Document Chamber</h1>
      <p className="text-gray-600">
        Manage deal documents, review contracts, and sign agreements.
      </p>

      {/* Status Section */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Document Status
        </label>
        <select
          className="border p-2 rounded w-52"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Draft</option>
          <option>In Review</option>
          <option>Signed</option>
        </select>
      </div>

      {/* Upload Section */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Upload Document
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {file && (
          <p className="text-sm text-gray-600 mt-2">
            Uploaded File: <strong>{file.name}</strong>
          </p>
        )}
      </div>

      {/* E‑Signature Mock */}
      <div>
        <label className="block text-sm font-medium mb-1">
          E‑Signature (Mock)
        </label>
        <button
          onClick={() => setSigned(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sign Document
        </button>

        {signed && (
          <p className="text-green-600 mt-2">
            ✅ Document signed successfully
          </p>
        )}
      </div>
    </div>
  );
}