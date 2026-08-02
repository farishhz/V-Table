import { useAtom } from "jotai";
import { headerBackgroundAtom } from "../store/table"; // atau dari themes.ts
import { Switch } from "@/components/switch";
import ControlContainer from "./control/ControlContainer";
const HeaderBackgroundControl = () => {
  const [hasBackground, setHasBackground] = useAtom(headerBackgroundAtom);

  return (
    <div className="flex sm:flex-row flex-col sm:justify-between items-center gap-2 sm:gap-4">
      <p className="text-[#ffffff66] sm:text-white cursor-default text-[10px] sm:text-sm font-medium tracking-[0.1px] leading-[14px] whitespace-nowrap">
        {" "}
        Header
      </p>
      <Switch checked={hasBackground} onCheckedChange={setHasBackground} className="scale-75 sm:scale-100" />
    </div>
  );
};

export default HeaderBackgroundControl;
