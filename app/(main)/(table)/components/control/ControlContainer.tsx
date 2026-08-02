import React, { PropsWithChildren } from "react";

// import styles from "./ControlContainer.module.css";

type PropTypes = {
  title: string;
};

const ControlContainer: React.FC<PropsWithChildren<PropTypes>> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-[7px]">
      <strong className="text-white/40 cursor-default text-xs font-medium tracking-[0.1px] leading-[14px] whitespace-nowrap">
        {title}
      </strong>
      <div className="flex h-full items-center">{children}</div>
    </div>
  );
};

export default ControlContainer;
