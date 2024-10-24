"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

export default function HamburgerMenu() {
  const { push } = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center relative">
        <button
          className={`${open && "opacity-0 scale-0 -rotate-180"} duration-500 absolute z-20`}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </button>
        <button
          className={`${!open && "opacity-0 scale-0 rotate-180"} duration-500 relative z-20`}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CloseIcon className={`text-white`} />
        </button>
      </div>

      <div
        className={`${
          !open && "opacity-0 pointer-events-none"
        } duration-300 transition-all pt-16 fixed text-white top-0 left-0 p-4 w-screen h-screen z-10 bg-black/80 flex flex-col gap-6`}
      >
        <button
          onClick={() => {
            push("/");
            handleClose();
          }}
          className="active:scale-150 hover:scale-150 duration-300 font-worksans font-extrabold"
        >
          Main Page
        </button>
        <button
          className="active:scale-150 hover:scale-150 duration-300 font-worksans font-extrabold"
          onClick={() => {
            push("/menu");
            handleClose();
          }}
        >
          WiseBite Bowls
        </button>
        <button
          className="active:scale-150 hover:scale-150 duration-300 font-worksans font-extrabold"
          onClick={() => {
            push("/survey");
            handleClose();
          }}
        >
          Discover Your Profile
        </button>
      </div>
    </div>
  );
}
