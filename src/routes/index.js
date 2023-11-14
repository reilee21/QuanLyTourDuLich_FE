import HomePage from "../page/home/ImageSlider";
import LoginPage from "../page/login";
import SearchPage from "../page/search";
import RegisterPage from "../page/register";
import Cus_Infro from "../page/cus_infor";
import DoiThuong from "../page/doithuong";
import Histour from "../page/histour";
import Repass from "../page/repass";
import Contact from "../page/contact";
import FAQ from "../page/FAQ";

import OrderHotel from "../page/orderhotel";
import OrderTour from "../page/ordertour";
import News from "../page/News/NewsPage";
import NewsArticlePage from "../page/News/NewsArticle";
import TourDetail from "../page/ordertour/tourdetail";
import HotelDetail from "../page/orderhotel/hoteldetail";
// const defaultRoute = [
//     { path: '/', component: HomePage },
//     { path: '/login', component: LoginPage },
//     { path: '/search', component: SearchPage },
//     { path: '/register', component: RegisterPage },
//     { path: '/cus_info', component: Cus_Infro },
//     { path: '/doithuong', component: DoiThuong },
//     { path: '/histour', component: Histour },
//     { path: '/repass', component: Repass },
//     { path: '/contact', component: Contact },
//     { path: '/FAQ', component: FAQ },
//     { path: '/orderhotel', component: OrderHotel },
//     { path: '/ordertour', component: OrderTour },
//     { path: '/new', component: News },
// ]
// export { defaultRoute }
// =======

import {
  PhuongTien,
  DiaDiem,
  DoiTac,
  NhanVien,
  TaiKhoanNV,
  KhachHang,
  TaiKhoanKH,
  DiemDen,
  DanhGia,
  HoiDap,
  Voucher,
  BaiViet,
  EditBaiViet,
  AddBaiViet,
  PreviewBaiViet,
  Tour,
  AddTour,
  EditTour,
  KhachSan,
  AddKhachSan,
  EditKhachSan,
  KhuyenMai,
  AddKhuyenMai,
  EditKhuyenMai,
} from "../page/quanly/export";

const defaultRoute = [
  { path: "/", component: HomePage },
  { path: "/search", component: SearchPage },
  { path: "/contact", component: Contact },
  { path: "/FAQ", component: FAQ },
  { path: "/orderhotel", component: OrderHotel },
  { path: "/hoteldetail/:hotelId", component: HotelDetail },

  { path: "/ordertour", component: OrderTour },
  { path: "/tourdetail/:tourId", component: TourDetail },

  { path: "/news", component: News },
  { path: "/news/:id", component: NewsArticlePage },
];
const NotLogInRoute = [
  { path: "login", component: LoginPage },
  { path: "/", component: HomePage },
  { path: "register", component: RegisterPage },
];
const IsLoginRoute = [
  { path: "/cus_info", component: Cus_Infro },
  { path: "/doithuong", component: DoiThuong },
  { path: "/histour", component: Histour },
  { path: "/repass", component: Repass },
];
const quanlyRoute = [
  { path: "/admin", component: PhuongTien },
  { path: "ptdv/phuongtien", component: PhuongTien },
  { path: "ptdv/diadiem", component: DiaDiem },
  { path: "ptdv/diemden", component: DiemDen },
  { path: "ptdv/tour", component: Tour },
  { path: "ptdv/tour/them", component: AddTour },
  { path: "ptdv/tour/:id", component: EditTour },
  { path: "ptdv/khachsan", component: KhachSan },
  { path: "ptdv/khachsan/add", component: AddKhachSan },
  { path: "ptdv/khachsan/:id", component: EditKhachSan },
  { path: "ptdv/khuyenmai", component: KhuyenMai },
  { path: "ptdv/khuyenmai/add", component: AddKhuyenMai },
  { path: "ptdv/khuyenmai/:id", component: EditKhuyenMai },

  { path: "more/doitac", component: DoiTac },
  { path: "more/nhanvien", component: NhanVien },
  { path: "more/nhanvien/taikhoannv", component: TaiKhoanNV },
  { path: "more/hoidap", component: HoiDap },
  { path: "more/voucher", component: Voucher },
  { path: "more/baiviet", component: BaiViet },
  { path: "more/baiviet/:id", component: EditBaiViet },
  { path: "more/baiviet/:id/preview", component: PreviewBaiViet },
  { path: "more/baiviet/them", component: AddBaiViet },

  { path: "cskh/thanhvien", component: KhachHang },
  { path: "cskh/thanhvien/taikhoan", component: TaiKhoanKH },
  { path: "cskh/phanhoi", component: DanhGia },
];
export { defaultRoute, quanlyRoute, NotLogInRoute, IsLoginRoute };
