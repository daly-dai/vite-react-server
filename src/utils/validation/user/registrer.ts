import validator from "validator";
import { isEmpty } from "@/utils/tool";

interface ErrorObj {
  name: string;
  password: string;
}
export default function validateRegisterInput(data) {
  let error: Partial<ErrorObj> = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // if (!validator.isLength(data.name, { min: 2, max: 16 })) {
  //   error.name = "名字的长度不能小于两位且不能超过十六位";
  // }

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
