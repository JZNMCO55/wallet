//@brief 钱包管理器
//@note  用来管理钱包信息，储存钱包

const ethers = require("ethers");
const bip39 = require("bip39");
import storageInstance from "./Storage";

class WalletManager {
  constructor() {
    if (!WalletManager.instance) {
      const isSuccess = this.ReloadInfo();
      if (!isSuccess) {
        this.wallets = {};
        this.walletsInfo = { WalletsNum: 0, ActiveWallet: " ", Password: " " };
        this.activeWallet;
        this.walletsNum = 0;
        this.password = "";
      }

      WalletManager.instance = this;
    }
    return WalletManager.instance;
  }

  // @brief 创建账户
  // @note  若通过助记词导入账户的话，则可以不调用
  async CreateAccount() {
    if (this.password.length < 8) {
      console.error("Wrong Password");
      return "";
    }
    const mnemonic = bip39.generateMnemonic();
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    this.AddWallet(wallet);
    const encrypted = await wallet.encrypt(this.password);
    storageInstance.SaveInformation("encrypted", encrypted);
    this.SetActiveWallet(this.wallets[0]);
    return mnemonic;
  }

  // @brief 创建钱包
  CreateWallet() {
    const wallet = ethers.Wallet.createRandom();
    this.AddWallet(wallet);
    this.walletsNum++;
    this.wallets[this.walletsNum - 1] = "account " + this.walletsNum;
    return wallet;
  }

  // @brief 创建账户
  // @param 助记词(有空格)
  async ImportAccount(wordlist) {
    console.log(wordlist);
    if (this.password.length < 8) {
      console.log("密码还未设置");
      return false;
    }
    try {
      //检查助记词长度;
      const isValidLength = [12, 15, 18, 21, 24].includes(
        wordlist.split(" ").length
      );
      if (!isValidLength) {
        console.error("助记词长度无效");
        return false;
      }
      const isValidWord = bip39.validateMnemonic(wordlist);
      if (!isValidWord) {
        console.error("助记词包含无效的单词");
        return false;
      }
      const wallet = ethers.Wallet.fromPhrase(wordlist);
      if (!wallet) {
        console.error("未能导入正确的钱包");
        return false;
      }
      this.ReleaseCache();
      this.AddWallet(wallet);
      const encrypted = await wallet.encrypt(this.password);
      storageInstance.SaveInformation("encrypted", encrypted);
      this.SetActiveWallet(this.wallets[0]);
      return true;
    } catch (error) {
      console.error("验证助记词时出错：", error.message);
      return false;
    }
  }

  AddWallet(wallet) {
    const existingWallet = Object.values(this.walletsInfo).find(
      (info) => info.address === wallet.address
    );
    if (existingWallet) {
      console.error("Wallet already exists.");
      return;
    }
    this.walletsNum++;
    this.walletsInfo["WalletsNum"] = this.walletsNum;
    this.wallets[this.walletsNum - 1] = "account " + this.walletsNum;
    const walletInfo = {
      walletName: this.wallets[this.walletsNum - 1],
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
    this.walletsInfo[this.wallets[this.walletsNum - 1]] = walletInfo;
    this.walletsInfo["WalletsNum"] = this.walletsNum;
    console.log("wallets: ", this.wallets);
    console.log("walletsInfo: ", this.walletsInfo);
    this.Update();
  }

  UnlockWallet(password) {
    try {
      const encryted = storageInstance.LoadInformation("encrypted");
      const wallet = ethers.Wallet.fromEncryptedJsonSync(encryted, password);
      if (wallet) {
        const infoString = storageInstance.LoadInformation("WalletsInfo");
        this.walletsInfo = JSON.parse(infoString);
        this.walletsNum = this.walletsInfo["WalletsNum"];
        const activeWalletName = this.walletsInfo["ActiveWallet"];
        console.log("ActiveWalletName", activeWalletName);
        const activeWalletPrivateKey =
          this.walletsInfo[activeWalletName].privateKey;
        this.activeWallet = new ethers.Wallet(activeWalletPrivateKey);
        return true;
      }
      return false;
    } catch (e) {
      console.log("UnlockError: ", e.message);
      return false;
    }
  }

  ImportWallet(privateKey) {
    try {
      const wallet = new ethers.Wallet(privateKey);
      if (wallet) {
        console.log(wallet);
        this.AddWallet(wallet);
        return true;
      }
    } catch (error) {
      console.error(`验证私钥时出错: ${error.message}`);
      return false;
    }
  }

  SetPassword(password) {
    if (password.length < 8) {
      console.error("Wrong password!");
      return false;
    } else {
      console.log("type of ", typeof this.walletsInfo);
      this.password = password;
      this.walletsInfo.Password = password;
      return true;
    }
  }

  SetActiveWallet(walletName) {
    const privateKey = this.walletsInfo[walletName].privateKey;
    console.log(privateKey);
    try {
      const wallet = new ethers.Wallet(privateKey);
      this.activeWallet = wallet;
      this.walletsInfo["ActiveWallet"] = walletName;
      this.Update();
    } catch (e) {
      console("Invalid PrivateKey: ", privateKey);
    }
  }

  GetActiveWallet() {
    return this.activeWallet;
  }

  Update() {
    const walletsInfoString = JSON.stringify(this.walletsInfo);
    const walletsString = JSON.stringify(this.wallets);
    storageInstance.SaveInformation("WalletsInfo", walletsInfoString);
    storageInstance.SaveInformation("Wallets", walletsString);
  }

  LogWalletsInfo() {
    const infoString = storageInstance.LoadInformation("WalletsInfo");
    const infoObject = JSON.parse(infoString);
    console.log("WalletsInfo: ", infoObject);
  }

  ReloadInfo() {
    const wallets = storageInstance.LoadInformation("Wallets");
    const walletsInfo = storageInstance.LoadInformation("WalletsInfo");
    this.encrypt = storageInstance.LoadInformation("encrypted");
    console.log("walletInfo: ", walletsInfo);
    if (wallets !== "" && walletsInfo !== "" && this.encrypt) {
      this.wallets = JSON.parse(wallets);
      this.walletsInfo = JSON.parse(walletsInfo);
      this.password = this.walletsInfo["Password"];
      if (
        this.walletsInfo.Password === "" ||
        this.walletsInfo.WalletsNum === 0
      ) {
        return false;
      }
      const walletName = this.walletsInfo["ActiveWallet"];
      console.log("walletName: ", walletName);
      this.SetActiveWallet(walletName);
      this.walletsNum = this.walletsInfo["WalletsNum"];
      return true;
    } else {
      console.log("ReloadInfo failed");
      return false;
    }
  }

  ReleaseCache() {
    storageInstance.RemoveInformation("Wallets");
    storageInstance.RemoveInformation("WalletsInfo");
    storageInstance.RemoveInformation("encrypted");
    console.log("已经清除缓存");
  }
}

const walletManagerInstance = new WalletManager();
export default walletManagerInstance;
