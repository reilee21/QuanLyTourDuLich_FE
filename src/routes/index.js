import HomePage from "../page/home/ImageSlider";
import LoginPage from "../page/login";
import RegisterPage from "../page/register";
import Cus_Infro from "../page/cus_infor";
import Repass from "../page/repass";
import Contact from "../page/contact";
import FAQ from "../page/FAQ";
import TraCuuBooking from "../page/tracuubk";
import OrderHotel from "../page/orderhotel";
import OrderTour from "../page/ordertour";
import News from "../page/News/NewsPage";
import NewsArticlePage from "../page/News/NewsArticle";
import TourDetail from "../page/ordertour/tourdetail";
import HotelDetail from "../page/orderhotel/hoteldetail";
import BookTour from "../page/ordertour/bookingtour";
import Payment from "../page/ordertour/payment";
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
  EmployeeInfo,
  Booking,
  DetailBooking,
} from "../page/quanly/export";

const defaultRoute = [
  { path: "/", component: HomePage },
  { path: "/contact", component: Contact },
  { path: "/FAQ", component: FAQ },
  { path: "/timkiemkhachsan", component: OrderHotel },
  { path: "/tracuubooking/:bookingid", component: TraCuuBooking },

  { path: "/timkiemtour", component: OrderTour },
  { path: "/timkiemtour/:tendiadiem", component: OrderTour },

  { path: `/tour/:tourId`, component: TourDetail },

  { path: "/news", component: News },
  { path: "/news/:id", component: NewsArticlePage },
  { path: `/booking/tour/:tourId`, component: BookTour },
  { path: "/hoteldetail/:hotelId", component: HotelDetail },
];
const NotLogInRoute = [
  { path: "login", component: LoginPage },
  { path: "/", component: HomePage },
  { path: "register", component: RegisterPage },
];
const IsLoginRoute = [
  { path: "/thongtintaikhoan", component: Cus_Infro },
  { path: "/doimatkhau", component: Repass },

  { path: "/booking/payment", component: Payment },
];
const quanlyRoute = [
  { path: "/admin", component: PhuongTien },

  { path: "taikhoancanhan", component: EmployeeInfo },

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

  { path: "booking", component: Booking },
  { path: "booking/:bookingid", component: DetailBooking },

  { path: "booking/thanhvien", component: KhachHang },
  { path: "booking/thanhvien/taikhoan", component: TaiKhoanKH },

  { path: "cskh/thanhvien", component: KhachHang },
  { path: "cskh/thanhvien/taikhoan", component: TaiKhoanKH },
  { path: "cskh/phanhoi", component: DanhGia },
];
export { defaultRoute, quanlyRoute, NotLogInRoute, IsLoginRoute };
