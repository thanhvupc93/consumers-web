import { Icon } from '@iconify/react';

export const SIDENAV_ITEMS = [
    {
        title: 'home',
        path: '/',
        icon: <Icon icon="lucide:home" width="24" height="24" />,
    },
    {
        title: 'dog',
        path: '/',
        icon: <Icon icon="lucide:folder" width="24" height="24" />,
        submenu: true,
        subMenuItems: [
            { title: 'nuts', path: '/' },
            { title: 'wet', path: '/' },
            { title: 'snack', path: '/' },
        ],
    },
    {
        title: 'cat',
        path: '/',
        icon: <Icon icon="lucide:folder" width="24" height="24" />,
        submenu: true,
        subMenuItems: [
            { title: 'nuts', path: '/' },
            { title: 'wet', path: '/' },
            { title: 'snack', path: '/' },
        ],
    },
    {
        title: 'toy',
        path: '/',
        icon: <Icon icon="lucide:settings" width="24" height="24" />,
    },
    {
        title: 'clothing',
        path: '/',
        icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
    },
];