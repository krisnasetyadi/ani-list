import { lazy } from 'react'
import { RouteProps } from './main-navigation';

const Home = lazy(() => import('../screens/home-screen'));
const ListScreen = lazy(() => import('../screens/list-screen/index'))
const ListScreenShow = lazy(() => import('../screens/list-screen/show'));

export const MenuItem: RouteProps[] = [
    {
        displayName: 'Home',
        name: 'home-screen',
        showmenu: false,
        exact: true,
        route: '/',
        component: Home,
        routes: [
            {
                displayName: 'List Screen',
                name: 'list',
                showmenu: false,
                exact: true,
                route: '/list',
                component: ListScreen,
                routes: [
                    {
                        displayName: 'Details',
                        name: 'list-detail',
                        showmenu: false,
                        exact: true,
                        route: '/list/:id/show',
                        component: ListScreenShow
                    }
                ]
            }
           
        ]
    }
]