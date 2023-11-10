import HomePage from "../page/home/ImageSlider"
import LoginPage from "../page/login"
import SearchPage from "../page/search"
import RegisterPage from "../page/register"
import Cus_Infro from "../page/cus_infor"
import DoiThuong from "../page/doithuong"
import Histour from "../page/histour"
import Repass from "../page/repass"
import Contact from "../page/contact"
import FAQ from "../page/FAQ"
import OrderHotel from "../page/orderhotel"
import BookTour from "../page/booktour"
const defaultRoute = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/search', component: SearchPage },
    { path: '/register', component: RegisterPage },
    { path: '/cus_info', component: Cus_Infro },
    { path: '/doithuong', component: DoiThuong },
    { path: '/histour', component: Histour },
    { path: '/repass', component: Repass },
    { path: '/contact', component: Contact },
    { path: '/FAQ', component: FAQ },
    { path: '/orderhotel', component: OrderHotel },
    { path: '/booktour', component: BookTour },

]
export { defaultRoute }