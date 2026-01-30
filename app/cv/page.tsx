'use client'

import dynamic from 'next/dynamic';

const PDFViewerClient = dynamic(() => import('../../components/pdf-viewer'), {
    ssr: false,
});

export default function PDF() {
    return (
        <main className="flex flex-col items-center justify-between p-24 font-mono">
            <PDFViewerClient fileUrl="/CV.pdf" />
        </main>
    )
}