import axios from 'axios';
import { ISecureBoot, ISMBios, IWindowsVersion } from '../interfaces/IProduct';

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
    },

    UpdateWindowsVersion: async (version?: IWindowsVersion) => {
        const request = await http.put(`windowsversion/${version?.id}`, version);
        return request.data;
    },

    DeleteWindowsVersion: async (id: string) => {
        const request = await http.delete(`windowsversion/${id}`);
        return request.data;
    }
};

const useSecureBoot = {
    GetAllSecureBoot: async () => {
        const request = await http.get('secureboot');
        return request.data;
    },

    GetSecureBoot: async (search: string) => {
        const request = await http.get(`secureboot?search=${search}`);
        return request.data;
    },

    CreateSecureBoot: async (version: ISecureBoot) => {
        const request = await http.post('secureboot', version);
        return request.data;
    },

    UpdateSecureBoot: async (version?: ISecureBoot) => {
        const request = await http.put(`secureboot/${version?.id}`, version);
        return request.data;
    },

    DeleteSecureBoot: async (id: string) => {
        const request = await http.delete(`secureboot/${id}`);
        return request.data;
    }
}

export { useSmbios, useWindowsVersion, useSecureBoot };