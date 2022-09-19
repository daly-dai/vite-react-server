import validator from "validator";
import { isEmpty } from "@/utils/tool";


interface ErrorObj {
  name: string;
  password: string;
  // email: string
}

export default function validateLoginInput(data) {
  let error: Partial<ErrorObj> = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.name)) {
    error.name = "用户名不能为空";
  }

  if (validator.isEmpty(data.password)) {
    error.password = "密码不能为空";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
