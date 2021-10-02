import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { Explore } from './pages/explore.jsx'
import { ReviewApp } from './pages/review-app.jsx'
// import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { LoginPage } from './pages/login.jsx'
import { TripsPage } from './pages/trips-page.jsx'
// import { Login } from './pages/'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: HomePage,
    },
   
    {
        path: '/explore/',
        component: Explore,
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