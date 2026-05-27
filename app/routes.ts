import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/dashboard/Dashboard.tsx"),
  route("spending", "routes/Spending.tsx"),
  route("login", "./routes/login/Login.tsx"),
  route("register", "./routes/register/Register.tsx"),
  route("transaction", "./routes/transaction/Transaction.tsx"),
  route("history", "./routes/history/History.tsx"),
  route("savings", "./routes/saving/Saving.tsx"),
  route("account", "./routes/account/Account.tsx"),
  route("dept", "./routes/dept/Dept.tsx"),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
