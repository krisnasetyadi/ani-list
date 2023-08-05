import { lazy } from 'react'
import { RouteProps } from './main-navigation';

const Home = lazy(() => import('../screens/home-screen'));
const AnimeListScreen = lazy(() => import('../screens/list-screen/index'));
const AnimeAddScreen = lazy(() => import('../screens/list-screen/add'))
const AnimeShowScreen = lazy(() => import('../screens/list-screen/show'));

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
                component: AnimeListScreen,
                routes: [
                    {
                        displayName: 'Add Collection',
                        name: 'add-collection',
                        showmenu: false,
                        exact: true,
                        route: '/list/:id/add',
                        component: AnimeAddScreen
                    },
                    {
                        displayName: 'Anime Details',
                        name: 'list-detail',
                        showmenu: false,
                        exact: true,
                        route: '/list/:id/show',
                        component: AnimeShowScreen
                    }
                ]
            }
           
        ]
    }
]