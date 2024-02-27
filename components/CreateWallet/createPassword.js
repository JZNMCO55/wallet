import React, { useState } from "react";
import styles from "./createWallet.module.css";
import walletManagerInstance from "../../src/WalletManager";

export default function CreatePassword({ navigateToContent }) {
  const [isDisable, setDisable] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLegue, setIsLegue] = useState(true);
  const [isEqua, setIsEqua] = useState(true);

  const handleNext = (event) => {
    event.preventDefault(); // 阻止表单默认提交行为
    if (isLegue && isEqua) {
      console.log("handle next newPassword", newPassword);
      walletManagerInstance.SetPassword(newPassword);
      walletManagerInstance
        .CreateAccount()
        .then((mnemonic) => {
          if (mnemonic) {
            console.log("createPassword mnemonic:", mnemonic);
            navigateToContent("phrase", 2, mnemonic);
          }
        })
        .catch((error) => {
          // 处理创建账户失败的情况
          console.error("Error creating account:", error);
        });
    }
  };

  const handleNewPasswordChange = (event) => {
    const newPasswordValue = event.target.value;
    setNewPassword(newPasswordValue);
    // 直接使用newPassword会没及时刷新
    if (newPasswordValue.length < 8) {
      setIsLegue(false);
    } else {
      setIsLegue(true);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (newPassword !== confirmPasswordValue) {
      setIsEqua(false);
    } else {
      setIsEqua(true);
    }
  };

  const handleCheckboxChange = (event) => {
    setDisable(!event.target.checked);
  };

  return (
    <div className={styles.div_content}>
      <h2 className={styles.h2_title}>创建密码</h2>
      <h4 className={styles.h4_description}>
        此密码只会在此设备上解锁您的钱包，无法恢复此密码
      </h4>
      <div className={styles.div_password}>
        <form className={styles.form_password}>
          <div className={styles.div_newPassword}>
            <div className={styles.div_password_description}>
              新密码（至少8个字符）
            </div>
            <input
              className={styles.input_Password}
              type="password"
              datatype="passworedtype"
              onChange={handleNewPasswordChange}
            ></input>
            {!isLegue && <p className={styles.p_errorMessage}>密码长度不足</p>}
          </div>
          <div className={styles.div_newPassword}>
            <div className={styles.div_password_description}>确认密码</div>
            <input
              className={styles.input_Password}
              type="password"
              datatype="passworedtype"
              onChange={handleConfirmPasswordChange}
            ></input>
            {!isEqua && <p className={styles.p_errorMessage}>密码不匹配</p>}
          </div>
          <div className={styles.div_statement}>
            <input
              className={styles.input_checkbox}
              type="checkbox"
              onChange={handleCheckboxChange}
            ></input>
            <h5 className={styles.h5_statement}>
              我明白OrangeMeta无法为我恢复此密码
            </h5>
          </div>
          <button
            className={styles.button_general}
            onClick={handleNext}
            disabled={isDisable}
          >
            创建新钱包
          </button>
        </form>
      </div>
    </div>
  );
}
