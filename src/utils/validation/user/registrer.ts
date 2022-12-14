import validator from "validator";
import { isEmpty } from "@/utils/tool";

interface ErrorObj {
  name: string;
  password: string;
  email: string
}
export default function validateRegisterInput(data) {
  let error: Partial<ErrorObj> = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    error.email = "邮箱不合法";
  }


  if (validator.isEmpty(data.name)) {
    error.name = "用户名不能为空";
  }

  if (validator.isEmpty(data.password)) {
    error.password = "密码不能为空";
  }

  if (!validator.isLength(data.password, { min: 6, max: 16 })) {
    error.password = "密码的长度不能小于六位且不能超过十六位";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
