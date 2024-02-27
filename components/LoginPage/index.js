import React, { useState } from "react";
import styles from "./UnlockPage.module.css";
import walletManagerInstance from "../../src/WalletManager";

export default function UnlockPage({ navigateToPage }) {
  const [netWorkName, setNetworkName] = useState("Sepolia");
  const [firstLetter, setFirstLetter] = useState("S");
  const [password, SetPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 选择网络
  const handleSelectNetWork = () => {};

  // 图标logo
  const handleLogoButton = () => {};

  const handlePassword = (event) => {
    SetPassword(event.target.value);
  };

  const handleLogIn = () => {
    const isUnlocked = walletManagerInstance.UnlockWallet(password);
    if (isUnlocked) {
      setErrorMessage("");
      navigateToPage("mainPage");
    } else {
      setErrorMessage("密码错误!");
    }
  };
  return (
    <>
      <div className={styles.container}>
        {/* 头部 */}
        <div className={styles.div_header}>
          <div className={styles.div_headerContent}>
            <div className={styles.div_select_network}>
              <button
                className={styles.button_network}
                onClick={handleSelectNetWork}
              >
                <div className={styles.network_wrapper}>
                  <div className={styles.div_firstLetter}>{firstLetter}</div>
                  <span className={styles.span_networkName}>{netWorkName}</span>
                </div>
              </button>
            </div>
            <button
              className={styles.button_Logo}
              onClick={handleLogoButton}
            ></button>
          </div>
        </div>

        {/* 内容 */}
        <div className={styles.div_content}>
          <div className={styles.div_mainContent}>
            <div className={styles.div_anime}>未来做一个动图</div>
            <h1 className={styles.h1_welcomeBack}>欢迎回来！</h1>
            <h3 className={styles.h3_description}>即将进入去中心化网络</h3>
            <form className={styles.form_password}>
              <div className={styles.div_password}>
                <input
                  className={styles.input_password}
                  type="password"
                  onChange={handlePassword}
                  placeholder=""
                ></input>
                <label className={styles.label_password}>密码</label>
              </div>
            </form>
            {<h4 className={styles.h4_errorMessage}>{errorMessage}</h4> &&
              errorMessage !== ""}
            <button className={styles.button_logIn} onClick={handleLogIn}>
              登录
            </button>
            <div className={styles.div_forgetPasswor}>
              <a className={styles.a_forgetPassword}>忘记密码了？</a>
            </div>
          </div>
        </div>

        {/* 页角 */}
        <div className={styles.div_footer}>
          <span className={styles.span_needHelp}>
            需要帮助？请联系<a className={styles.a_contact}>OrangeWallet支持</a>
          </span>
        </div>
      </div>
    </>
  );
}
