import {HomePage} from './pages/home-page.jsx'
import {AboutUs} from './pages/about-us.jsx'
import {StayApp} from './pages/stay-app.jsx'
import {ReviewApp} from './pages/review-app.jsx'
// import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { StayDetails } from './pages/stay-details.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path:'/',
        component: HomePage,
    },
    {
        path:'/stay',
        component: StayApp,
    },
    {
        path: '/stay/:stayId',
        component: StayDetails,
    },
    // {
    //     path: '/stay/edit/:stayId',
    //     component: StayEdit,
    // },
    {
        path:'/review',
        component: ReviewApp,
    },
    // {
    //     path:'/chat',
    //     component: ChatApp,
    // },
    {
        path:'/about',
        component: AboutUs,
      
    },
    {
        path:'/admin',
        component: AdminApp,
    }
]

export default routes;