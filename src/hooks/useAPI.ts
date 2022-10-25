import axios from 'axios';
import { ISMBios, IWindowsVersion } from '../interfaces/IProduct';

const http = axios.create({
    baseURL: 'http://localhost:4001/api/',
    headers: { "Content-Type": "application/json" },
});

const useSmbios = {

    GetAllSMbios: async () => {
        const request = await http.get('smbios');
        return request.data;
    },

    GetSMbios: async (search: string) => {
        const request = await http.get(`smbios?search=${search}`);
        return request.data;
    },

    CreateSMbios: async (smbios: ISMBios) => {
        const request = await http.post('smbios', smbios);
        return request.data;
    },

    UpdateSmbios: async (smbios?: ISMBios) => {
        const request = await http.put(`smbios/${smbios?.id}`, smbios);
        return request.data;
    },

    DeleteSmbios: async (id: string) => {
        const request = await http.delete(`smbios/${id}`);
        return request.data;
    }
};

const useWindowsVersion = {
    GetAllWindowsVersion: async () => {
        const request = await http.get('windowsversion');
        return request.data;
    },

    GetWindowsVersion: async (search: string) => {
        const request = await http.get(`windowsversion?search=${search}`);
        return request.data;
    },

    CreateWindowsVersion: async (version: IWindowsVersion) => {
        const request = await http.post('windowsversion', version);
        return request.data;
    }
};

export { useSmbios, useWindowsVersion };