import { useRoutes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SMBios } from '../pages/Product/SMBios';
import { Error } from "../pages/Error";
import { WindowsVersion } from '../pages/Product/WindowsVersion';
import { SecureBoot } from '../pages/Product/SecureBoot';
import { SDCard } from '../pages/Product/SDCard';
import { ModelDPK } from '../pages/Product/ModelDPK';
import { ModelDPKConfig } from '../pages/Product/ModelDPKConfig';
import { Resolution } from '../pages/Product/Resolution';
import { LineConfig } from '../pages/LineConfig/LineSetup';
import { CreateImage } from '../pages/LineConfig/CreateImage';
import { AssociateImage } from '../pages/LineConfig/AssociateImage';
import { Login } from '../pages/Login';

import { RequireAuth } from '../context/Auth/RequireAuth';
import { SystemInfo } from '../pages/Product/SystemInfo';

export const RoutesList = () => {
    return useRoutes([

        // HOME
        {
            path: '/',
            element: <RequireAuth><Home /></RequireAuth>
        },
        {
            path: '/home',
            element: <RequireAuth><Home /></RequireAuth>
        },

        // PRODUTC
        {
            path: '/product/smbios',
            element: <RequireAuth><SMBios /></RequireAuth>
        },
        {
            path: '/product/systeminfo',
            element: <RequireAuth><SystemInfo /></RequireAuth>
        },
        {
            path: '/product/windowsversion',
            element: <RequireAuth><WindowsVersion /></RequireAuth>
        },
        {
            path: '/product/secureboot',
            element: <RequireAuth><SecureBoot /></RequireAuth>
        },
        {
            path: '/product/sdcard',
            element: <RequireAuth><SDCard /></RequireAuth>
        },
        {
            path: '/product/modeldpk',
            element: <RequireAuth><ModelDPK /></RequireAuth>
        },
        {
            path: '/product/modeldpkconfig',
            element: <RequireAuth><ModelDPKConfig /></RequireAuth>
        },
        {
            path: '/product/modelresolution',
            element: <RequireAuth><Resolution /></RequireAuth>
        },

        // LINE CONFIG        
        {
            path: '/lineconfig/setup',
            element: <RequireAuth><LineConfig /></RequireAuth>
        },
        {
            path: '/lineconfig/createimage',
            element: <RequireAuth><CreateImage /></RequireAuth>
        },
        {
            path: '/lineconfig/associateimage',
            element: <RequireAuth><AssociateImage /></RequireAuth>
        },
        {
            path: '/login',
            element: <Login />
        },

        // CONFIG
        {
            path: '*',
            element: <Error />
        }
    ]);
}