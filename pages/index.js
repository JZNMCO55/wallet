import React, { useState, useEffect } from "react";
import Index from "../components/Index";
import LoginPage from "../components/LoginPage";
import MainPage from "../components/MainPage";
import CreateWallet from "../components/CreateWallet";
import ImportWallet from "../components/ImportWallet";
import walletManagerInstance from "../src/WalletManager";
import storageInstance from "../src/Storage";

export default function Home() {
  // 在渲染前判断是否渲染哪一个页面
  useEffect(() => {
    const isSuccess = walletManagerInstance.ReloadInfo();
    let indexPage = isSuccess ? "loginPage" : "index";
    console.log(indexPage);
    navigateToPage(indexPage);
  }, []);

  const [activePage, setActivePage] = useState("index");

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      {activePage === "index" && <Index navigateToPage={navigateToPage} />}
      {activePage === "loginPage" && (
        <LoginPage navigateToPage={navigateToPage} />
      )}
      {activePage === "mainPage" && (
        <MainPage navigateToPage={navigateToPage} />
      )}
      {activePage === "createWallet" && (
        <CreateWallet navigateToPage={navigateToPage} />
      )}
      {activePage === "importWallet" && (
        <ImportWallet navigateToPage={navigateToPage} title="导入钱包" />
      )}
    </>
  );
}
