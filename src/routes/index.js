import HomePage from "../page/home";
import LoginPage from "../page/login";
import SearchPage from "../page/search";
import RegisterPage from "../page/register";
import PhuongTien from "../page/quanly/phuongtien";
import DiaDiem from "../page/quanly/diadiem";
const defaultRoute = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/search", component: SearchPage },
  { path: "/register", component: RegisterPage },
];

const quanlyRoute = [
  { path: "/admin", component: HomePage },
  { path: "/admin/ptdv/phuongtien", component: PhuongTien },
  { path: "/admin/ptdv/diadiem", component: DiaDiem },
];
export { defaultRoute, quanlyRoute };
