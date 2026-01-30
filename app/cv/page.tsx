import PDFViewerClient from '../../components/pdf-viewer';

export default function PDF() {
    return (
        <main className="flex flex-col items-center justify-between p-24 font-mono">
            <PDFViewerClient fileUrl="/CV.pdf" />
        </main>
    )
}