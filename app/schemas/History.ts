import Joi from "joi";

export const transactionSchema = Joi.object({
  userId: Joi.string(),

  categoryId: Joi.string()
    .required()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .messages({
      "string.empty": "Danh mục không được để trống",
      "any.required": "Danh mục là bắt buộc",
    }),

  transactionType: Joi.string().valid("expense", "income"),

  amount: Joi.number().positive().required().messages({
    "number.base": "Tiền phải là số",
    "number.positive": "Tiền phải lớn hơn 0",
    "any.required": "Tiền là bắt buộc",
  }),

  description: Joi.string().max(50).required().messages({
    "string.empty": "Nội dung không được để trống",
    "string.max": "Nội dung không được vượt quá 50 ký tự",
    "string.min": "Nội dung phải hơn 5 ký tự",
    "any.required": "Nội dung là bắt buộc",
  }),
});
