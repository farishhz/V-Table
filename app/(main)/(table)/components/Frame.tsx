import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React, { useContext, useState } from "react";

import { fileNameAtom, showBackgroundAtom } from "../store";
import { FrameContext } from "../store/FrameContextStore";
import { paddingAtom } from "../store/padding";
import { darkModeAtom, themeAtom, themeBackgroundAtom } from "../store/themes";

import useIsSafari from "../util/useIsSafari";

// import Editor from "./Editor";
import TableEditor from "./table-editor";
import FlashMessage from "./FlashMessage";

import styles from "./Frame.module.css";

const DefaultFrame = () => {
  const [padding] = useAtom(paddingAtom);
  const isSafari = useIsSafari();
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const [theme] = useAtom(themeAtom);
  const darkMode = useAtomValue(darkModeAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles[theme.id],
        darkMode && styles.darkMode,
        showBackground && styles.withBackground,
      )}
      style={{ padding, backgroundImage: showBackground ? themeBackground : `` }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div
        className={classNames(styles.window, {
          [styles.withBorder]: !isSafari,
          [styles.withShadow]: !isSafari && showBackground,
        })}
      >
        <div className={styles.header}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
          <div className={styles.fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
            />
            {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
        </div>
        {/* <Editor /> */}
        <TableEditor />
      </div>
    </div>
  );
};

const Frame = ({ resize = true }: { resize?: boolean }) => {
  const frameContext = useContext(FrameContext);
  const [theme] = useAtom(themeAtom);
  const darkMode = useAtomValue(darkModeAtom);

  function renderFrame() {
    return <DefaultFrame />;
  }

  if (!resize) {
    return (
      <div className={styles.frameContainer}>
        <div className={styles.outerFrame} ref={frameContext} id="frame">
          {renderFrame()}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex w-full h-full justify-center items-center [grid-area:content] px-10"
      data-theme={darkMode ? "dark" : "light"}
    >
      <FlashMessage />
      <div className="relative overflow-hidden w-full max-w-[1200px] rounded-md" ref={frameContext} id="frame">
        {renderFrame()}
      </div>
    </div>
  );
};

export default Frame;
