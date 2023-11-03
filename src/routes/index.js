import HomePage from "../page/home"
import LoginPage from "../page/login"
import SearchPage from "../page/search"
import RegisterPage from "../page/register"
import Cus_Infro from "../page/cus_infor"
import DoiThuong from "../page/doithuong"
import Histour from "../page/histour"
import Repass from "../page/repass"
const defaultRoute = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/search', component: SearchPage },
    { path: '/register', component: RegisterPage },
    { path: '/cus_info', component: Cus_Infro },
    { path: '/doithuong', component: DoiThuong },
    { path: '/histour', component: Histour },
    { path: '/repass', component: Repass },
]
export { defaultRoute }