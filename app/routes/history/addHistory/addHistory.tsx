import { Input, InputNumber, Modal, Radio, Select } from "antd";
import type { Caterori } from "~/Types/caterori";
import useAddHistory from "./useAddHistory";
import { Controller } from "react-hook-form";

const AddHistory = ({
  isModalOpen,
  handleCancel,
  dataCaterori,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  handleOk: any;
  handleCancel: any;
  dataCaterori: Caterori[];
  setIsModalOpen:any;
}) => {
  const { control, errors, handleSubmit, isPending, onLogin } =
    useAddHistory(setIsModalOpen);
  return (
    <Modal
      title="Thêm giao dịch"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onOk={handleSubmit(onLogin)}
      onCancel={handleCancel}
      okButtonProps={{ loading: isPending, disabled: isPending }}
      cancelButtonProps={{ disabled: isPending }}
    >
      <div className="flex flex-col gap-4">
        {/* Loại giao dịch */}
        <div className="flex flex-col gap-1">
          <label>Loại giao dịch</label>
          <Controller
            name="transactionType"
            control={control}
            defaultValue="income"
            render={({ field }) => (
              <Radio.Group
                {...field}
                size="large"
                onChange={(e) => field.onChange(e.target.value)}
              >
                <Radio.Button value="income">Thu nhập</Radio.Button>
                <Radio.Button value="expense">Chi tiêu</Radio.Button>
              </Radio.Group>
            )}
          />
          {errors?.transactionType && (
            <span className="text-red-500 text-sm">
              {errors.transactionType.message as string}
            </span>
          )}
        </div>

        {/* Danh mục */}
        <div className="flex flex-col gap-1">
          <label>Danh mục</label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: "100%" }}
                options={dataCaterori?.map((item: Caterori) => ({
                  value: item._id,
                  label: item.name,
                }))}
                className={`${errors?.categoryId && "!border-[1px] !border-red-500 rounded-md"}`}
                onChange={(value) => field.onChange(value)}
                placeholder="Chọn danh mục"
              />
            )}
          />
          {errors?.categoryId && (
            <span className="text-red-500 text-sm">
              {errors.categoryId.message as string}
            </span>
          )}
        </div>

        {/* Số tiền */}
        <div className="flex flex-col gap-1">
          <label>Số tiền</label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                style={{ width: "100%" }}
                min={0}
                className={`${errors?.amount && "!border-[1px] !border-red-500"}`}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                placeholder="Nhập số tiền (VND)"
              />
            )}
          />
          {errors?.amount && (
            <span className="text-red-500 text-sm">
              {errors.amount.message as string}
            </span>
          )}
        </div>

        {/* Mô tả */}
        <div className="flex flex-col gap-1">
          <label>Mô tả</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={3}
                placeholder="Nhập nội dung"
                maxLength={255}
                onChange={(value) => field.onChange(value)}
                className={`${errors?.description && "!border-[1px] !border-red-500"}`}
              />
            )}
          />
          {errors?.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message as string}
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddHistory;
