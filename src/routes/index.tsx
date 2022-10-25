import { useRoutes } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { SMBios } from '../pages/Product/SMBios';
import { Error } from "../pages/Error";
import { WindowsVersion } from '../pages/Product/WindowsVersion';

export const RoutesList = () => {
    return useRoutes([
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/product/smbios',
            element: <SMBios />
        },
        {
            path: '/product/windowsversion',
            element: <WindowsVersion />
        },
        {
            path: '*',
            element: <Error />
        }
    ]);
}