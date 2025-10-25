import Joi from "joi";
export const registerSchema = Joi.object({
  userName: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Bạn phải nhập tên",
    "string.min": "Tên tối thiểu 3 ký tự",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Bạn phải nhập email",
      "string.email": "Email không hợp lệ",
    }),
  password: Joi.string().min(8).max(50).required().messages({
    "string.empty": "Bạn phải nhập mật khẩu",
    "string.min": "Mật khẩu tối thiểu 8 ký tự",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu xác nhận không khớp",
    "any.required": "Xác nhận mật khẩu là bắt buộc",
    "string.empty": "Bạn phải nhập xác nhận mật khẩu",
  }),
});
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Bạn phải nhập email",
      "string.empty": "Bạn phải nhập email",
      "string.email": "Email không hợp lệ",
    }),
  password: Joi.string().min(8).max(50).required().messages({
    "any.required": "Bạn phải nhập mật khẩu",
    "string.empty": "Bạn phải nhập mật khẩu",
    "string.min": "Mật khẩu tối thiểu 8 ký tự",
    "string.max": "Mật khẩu tối đa 50 ký tự",
  }),
});
