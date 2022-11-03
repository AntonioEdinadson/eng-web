import { useRoutes } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { SMBios } from '../pages/Product/SMBios';
import { Error } from "../pages/Error";
import { WindowsVersion } from '../pages/Product/WindowsVersion';
import { SecureBoot } from '../pages/Product/SecureBoot';
import { SDCard } from '../pages/Product/SDCard';
import { ModelDPK } from '../pages/Product/ModelDPK';
import { ModelDPKConfig } from '../pages/Product/ModelDPKConfig';
import { Resolution } from '../pages/Product/Resolution';

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
            path: '/product/secureboot',
            element: <SecureBoot />
        },
        {
            path: '/product/sdcard',
            element: <SDCard />
        },
        {
            path: '/product/modeldpk',
            element: <ModelDPK />
        },
        {
            path: '/product/modeldpkconfig',
            element: <ModelDPKConfig />
        },
        {
            path: '/product/modelresolution',
            element: <Resolution />
        },
        {
            path: '*',
            element: <Error />
        }
    ]);
}