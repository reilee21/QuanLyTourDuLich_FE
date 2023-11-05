import HomePage from "../page/home";
import LoginPage from "../page/login";
import SearchPage from "../page/search";
import RegisterPage from "../page/register";

import Cus_Infro from "../page/cus_infor";
import DoiThuong from "../page/doithuong";
import Histour from "../page/histour";
import Repass from "../page/repass";
import Contact from "../page/contact";
import {
  PhuongTien,
  DiaDiem,
  DoiTac,
  NhanVien,
  TaiKhoanNV,
} from "../page/quanly/export";
const defaultRoute = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/search", component: SearchPage },
  { path: "/register", component: RegisterPage },
  { path: "/cus_info", component: Cus_Infro },
  { path: "/doithuong", component: DoiThuong },
  { path: "/histour", component: Histour },
  { path: "/repass", component: Repass },
  { path: "/contact", component: Contact },
];

const quanlyRoute = [
  { path: "/admin", component: HomePage },
  { path: "ptdv/phuongtien", component: PhuongTien },
  { path: "ptdv/diadiem", component: DiaDiem },
  { path: "more/doitac", component: DoiTac },
  { path: "more/nhanvien", component: NhanVien },
  { path: "more/nhanvien/taikhoannv", component: TaiKhoanNV },
];
export { defaultRoute, quanlyRoute };
