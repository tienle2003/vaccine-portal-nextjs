import axios from "axios";
import { toast } from "react-toastify";

export const handleRequestError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error?.response?.data?.message;
    toast.error(message);
  } else {
    toast.error("Some thing went wrong, please try again!");
  }
};
