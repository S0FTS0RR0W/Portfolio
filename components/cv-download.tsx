import useDownloader from 'react-use-downloader';
import { Button } from '@/components/ui/button';

export default function DownloadCV() {
    const { size, elapsed, percentage, download, isInProgress } =
    useDownloader();

    const fileUrl = '/CV.pdf';
    const fileName = 'CV.pdf';
    
    return (
        <div className="">
            <Button className='' onClick={() => download(fileUrl, fileName)}>Download CV</Button>
            {isInProgress && (
                <div className="mt-2">
                    <p>Download Progress: {percentage.toFixed(2)}%</p>
                    <p>Elapsed Time: {elapsed.toFixed(2)} seconds</p>
                    <p>File Size: {size.toFixed(2)} bytes</p>
                </div>
            )}
        </div>
    )
}