"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Khai báo bộ quy tắc (Schema) bằng Zod
const registerSchema = z.object({
  name: z.string().min(1, "Họ và tên không được để trống!"),
  email: z.string().email("Email không đúng định dạng!"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
});

// Trích xuất kiểu dữ liệu từ schema
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  // 2. Tích hợp React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    alert("Đăng ký thành công!");
    console.log("Dữ liệu đăng ký:", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Đăng ký tài khoản</h2>
          <p className="mt-2 text-sm text-gray-600">Khởi đầu hành trình của bạn ngay hôm nay</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block ml-1">
              Họ và tên
            </label>
            <input
              {...register("name")}
              type="text"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400`}
              placeholder="Nhập tên đầy đủ của bạn..."
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block ml-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400`}
              placeholder="example@domain.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block ml-1">
              Mật khẩu
            </label>
            <input
              {...register("password")}
              type="password"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 mt-4 uppercase tracking-wider"
          >
            Đăng ký
          </button>
        </form>
        
        <div className="mt-8 text-center border-t pt-6 border-gray-100">
          <p className="text-sm text-gray-500">
            Đã có tài khoản? <span className="text-blue-600 cursor-pointer font-medium hover:underline">Đăng nhập ngay</span>
          </p>
        </div>
      </div>
    </main>
  );
}
