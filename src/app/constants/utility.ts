import * as CryptoJS from 'crypto-js';
import { eChannelConfig } from './configuration';
import * as Constants from "src/app/constants/Constants";
import { environment } from '../../environments/environment';
import { JSEncrypt } from "jsencrypt";

export class Utility {
   public static encryptionWithoutSalt(input: string) {
		    var encryptString = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), CryptoJS.enc.Utf8.parse(eChannelConfig.CryptoKey), {
			    keySize: 128 / 8,
			    iv: CryptoJS.enc.Utf8.parse(eChannelConfig.CryptoIv),
			    mode: CryptoJS.mode.CBC,
			    padding: CryptoJS.pad.Pkcs7
		    });
		    return encryptString;
  };

  public static ValidateInput(e: any) {
    let IsValid: boolean = true;
    if (e == undefined || e == null || e == '' || e.length == 0) {
      IsValid = false;
    }
    return IsValid;
  }
  public static s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  public static getCorelationId() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  public static getSessionCorelationId():any {
    var id = sessionStorage.getItem(Constants.CORELATION_ID);
    if (!Utility.ValidateInput(id)) {
      id = this.getCorelationId();
      window.sessionStorage.setItem(Constants.CORELATION_ID, id);
    }
    return id;
  }


  public static getEncryptedBody(input: any, kv: any) {
    input = JSON.stringify(input);
    if (Utility.ValidateInput(kv)) {
      let kvq = kv.substring(0, 16);
      let ivq = kv.substring(16, 32);
      var encrypted: any = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), CryptoJS.enc.Utf8.parse(kvq),
        {
          keySize: 128 / 8,
          iv: CryptoJS.enc.Utf8.parse(ivq),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
    }
    //return JSON.stringify("e01" + encrypted);
    return "e01" + encrypted
  }

  public static KeyIv() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }

  //KV encryption method
  public static createEncryptedKV(kv: string): any {

    var publicKey = environment.PBK;

    var encryptor = new JSEncrypt({ default_key_size: "2048" });
    encryptor.setPublicKey(publicKey);
    var ciphertext = encryptor.encrypt(kv);
    return ciphertext.toString();
  }



  // Role Access Data Encryption & Decryption Logi
  public static roleAccessDataEncryption(data: string): string {
    const cipherText = CryptoJS.AES.encrypt(
      data,
      CryptoJS.enc.Utf8.parse(eChannelConfig.CryptoKey),
      {
        iv: CryptoJS.enc.Utf8.parse(eChannelConfig.CryptoIv)
      });
    return cipherText.toString();
  }

  public static  roleAccessDataDecryption(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      CryptoJS.enc.Utf8.parse(eChannelConfig.CryptoKey),
      {
        iv: CryptoJS.enc.Utf8.parse(eChannelConfig.CryptoIv)
      });
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public static decryptionResponse(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      CryptoJS.enc.Utf8.parse(eChannelConfig.CryptoKey),
      {
        iv: CryptoJS.enc.Utf8.parse(eChannelConfig.CryptoIv)
      });
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public static IsNullOrEmpty(input: any): boolean {
    if (input === null || input === "" || input === undefined || input.length <= 0)
      return true;
    else
      return false;
  }

  public static getUniqueNumber(length: any) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)).toString();
  }

  public static getkvr() {
    return this.getUniqueNumber(16) + this.getUniqueNumber(16);
  }


}
