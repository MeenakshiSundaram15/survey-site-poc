import { Facebook } from "@/components/Icons/Facebook";
import { Instagram } from "@/components/Icons/Instagram";
import { Logo } from "@/components/Icons/Logo";

export const Footer = () => {
  return (
    <div className="h-[160px] xl:h-[220px] pt-6 xl:pt-0 flex flex-col xl:flex-row xl:px-[120px] items-center bg-[#5A5048]">
      <div className="flex flex-col">
        <Logo className="text-oatmeal h-[65px]" />
        <span className="text-oatmeal text-[10px] xl:text-base leading-[11.73px] tracking-[0.02em] mt-2 xl:mt-0 mb-4 xl:mb-0 xl:ml-4">
          Copyright © 2024 SaladStop Group
        </span>
      </div>

      {/* <div> */}
      {/* </div> */}

      <div className="flex items-center justify-center gap-6 py-1 text-oatmeal xl:ml-auto xl:mr-[14px]">
        <a className='text-white hover:opacity-80 duration-300' href={`mailto:support@saladstop.com.sg?subject=Wisebite`} target="_blank">Contact us</a>
        <Facebook className="xl:w-6 xl:h-auto" />
        <Instagram className="xl:w-6 xl:h-auto" />
      </div>
    </div>
  );
};
