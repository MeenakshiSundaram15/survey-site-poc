"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, Fragment } from "react";

const NavigationBarLink = ({
  href,
  className,
  active,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; active?: boolean }) => (
  <Link
    className={`${className || ""} ${active ? "" : ""} relative h-full px-4 text-sm flex items-center justify-center`}
    href={href}
    {...rest}
  >
    {children}
    <span
      className={`${
        active ? "w-[calc(100%-16px)]" : "opacity-0 w-0"
      } absolute bottom-0 h-1 transition-all duration-500 bg-core-spinach rounded-full`}
    />
  </Link>
);

export const NavigationBar = () => {
  const pathname = usePathname();
  return (
    <Fragment>
      <div className="flex h-12 items-center justify-center w-full">
        <NavigationBarLink active={pathname === "/signatures"} href="/signatures">
          Signatures
        </NavigationBarLink>
        <NavigationBarLink active={pathname === "/macro-calculator"} href="/macro-calculator">
          Macro Calculator
        </NavigationBarLink>
      </div>
      <div className='flex shrink-0 gap-14 items-center'>
        {/* Cart Icon */}
        <a href='/cart' className='rounded-full bg-quinoa/30 w-[40px] h-[40px] flex'>
          
        </a>

        {/* Profile icon */}
        <a href='/profile' className='rounded-full bg-quinoa/30 w-[40px] h-[40px] flex'>
          
        </a>
      </div>
    </Fragment>
  );
};
