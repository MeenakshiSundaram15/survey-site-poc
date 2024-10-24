"use client";

import { WhatsApp } from "@mui/icons-material";

export const WhatsappContact = () => {
  return (
    <a
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Wisebite+Order&lang=en`}
      target="_blank"
      className="fixed right-[20px] bottom-[40px] z-[999999] cursor-pointer w-[45px] h-[45px] lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center bg-[#00a884] hover:bg-[#06cf9c] duration-300"
    >
      <WhatsApp className='text-white !text-[32px] lg:!text-[40px]' />
    </a>
  );
};
