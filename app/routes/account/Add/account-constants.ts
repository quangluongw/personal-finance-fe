import { Landmark, Smartphone, Wallet } from "lucide-react";

export const accountTypes = [
  {
    value: "bank",
    label: "Ngân hàng",
    icon: Landmark,
    color: "from-blue-500 to-blue-600",
    description: "Tài khoản ngân hàng",
  },
  {
    value: "wallet",
    label: "Ví điện tử",
    icon: Smartphone,
    color: "from-purple-500 to-purple-600",
    description: "Ví thanh toán điện tử",
  },
  {
    value: "cash",
    label: "Tiền mặt",
    icon: Wallet,
    color: "from-amber-500 to-amber-600",
    description: "Ví cá nhân, két sắt",
  },
];

export const bankOptions = [
  {
    name: "Techcombank",
    icon: "https://s3-symbol-logo.tradingview.com/techcombank--600.png",
  },
  {
    name: "VPBank",
    icon: "https://yt3.googleusercontent.com/_uwwTxJP2A_IA_MwU5fkDIcsLOXW1SmqNKfAxJZmVudOwp29NuPlm69So0P7I0B3s78X-5syQQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "VCB (Vietcombank)",
    icon: "https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Vietcombank.png",
  },
  {
    name: "MB Bank",
    icon: "https://cdn.tgdd.vn/GameApp/2/220769/Screentshots/mb-bank-ngan-hang-dien-tu-trong-tay-ban-logo-26-12-2023.png",
  },
  {
    name: "VIB",
    icon: "https://inviva.vn/wp-content/uploads/2026/04/logo-vib-vector-02.png",
  },
  {
    name: "TPBank",
    icon: "https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-TPBank.png",
  },
  {
    name: "HDBank",
    icon: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-HDBank-Ori.png",
  },
  {
    name: "MSB",
    icon: "https://play-lh.googleusercontent.com/MBMltTFMkP0uV2dmS2BopLdtokWLI1Qs6lI69wYzixldD4hqr93xTAJFvrw5f_I2mQ",
  },
];

export const ewalletOptions = [
  {
    name: "Momo",
    icon: "https://developers.momo.vn/v3/assets/images/MOMO-Logo-App-6262c3743a290ef02396a24ea2b66c35.png",
  },
  {
    name: "VNPay",
    icon: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png",
  },
  {
    name: "ShopeePay",
    icon: "https://cardtot.com/wp-content/uploads/2022/03/shopeepay.jpg",
  },
  {
    name: "ViettelPay",
    icon: "https://cdn.tgdd.vn/2022/09/GameApp/viettel-money-200x200.jpg",
  },
];
