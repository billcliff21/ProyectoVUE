import Home from './components/home.vue';
import Login from './components/login.vue';
import UserProfile from './components/user-profile.vue';
import Actividades from './components/Gestion-de-Proyectos/actividades.vue';
import Tareas from './components/Gestion-de-Proyectos/tareas.vue';
import Acercade from './components/acercade.vue';
import NotFoundPage from './components/notfoundpage.vue'

export const routes =[
    { path: '/',component: Home },
    { path: '/Login',component: Login },
    { path: '/UserProfile',component: UserProfile },    
    { path: '/About',component: Acercade },
    { path: '/Tareas/:id',component: Tareas },  
    { path: '/Actividades',component: Actividades },
    { path: '*',component: NotFoundPage}
];