import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center p-12 md:p-24 font-mono">
            <div className="mb-16 max-w-2xl text-center">
                <h1 className="mb-6 text-4xl font-bold">About Charlie</h1>
                <p className="text-lg leading-relaxed">
                    I'm a passionate developer with a love for creating engaging user experiences. I specialize in front-end development, with a strong foundation in React, Next.js, and TypeScript. I'm always eager to learn new technologies and improve my skills.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                <Image 
                    src="/charlie.jpg" 
                    alt="Charlie Brown" 
                    width={300} 
                    height={300}
                    className="rounded-full"
                />
                <ul className="space-y-3 text-lg">
                    <li>• TypeScript Enthusiast</li>
                    <li>• Nextjs Developer</li>
                    <li>• React Developer</li>
                    <li>• Web Developer</li>
                    <li>• Designer</li>
                    <li>• HomeLabber</li>
                </ul>
            </div>

            <div className="flex flex-col items-center w-full max-w-3xl gap-4">
                <h2 className="text-xl font-bold">Languages Known</h2>
                <div className="w-full">
                    <Marquee speed={55} direction="left" pauseOnHover={true} autoFill={true}>
                        <span className="mx-4">HTML</span> • <span className="mx-4">CSS</span> • <span className="mx-4">Tailwind</span> • <span className="mx-4">TypeScript</span> • <span className="mx-4">Python</span> • <span className="mx-4">JavaScript</span> • <span className="mx-4">C++</span> •
                    </Marquee>
                </div>
                <h2 className="text-xl font-bold">Frameworks Known</h2>
                <div className="w-full">
                    <Marquee speed={55} direction="left" pauseOnHover={true} autoFill={true}>
                        <span className="mx-4">Nextjs</span> • <span className="mx-4">Express</span> • <span className="mx-4">Django</span> • <span className="mx-4">Flask</span> • <span className="mx-4">Angular</span> • <span className="mx-4">React</span> •
                    </Marquee>
                </div>
            </div>
        </main>
    );
}