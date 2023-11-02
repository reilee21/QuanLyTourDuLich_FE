import HomePage from "../page/home"
import LoginPage from "../page/login"
import SearchPage from "../page/search"
import RegisterPage from "../page/register"
const defaultRoute = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/search', component: SearchPage },
    { path: '/register', component: RegisterPage },

]
export { defaultRoute }