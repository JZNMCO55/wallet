import styles from "../CreateWallet/createWallet.module.css";
import React, { useState, useRef } from "react";
import walletManagerInstance from "../../src/WalletManager";

export default function ImportWallet({ navigateToPage, title }) {
  const [isDisable, setDisable] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLegue, setIsLegue] = useState(true);
  const [isEqua, setIsEqua] = useState(true);
  const [mnemonicArray, setMnemonicArray] = useState(new Array(12).fill(""));

  const handleTestInput = (index, event) => {
    let tempMnemonicArray = [...mnemonicArray];
    const inputValue = event.target.value.trim(); // 去除输入值前后的空格
    tempMnemonicArray[index] = inputValue;
    setMnemonicArray(tempMnemonicArray);

    // 如果输入值是完整的助记词字符串，则将其分割并放入对应的输入框中
    if (inputValue.split(" ").length === 12) {
      const words = inputValue.split(" ");
      for (let i = 0; i < Math.min(words.length, 12); i++) {
        tempMnemonicArray[i] = words[i];
      }
      setMnemonicArray(tempMnemonicArray);
    }

    console.log(
      "tempMnemonic: ",
      mnemonicArray,
      " mnemonicArray: ",
      mnemonicArray
    );
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

  const handleCheckBox = (event) => {
    setDisable(!event.target.checked);
  };

  const handleNext = async (event) => {
    event.preventDefault(); // 阻止表单默认提交行为
    const isFilled = mnemonicArray.every((word) => word !== "");
    if (isFilled) {
      console.log("isFill");
    } else {
      console.log("is not filled");
      console.log("mnemonicArray: ", mnemonicArray);
    }
    if (isLegue && isEqua && isFilled) {
      const mnemonic = mnemonicArray.join(" ");
      walletManagerInstance.SetPassword(newPassword);
      const importResult = await walletManagerInstance.ImportAccount(mnemonic);
      if (importResult) {
        console.log("Import successed: ");
        walletManagerInstance.LogWalletsInfo();
        navigateToPage("mainPage");
      } else {
        console.log("Import error!");
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.div_headline}>
        <h2 className={styles.h2_title}>{title}</h2>
      </div>
      <div className={styles.div_description}>
        <h4 className={styles.h4_description}>
          此密码只会在此设备上解锁您的钱包，无法恢复此密码
        </h4>
      </div>
      <div className={styles.div_phrase}>
        {mnemonicArray.map((word, index) => {
          return (
            <input
              key={index}
              className={styles.input_word}
              type="text"
              value={mnemonicArray[index]} // 将值设置为 mnemonicArray 中的相应元素
              onChange={(event) => handleTestInput(index, event)}
            />
          );
        })}
      </div>
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
              onChange={handleCheckBox}
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
