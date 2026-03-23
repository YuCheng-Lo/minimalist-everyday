import axiosInstance from "../services/axiosInstance";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { showAsyncMessage } from "../slices/messageSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const [tokenData, setTokenData] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await axiosInstance.post(`/admin/signin`, data);
      const { token, expired } = res.data;

      setTokenData({ token, expired });
    } catch {
      dispatch(
        showAsyncMessage({
          id: crypto.randomUUID(),
          type: "danger",
          title: "驗證失敗",
          text: "登入失敗! 請重新嘗試",
        }),
      );
    }
  };

  useEffect(() => {
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    if (cookieToken) {
      // 有 Token 時才去檢查
      const checkAdminLogin = async () => {
        try {
          await axiosInstance.post(`/api/user/check`);
          navigate("/admin/products");
        } catch {
          // token 失效，清掉 cookie
          document.cookie =
            "hexToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      };
      checkAdminLogin();
      return;
    }

    if (tokenData) {
      const { token, expired } = tokenData;

      document.cookie = `hexToken=${token}; expires=${new Date(
        expired,
      )};  path=/`;

      navigate("/admin/products");
    }
  }, [tokenData, navigate]);
  return (
    <div
      className="bg-light d-flex align-items-center justify-content-center vh-100"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            {/* 登入卡片容器 */}
            <div className="card border-0 shadow-lg rounded-4 p-4 p-sm-5">
              <div className="text-center mb-4">
                <h1 className="h2 fw-bold text-primary">拾光日常</h1>
                <p className="text-muted">管理系統控制台</p>
              </div>

              <form
                id="form"
                className="form-signin"
                onSubmit={handleSubmit(handleLogin)}
              >
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${loginErrors.username ? "is-invalid" : ""}`}
                    id="username"
                    placeholder="name@example.com"
                    {...register("username", {
                      required: "Email為必填",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email格式有誤",
                      },
                    })}
                    autoFocus
                  />
                  <label htmlFor="username">電子信箱</label>
                  {loginErrors.username && (
                    <div className="invalid-feedback text-start">
                      {loginErrors.username.message}
                    </div>
                  )}
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className={`form-control ${loginErrors.password ? "is-invalid" : ""}`}
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "密碼為必填",
                      minLength: { value: 6, message: "密碼至少需要 6 碼" },
                    })}
                  />
                  <label htmlFor="password">密碼</label>
                  {loginErrors.password && (
                    <div className="invalid-feedback text-start">
                      {loginErrors.password.message}
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-primary w-100 py-3 mb-3 fw-bold shadow-sm"
                  type="submit"
                  style={{ borderRadius: "10px", transition: "all 0.3s" }}
                >
                  安全登入
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="small text-muted mb-0">
                  &copy; 2026 - 拾光日常後台管理
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
