import { toast, ToastPosition } from "react-toastify";

export const optionsToast = {
  position: "top-right" as ToastPosition,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const toastError = (msg: string) => {
  return toast.error(msg, optionsToast);
};

export const toastSucess = (msg: string) => {
  return toast.success(msg, optionsToast);
};

export default function formatNumber(
  number: number,
  format = "vi-VN",
  unit?: number
) {
  if (number === undefined || number === null) {
    return "-";
  } else {
    const numberString = new Intl.NumberFormat(format, {
      minimumFractionDigits: 0,
      maximumFractionDigits:
        unit != undefined ? Math.ceil(Math.log(unit) / Math.LN10) : 6,
    }).format(number);
    return `${numberString}`;
  }
}
