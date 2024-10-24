import useSignatures from "@/hooks/useSignatures";
import Logo from "@/assets/logo.png";
import CachedIcon from "@mui/icons-material/Cached";
import { useWindowSize } from "@/hooks/useWindowSize";
import { QR } from "react-qr-rounded";

export const ScanMenuItemContent = ({ visible }: { visible: boolean }) => {
  const { isFetching, isLoading, selectedBowlInfo } = useSignatures();
  const { windowHeight } = useWindowSize();
  const loading = isLoading || isFetching;

  return (
    <div
      className={`duration-500 ${!visible ? "opacity-0 h-0" : ``} relative flex flex-col items-center [&>*]:shrink-0`}
      style={{
        ...(!visible
          ? {
              opacity: 0,
              height: 0,
            }
          : {
              height: `${windowHeight - 60 - 32 + 16}px`,
            }),
      }}
    >
      <div className="relative flex flex-col min-h-0 flex-1 w-full pt-[48px] overflow-auto">
        <div className="w-[min(100%-44px)] flex flex-col items-center justify-center max-w-[320px] mx-auto text-quinoa gap-[14px]">
          <span className="font-bauhaus text-[32px] leading-[34px] tracking-[0.02em] text-center">
            {selectedBowlInfo?.proposed_name}
          </span>
          <span>{selectedBowlInfo?.sku}</span>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="font-worksans text-xs tracking-[0.02em] text-wild-rice flex flex-col items-center justify-center mb-[14px]">
            <span className="font-semibold">Pick up</span>
            <span>SaladStop!</span>
          </div>

          <div className="w-[249px] h-[249px] mx-auto mb-[14px] relative">
            {loading && (
              <div className="absolute -left-1 -right-1 -bottom-1 -top-1 bg-oatmeal flex items-center justify-center">
                <CachedIcon className={`${loading ? "animate-spin" : ""}`} />
              </div>
            )}
            {/* <QRCode
            bgColor="#FBF2E7"
            fgColor="#472A1F"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            // value={`{ADD}${bowl.sku}`}
            value={`{ADD}${selectedBowlInfo?.sku}`}
          /> */}
            <QR
              color="#472A1F"
              backgroundColor="#FBF2E7"
              rounding={100}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              // cutout
              // cutoutElement={
              //   <img
              //     src="https://random.imagecdn.app/500/500"
              //     style={{
              //       objectFit: "contain",
              //       width: "100%",
              //       height: "100%",
              //     }}
              //   />
              // }
              errorCorrectionLevel="L"
            >
              {`{ADD}${selectedBowlInfo?.sku}`}
            </QR>
          </div>

          <div className="flex flex-col text-wild-rice text-xs text-center mx-auto">
            <span>Scan in store or</span>
            <span>screenshot this for later</span>
          </div>
        </div>

        {/* Powered by */}
        <div className="flex items-center mr-auto ml-[30px] mt-auto">
          <span className="font-worksans tracking-[0.02em] text-[8.9px]">Powered by</span>
          <img alt="saladstop" src={Logo.src} className="h-[42px] w-auto" />
        </div>
      </div>
    </div>
  );
};
