import Link from "next/link";
import Image from "next/image";
import type { Wallpaper } from "@/lib/types";

export default function ProductCard({ w }: { w: Wallpaper }) {
  return (
    <Link href={`/product/${w.id}`} className="group block">
      <div className="watermark aspect-[4/3] bg-[#e4d9c4] mb-3">
        <Image
          src={w.cover_image || "https://picsum.photos/seed/default/900/600"}
          alt={w.title}
          width={900}
          height={600}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium leading-snug">{w.title}</h3>
        <p className="text-sm text-[#7a7060]">${Number(w.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}
