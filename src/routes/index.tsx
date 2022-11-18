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

export const RoutesList = () => {
    return useRoutes([

        // HOME
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/home',
            element: <Home />
        },

        // PRODUTC
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

        // LINE CONFIG        
        {
            path: '/lineconfig/setup',
            element: <LineConfig />
        },
        {
            path: '/lineconfig/createimage',
            element: <CreateImage />
        },

        // CONFIG
        {
            path: '*',
            element: <Error />
        }
    ]);
}