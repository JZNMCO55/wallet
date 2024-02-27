import React, { useState } from "react";
import styles from "./createWallet.module.css";

export default function Phrase({ navigateToContent, mnemonic }) {
  const mnemonicArray = String(mnemonic).split(" ");
  console.log("Phrase mnemonic:", mnemonic);
  console.log("Phrase mnemonicArray:", mnemonicArray);
  const handleNext = () => {
    // 调用传入的函数以切换到下一个页面
    navigateToContent("confirm", 3, mnemonic);
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.h2_title}>私钥助记词</h2>
      <h4 className={styles.h4_description}>
        请写下这个由12个单词组成的账户私钥助记词,然后将其保存到您信任并且只有您可以访问的地方。
      </h4>
      <div className={styles.div_promption}>
        <h4 className={styles.h4_promption}>提示：</h4>
        <ul className={styles.ul_promption}>
          <li className={styles.li_promption}>保存到密码管理工具</li>
          <li className={styles.li_promption}>安全存放在保险箱</li>
          <li className={styles.li_promption}>写下并存储在多个秘密位置</li>
        </ul>
      </div>
      <div className={styles.div_phrase}>
        {/* 使用 map 函数遍历助记词列表，并将每个助记词填入相应的 input 中 */}
        {mnemonicArray.map((word, index) => (
          <input
            key={index}
            className={styles.input_word}
            type="text"
            value={word}
            readOnly // 设置为只读
          />
        ))}
      </div>
      <div className={styles.div_nextStep}>
        <button className={styles.button_general} onClick={handleNext}>
          下一步
        </button>
      </div>
    </div>
  );
}
