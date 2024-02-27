import styles from "./index.module.css";
import React, { useState } from "react";

export default function Index({ navigateToPage }) {
  const [isDisable, setDisable] = useState(true);

  const handleCreateWallet = () => {
    navigateToPage("createWallet");
  };

  const handleImportWallet = () => {
    navigateToPage("importWallet");
  };

  const handleCheckboxChange = (event) => {
    setDisable(!event.target.checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.div_header}>
        <div className={styles.div_title}>
          <h2 className={styles.h2_title}>让我们开始吧!</h2>
        </div>
        <div>
          <p className={styles.p_description}>这是一个web3钱包练习的小项目</p>
        </div>
      </div>

      <div className={styles.div_content}>
        <div className={styles.div_content_anime}>未来有机会做一个动图</div>
        <ul className={styles.ul_welcome_button}>
          <li className={styles.li_term_of_use}>
            <div className={styles.div_term_of_use}>
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                className={styles.checkbox_term_of_use}
              ></input>
              <label>
                <span>
                  我同意OrangeWallet的 <a href="#">使用条款</a>
                </span>
              </label>
            </div>
          </li>
          <li className={styles.li_create_wallet}>
            <button
              className={styles.button_create_wallet}
              onClick={handleCreateWallet}
              disabled={isDisable}
            >
              创建新钱包
            </button>
          </li>
          <li className={styles.li_import_wallet}>
            <button
              className={styles.button_import_wallet}
              onClick={handleImportWallet}
              disabled={isDisable}
            >
              导入现有钱包
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
