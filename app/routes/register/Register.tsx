import type React from "react";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router";
import icon from "../../Image/icon.png";
import useRegister from "./useRegister";
import { Spin } from "antd";

const Register = () => {
  const { errors, handleSubmit, onRegister, register, isPending } =
    useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  return (
    <div className="h-[100vh] flex">
      <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-pulse"></div>
          <div
            className="absolute bottom-40 right-16 w-24 h-24 rounded-full bg-gradient-to-r from-blue-400/15 to-cyan-400/15 animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/25 to-pink-400/25 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="absolute top-32 right-20 opacity-10 animate-float">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div
            className="absolute bottom-60 left-32 opacity-10 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <PieChart className="w-6 h-6" />
          </div>
          <div
            className="absolute top-2/3 left-16 opacity-10 animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <DollarSign className="w-7 h-7" />
          </div>

          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <img src={icon} alt="" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SpendSense
            </h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold mb-4 text-balance leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Bắt đầu hành trình
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  tài chính thông minh
                </span>
              </h2>
              <p className="text-xl text-gray-300 text-pretty leading-relaxed">
                Theo dõi chi tiêu, lập kế hoạch đầu tư và đạt được mục tiêu tài
                chính của bạn
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">SpendSense</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-8 pb-6">
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Đăng ký
              </h2>
              <p className="text-center text-gray-600 mt-2">
                Điền thông tin để bắt đầu hành trình tài chính
              </p>
            </div>
            <div className="px-8 pb-8 space-y-6">
              <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên"
                    {...register("userName")}
                    className={`w-full h-12 px-4 border  rounded-lg focus:ring-2  outline-none transition-colors ${errors?.userName ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"}`}
                  />
                  <div className="text-red-500">
                    {errors?.userName?.message as string}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className={`w-full h-12 px-4 border  rounded-lg focus:ring-2  outline-none transition-colors ${errors?.email ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"}`}
                  />
                  <div className="text-red-500">
                    {errors?.email?.message as string}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      {...register("password")}
                      className={`w-full h-12 px-4 pr-12 border rounded-lg focus:ring-2 outline-none transition-colors ${errors?.password ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"}`}
                    />

                    <button
                      type="button"
                      className="absolute right-0 top-0 h-12 px-3 flex items-center justify-center cursor-pointer rounded-r-lg transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors?.password?.message && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password.message as string}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nhập lại mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={confirmShowPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      {...register("confirmPassword")}
                      className={`w-full h-12 px-4 pr-12 border rounded-lg focus:ring-2 outline-none transition-colors ${errors?.confirmPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"}`}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-12 px-3 flex items-center justify-center cursor-pointer rounded-r-lg transition-colors"
                      onClick={() =>
                        setConfirmShowPassword(!confirmShowPassword)
                      }
                    >
                      {confirmShowPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors?.confirmPassword?.message && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message as string}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
                >
                 {isPending?<Spin/> :"Đăng ký"} 
                </button>
              </form>

              <div className="text-center">
                <span className="text-gray-600">Đã có tài khoản? </span>
                <Link
                  to="/login"
                  className="text-emerald-600 hover:text-emerald-500 font-semibold"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 -mt-4">
            Bằng cách tạo tài khoản, bạn xác nhận rằng bạn đã đọc và hiểu
            <br />
            <span className="text-emerald-600 hover:text-emerald-500 ml-1">
              Điều khoản sử dụng
            </span>{" "}
            và{" "}
            <span className="text-emerald-600 hover:text-emerald-500">
              Chính sách bảo mật
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
