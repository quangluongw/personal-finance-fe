import Joi from "joi";

export const deptSchema = Joi.object({
  type: Joi.string().valid("lending", "borrowing").messages({
    "any.only": "Loại giao dịch không hợp lệ",
  }),

  person: Joi.string().trim().min(2).required().messages({
    "string.empty": "Vui lòng nhập tên người",
    "string.min": "Tên phải ít nhất 2 ký tự",
  }),

  amount: Joi.number().min(1).required().messages({
    "number.base": "Số tiền phải là số",
    "number.min": "Số tiền phải lớn hơn 0",
    "any.required": "Vui lòng nhập số tiền",
  }),

  description: Joi.string().allow("", null),

  paidAmount: Joi.number()
    .min(0)
    .allow(null)
    .optional()
    .less(Joi.ref("amount"))
    .messages({
      "number.base": "Số tiền đã trả phải là số",
      "number.min": "Số tiền đã trả không hợp lệ",
      "number.less": "Số tiền đã trả phải nhỏ hơn số tiền",
    }),
});

export const deptUpdateSchema = Joi.object({

  amount: Joi.number().min(1).required().messages({
    "number.base": "Số tiền phải là số",
    "number.min": "Số tiền phải lớn hơn 0",
    "any.required": "Vui lòng nhập số tiền",
  }),

  note: Joi.string().allow("", null),

});