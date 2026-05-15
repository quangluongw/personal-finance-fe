import Joi from "joi";

export const accountSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Tên tài khoản không được để trống",
    "any.required": "Tên tài khoản là bắt buộc",
  }),

  icon: Joi.string().trim().allow("", null),

  accountNumber: Joi.string().allow("").optional(),

  balance: Joi.number().min(0).required().messages({
    "number.base": "Số dư phải là số",
    "number.min": "Số dư phải lớn hơn hoặc bằng 0",
    "any.required": "Vui lòng nhập số dư",
  }),

  isPrimary: Joi.boolean().default(false),

  selectedBank: Joi.string().allow("").optional(),

  type: Joi.string().valid("bank", "wallet", "cash").required().messages({
    "any.only": "Loại tài khoản không hợp lệ",
    "any.required": "Vui lòng chọn loại tài khoản",
  }),
});
