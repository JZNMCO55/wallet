import React, { useState, useEffect } from "react";
import styles from "./createWallet.module.css";

export default function Confirm({ navigateToPage, mnemonic }) {
  const mnemonicArray = String(mnemonic).split(" ");
  console.log("Confirm mnemonic: ", mnemonic);
  console.log("Confirm mnemonicArray:", mnemonicArray);
  let tempMnemonicArray = mnemonicArray.slice();
  let emptyIndices = [];
  while (emptyIndices.length < 3) {
    const randomIndex = Math.floor(Math.random() * 12); // 生成 0 到 11 之间的随机整数
    if (!emptyIndices.includes(randomIndex)) {
      // 检查随机数是否已经存在于数组中
      emptyIndices.push(randomIndex);
      tempMnemonicArray[randomIndex] = "";
    }
  }

  const handleConfirm = () => {
    const isMatch = tempMnemonicArray.every(
      (word, index) => word === mnemonicArray[index]
    );
    if (isMatch) {
      navigateToPage("mainPage");
    } else {
      alert("填写的助记词不正确，请重新填写。");
    }
  };

  const handleTestInput = (index, event) => {
    tempMnemonicArray[index] = event.target.value;
  };

  return (
    <div className={styles.div_content}>
      <div className={styles.mainContent}>
        <h2 className={styles.h2_title}>确认私钥助记词</h2>
        <h4 className={styles.h4_description}>确认私钥助记词</h4>
      </div>
      <div className={styles.div_phrase}>
        {mnemonicArray.map((word, index) => {
          if (!emptyIndices.includes(index)) {
            return (
              <input
                key={index}
                className={styles.input_word}
                type="text"
                value={word}
                readOnly // 设置为只读
              />
            );
          } else {
            return (
              <input
                key={index}
                className={styles.input_word}
                type="text"
                onChange={(event) => handleTestInput(index, event)}
              />
            );
          }
        })}
      </div>
      <div className={styles.div_confirm}>
        <button className={styles.button_general} onClick={handleConfirm}>
          确认
        </button>
      </div>
    </div>
  );
}
