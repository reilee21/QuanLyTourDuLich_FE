import HomePage from "../page/home"
import LoginPage from "../page/login"
import SearchPage from "../page/search"
import RegisterPage from "../page/register"
import PhuongTien from "../page/quanly/phuongtien"
const defaultRoute = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/search', component: SearchPage },
    { path: '/register', component: RegisterPage },
]

const quanlyRoute = [
    { path: '/', component: HomePage },
    { path: '/phuongtien', component: PhuongTien }

]
export { defaultRoute, quanlyRoute }