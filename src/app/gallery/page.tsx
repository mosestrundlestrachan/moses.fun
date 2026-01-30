import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GalleryPage() {
    const galleryDir = path.join(process.cwd(), "public/images/gallery");

    // Ensure directory exists
    if (!fs.existsSync(galleryDir)) {
        try {
            fs.mkdirSync(galleryDir, { recursive: true });
        } catch (e) {
            // ignore error if it exists or permission issue, handled by empty list
        }
    }

    let images: string[] = [];
    try {
        const files = fs.readdirSync(galleryDir);
        images = files.filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file));
    } catch (error) {
        console.error("Error reading gallery directory:", error);
    }

    return (
        <main className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-12 flex items-center gap-4">
                    <Link
                        href="/#photos"
                        className="group flex items-center gap-2 font-serif text-lg text-gray-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl font-normal text-black mb-16">
                    Gallery
                </h1>

                {images.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 rounded-lg">
                        <p className="font-serif text-xl text-gray-400 mb-4">No images found yet.</p>
                        <p className="font-sans text-sm text-gray-500">
                            Drop your photos into <code>public/images/gallery</code> to see them here.
                        </p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {images.map((image, i) => (
                            <div key={image} className="break-inside-avoid relative group overflow-hidden mb-6">
                                <Image
                                    src={`/images/gallery/${image}`}
                                    alt={`Gallery Image ${i + 1}`}
                                    width={800}
                                    height={600}
                                    quality={95}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
