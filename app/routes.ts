import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/Dashboard.tsx"),
  route("spending", "routes/Spending.tsx"),
  route("login", "./routes/login/Login.tsx"),
  route("register", "./routes/register/Register.tsx"),
  route("transaction", "./routes/transaction/Transaction.tsx"),
  route("history", "./routes/history/History.tsx"),
  route("savings", "./routes/saving/Saving.tsx"),
] satisfies RouteConfig;
