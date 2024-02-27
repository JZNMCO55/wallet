import React, { useState } from "react";
import styles from "./createWallet.module.css";
import CreatePassword from "./createPassword";
import Phrase from "./phrase";
import Confirm from "./confirm";

export default function CreateWallet({ navigateToPage }) {
  const [activePage, setActivePage] = useState("createPassword");
  const [mnemonic, setMnemonic] = useState(""); // 添加 mnemonic 状态
  const [step, setStep] = useState(1);

  // 导航到下一个页面，并将助记词传递给 Phrase 组件
  const navigateToContent = (page, step, tempMnemonic) => {
    setStep(step);
    setMnemonic(tempMnemonic); // 更新 mnemonic 状态
    setActivePage(page);
    console.log("navigateToContent mnemonic: ", tempMnemonic);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ul className={styles.ul_step}>
          <li
            className={`${styles.li_step} ${step >= 1 && styles.active}`}
            onClick={() => handleStepChange(1)}
          >
            创建密码
          </li>
          <li
            className={`${styles.li_step} ${step >= 2 && styles.active}`}
            onClick={() => handleStepChange(2)}
          >
            私钥助记词
          </li>
          <li
            className={`${styles.li_step} ${step >= 3 && styles.active}`}
            onClick={() => handleStepChange(3)}
          >
            验证确认
          </li>
        </ul>
      </div>
      {activePage === "createPassword" && (
        <CreatePassword navigateToContent={navigateToContent} />
      )}
      {activePage === "phrase" && (
        <Phrase navigateToContent={navigateToContent} mnemonic={mnemonic} />
      )}
      {activePage === "confirm" && (
        <Confirm navigateToPage={navigateToPage} mnemonic={mnemonic} />
      )}
    </div>
  );
}
