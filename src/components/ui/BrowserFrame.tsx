import Image from "next/image";

type BrowserFrameProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Product screenshot inside a light window chrome. */
export const BrowserFrame = ({
  src,
  width,
  height,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: BrowserFrameProps) => (
  <div
    className={`overflow-hidden rounded-xl border-[1.5px] border-line bg-white shadow-[0_20px_60px_-20px_rgb(28_116_250/0.35)] ${className}`}
  >
    <div className="flex items-center gap-1.5 border-b border-line bg-[#fafafa] px-3 py-2">
      <span className="size-2 rounded-full bg-[#ff5f57]" />
      <span className="size-2 rounded-full bg-[#febc2e]" />
      <span className="size-2 rounded-full bg-[#28c840]" />
    </div>
    <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="block h-auto w-full" />
  </div>
);
