"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

export default function PDFViewerClient({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center">
      <Document
        file={"./CV.pdf"}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        onLoadError={(error) => console.log("Error loading PDF:", error)}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="flex gap-4 mt-4 items-center">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() =>
            setPageNumber((prev) => Math.min(prev + 1, numPages || 1))
          }
          disabled={pageNumber >= (numPages || 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
