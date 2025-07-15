import React, { useRef } from "react";
import { toast } from "react-toastify";
import { ImageIcon, FileTextIcon, LinkIcon } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const UploadSection = ({ uploadData, setUploadData }) => {
  const imageInput = useRef();
  const pdfInput = useRef();

  const handleChange = () => {
    const imageFile = imageInput.current.files[0];
    const pdfFile = pdfInput.current.files[0];

    const data = {};

    if (imageFile) {
      if (!imageFile.type.startsWith("image/")) {
        toast.error("❌ Invalid image file format.");
      } else if (imageFile.size > 3 * 1024 * 1024) {
        toast.error("❌ Image file too large (max 3MB).");
      } else {
        data.image = URL.createObjectURL(imageFile);
        data.imageFile = imageFile; // ✅ Store file reference
        toast.success("✅ Image uploaded!");
      }
    }

    if (pdfFile) {
      if (pdfFile.type !== "application/pdf") {
        toast.error("❌ Only PDF files allowed.");
      } else if (pdfFile.size > 5 * 1024 * 1024) {
        toast.error("❌ PDF too large (max 5MB).");
      } else {
        data.pdf = URL.createObjectURL(pdfFile);
        data.pdfFile = pdfFile; // Optional: store file reference
        toast.success("✅ PDF uploaded!");
      }
    }

    setUploadData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="flex overflow-x-auto gap-4 mt-4 h-[280px]">
      {/* Image Upload */}
      <div className="min-w-[260px] bg-white p-4 rounded shadow-sm flex flex-col">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#333A2F] mb-1">
          <ImageIcon className="w-4 h-4" /> Attach Image
        </label>
        <input
          ref={imageInput}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#333A2F]"
        />
        {uploadData.image && (
          <img
            src={uploadData.image}
            alt="Preview"
            className="mt-2 h-36 w-full object-cover rounded shadow"
          />
        )}
      </div>

      {/* PDF Upload */}
      <div className="min-w-[260px] bg-white p-4 rounded shadow-sm flex flex-col">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#333A2F] mb-1">
          <FileTextIcon className="w-4 h-4" /> Attach PDF
        </label>
        <input
          ref={pdfInput}
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#333A2F]"
        />
        {uploadData.pdf && (
          <a
            href={uploadData.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 block"
          >
            📄 View Uploaded PDF
          </a>
        )}
      </div>

      {/* Reference Link */}
      <div className="min-w-[260px] bg-white p-4 rounded shadow-sm flex flex-col">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#333A2F] mb-1">
          <LinkIcon className="w-4 h-4" /> Reference Link
        </label>
        <input
          type="url"
          value={uploadData.link || ""}
          onChange={(e) =>
            setUploadData((prev) => ({ ...prev, link: e.target.value }))
          }
          placeholder="https://example.com"
          className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#333A2F]"
        />
        {uploadData.link && (
          <a
            href={uploadData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 underline mt-2 block break-all"
          >
            {uploadData.link}
          </a>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
