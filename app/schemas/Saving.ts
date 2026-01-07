import Joi from "joi";

export const savingSchema = Joi.object({
  userId: Joi.string(),

  name: Joi.string()
    .required()
    .messages({
      "string.empty": "Tên không được để trống",
      "any.required": "Tên là bắt buộc",
    }),

  targetAmount: Joi.number().positive().required().messages({
    "number.base": "Số tiền mục tiêu phải là số",
    "number.positive": "Số tiền mục tiêu phải lớn hơn 0",
    "any.required": "Số tiền mục tiêu là bắt buộc",
  }),

  currentAmount: Joi.number().positive().required().messages({
    "number.base": "Số tiền hiện tại phải là số",
    "number.positive": "Số tiền hiện tại phải lớn hơn 0",
    "any.required": "Số tiền hiện tại là bắt buộc",
  }),

  description: Joi.string().max(50).required().messages({
    "string.empty": "Nội dung không được để trống",
    "string.max": "Nội dung không được vượt quá 50 ký tự",
    "string.min": "Nội dung phải hơn 5 ký tự",
    "any.required": "Nội dung là bắt buộc",
  }),
});
