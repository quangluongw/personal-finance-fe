import {
  BarChart3,
  DollarSign,
  Eye,
  EyeOff,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import icon from "../../Image/icon.png";
import useLogin from "./useLogin";
import { Spin } from "antd";

const Login = () => {
  const { errors, handleSubmit, isPending, onLogin, register } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-[100vh] flex">
      {/* Left side - Enhanced Branding and Features */}
      <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-pulse"></div>
          <div
            className="absolute bottom-40 right-16 w-24 h-24 rounded-full bg-gradient-to-r from-blue-400/15 to-cyan-400/15 animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/25 to-pink-400/25 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Floating icons */}
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

          {/* Grid pattern overlay */}
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
                  Quản lý tài chính
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  thông minh
                </span>
              </h2>
              <p className="text-xl text-gray-300 text-pretty leading-relaxed">
                Theo dõi chi tiêu, lập kế hoạch đầu tư và đạt được mục tiêu tài
                chính của bạn với công nghệ AI tiên tiến
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
                Đăng nhập
              </h2>
              <p className="text-center text-gray-600 mt-2">
                Nhập thông tin để truy cập tài khoản của bạn
              </p>
            </div>
            <div className="px-8 pb-8 space-y-6">
              <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
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
                    {...register("email")}
                    placeholder="your@email.com"
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
                      {...register("password")}
                      placeholder="Nhập mật khẩu"
                      className={`w-full h-12 px-4 border  rounded-lg focus:ring-2  outline-none transition-colors ${errors?.password ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"}`}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-12 px-3 flex items-center justify-center rounded-r-lg transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                    <div className="text-red-500">
                      {errors?.password?.message as string}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
                >
                  {isPending ? <Spin /> : "Đăng nhập"}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <hr className="w-full border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Hoặc</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="h-12 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button className="h-12 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>

              <div className="text-center">
                <span className="text-gray-600">Chưa có tài khoản? </span>
                <Link
                  to="/register"
                  className="text-emerald-600 hover:text-emerald-500 font-semibold"
                >
                  Đăng ký ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 -mt-4">
            Bằng cách đăng nhập, bạn đồng ý với
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
export default Login;
