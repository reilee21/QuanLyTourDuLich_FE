import HomePage from "../page/home"
import LoginPage from "../page/login"
import SearchPage from "../page/search"



const defaultRoute = [
    {path:'/', component: HomePage},
    {path:'/login', component: LoginPage},
    {path:'/search', component: SearchPage},
    {path:'/register', component: SearchPage},
]

const clientLoginRoute =[
    {path:'/', component: HomePage},
    {path:'/login', component: HomePage},
    {path:'/search', component: SearchPage},
    {path:'/register', component: SearchPage},
]



export {defaultRoute, clientLoginRoute}