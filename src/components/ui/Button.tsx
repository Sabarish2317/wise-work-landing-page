import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "light" | "white";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[var(--shadow-cta)] hover:bg-[#0f66ea] hover:shadow-[0_8px_22px_#9cc3ff]",
  light: "bg-[#fcfcfc] text-ink ring-1 ring-line hover:bg-white hover:ring-[#dcdcdc]",
  white:
    "bg-[#fcfcfc] text-ink shadow-[0_4px_10.7px_#4a4aff] hover:shadow-[0_10px_30px_#2a2aff]",
};

const phoneIcon: Record<Variant, string> = {
  primary: "/figma/phone.svg",
  light: "/figma/phone-dark.svg",
  white: "/figma/phone-dark.svg",
};

type ButtonProps = ComponentProps<"a"> & {
  variant?: Variant;
  withPhone?: boolean;
  children: ReactNode;
};

/** Pill-ish CTA from the design (18px radius, 16/24 padding). Rendered as a link. */
export const Button = ({
  variant = "primary",
  withPhone = false,
  className = "",
  children,
  ...rest
}: ButtonProps) => (
  <a
    className={`group inline-flex items-center justify-center gap-3 rounded-[18px] px-6 py-4 text-base leading-[1.2] font-medium tracking-[0.01em] whitespace-nowrap transition-[background-color,box-shadow,transform] duration-300 ease-(--ease-out-expo) hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${variantClass[variant]} ${className}`}
    {...rest}
  >
    {withPhone && (
      <Image
        src={phoneIcon[variant]}
        alt=""
        width={18}
        height={18}
        className="transition-transform duration-500 group-hover:-rotate-12"
      />
    )}
    {children}
  </a>
);
