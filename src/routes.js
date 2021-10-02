import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { StayApp } from './pages/stay-app.jsx'
import { ReviewApp } from './pages/review-app.jsx'
// import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { SearchBar } from './cmps/search-bar.jsx'
import { LoginPage } from './pages/login.jsx'
import { TripsPage } from './pages/trips-page.jsx'
import { HostPage } from './pages/host-page.jsx'
// import { Login } from './pages/'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: HomePage,
    },
   
    {
        path: '/explore/',
        component: StayApp,
    },
    {
        path: '/stay/:stayId',
        component: StayDetails,
    },
    {
        path: '/review',
        component: ReviewApp,
    },
    {
        path: '/trips',
        component: TripsPage,
    },
    {
        path: '/host',
        component: HostPage,
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/about',
        component: AboutUs,

    },
    {
        path: '/admin',
        component: AdminApp,
    }
]

export default routes;