import axios from 'axios';
import { IImageCreate, ILineSetup } from '../interfaces/ILineConfig';

import {
    IModelDPK,
    IModelDPKConfig,
    IResolution,
    ISDCard,
    ISecureBoot,
    ISMBios,
    IWindowsVersion
} from '../interfaces/IProduct';

const http = axios.create({
    baseURL: 'http://localhost:3000/espec/api',
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

const useSDCard = {
    GetAllSCard: async () => {
        const request = await http.get('sdcard');
        return request.data;
    },

    GetSDCard: async (search: string) => {
        const request = await http.get(`sdcard?search=${search}`);
        return request.data;
    },

    CreateSDCard: async (version: ISDCard) => {
        const request = await http.post('sdcard', version);
        return request.data;
    },

    UpdateSCard: async (version?: ISDCard) => {
        const request = await http.put(`sdcard/${version?.id}`, version);
        return request.data;
    },

    DeleteSCard: async (id: string) => {
        const request = await http.delete(`sdcard/${id}`);
        return request.data;
    }
}

const useModelDPK = {
    GetAllSModelDPK: async () => {
        const request = await http.get('key');
        return request.data;
    },

    GetModelDPK: async (search: string) => {
        const request = await http.get(`key?search=${search}`);
        return request.data;
    },

    CreateModelDPK: async (version: IModelDPK) => {
        const request = await http.post('key', version);
        return request.data;
    },

    UpdateModelDPK: async (version?: IModelDPK) => {
        const request = await http.put(`key/${version?.id}`, version);
        return request.data;
    },

    DeleteModelDPK: async (id: string) => {
        const request = await http.delete(`key/${id}`);
        return request.data;
    }
};

const useModelDPKConfig = {
    GetAllSModelDPKConfig: async () => {
        const request = await http.get('keyconfig');
        return request.data;
    },

    GetModelDPKConfig: async (search: string) => {
        const request = await http.get(`keyconfig?search=${search}`);
        return request.data;
    },

    CreateModelDPKConfig: async (version: IModelDPKConfig) => {
        const request = await http.post('keyconfig', version);
        return request.data;
    },

    UpdateModelDPKConfig: async (version?: IModelDPKConfig) => {
        const request = await http.put(`keyconfig/${version?.id}`, version);
        return request.data;
    },

    DeleteModelDPKConfig: async (id: string) => {
        const request = await http.delete(`keyconfig/${id}`);
        return request.data;
    }
}

const useResolution = {
    GetAllSResolution: async () => {
        const request = await http.get('resolution');
        return request.data;
    },

    GetResolution: async (search: string) => {
        const request = await http.get(`resolution?search=${search}`);
        return request.data;
    },

    CreateResolution: async (version: IResolution) => {
        const request = await http.post('resolution', version);
        return request.data;
    },

    UpdateResolution: async (version?: IResolution) => {
        const request = await http.put(`resolution/${version?.id}`, version);
        return request.data;
    },

    DeleteResolution: async (id: string) => {
        const request = await http.delete(`resolution/${id}`);
        return request.data;
    }
}

const useLineSetup = {
    GetAllLineSetup: async () => {
        const request = await http.get('linesetup');
        return request.data;
    },

    GetLineSetup: async (search: string) => {
        const request = await http.get(`linesetup?search=${search}`);
        return request.data;
    },

    CreateLineSetup: async (version: ILineSetup) => {
        const request = await http.post('linesetup', version);
        return request.data;
    },

    UpdateLineSetup: async (version?: ILineSetup) => {
        const request = await http.put(`linesetup/${version?.id}`, version);
        return request.data;
    },

    DeleteLineSetup: async (id: number) => {
        const request = await http.delete(`linesetup/${id}`);
        return request.data;
    }
};

const useModelImageStatus = {
    GetAllModelImageStatus: async () => {
        const request = await http.get('modelimagestatus');
        return request.data;
    },

    GetModelImageStatus: async (search: string) => {
        const request = await http.get(`modelimagestatus?search=${search}`);
        return request.data;
    },

    CreateImageStatus: async (version: IImageCreate) => {
        const request = await http.post('modelimagestatus', version);
        return request.data;
    },

    UpdateImageStatus: async (version?: IImageCreate) => {
        const request = await http.put(`modelimagestatus/${version?.id}`, version);
        return request.data;
    },

    DeleteImageStatus: async (id: number) => {
        const request = await http.delete(`modelimagestatus/${id}`);
        return request.data;
    }
};

const useModelImage = {
    GetAllModelImage: async () => {
        const request = await http.get('modelimage');
        return request.data;
    },

    GetLineSetup: async (search: string) => {
        const request = await http.get(`linesetup?search=${search}`);
        return request.data;
    },

    CreateResolution: async (version: ILineSetup) => {
        const request = await http.post('resolution', version);
        return request.data;
    },

    UpdateResolution: async (version?: ILineSetup) => {
        const request = await http.put(`resolution/${version?.id}`, version);
        return request.data;
    },

    DeleteResolution: async (id: string) => {
        const request = await http.delete(`resolution/${id}`);
        return request.data;
    }
};

const useModelSystemOperational = {
    GetAllModelSystemOperational: async () => {
        const request = await http.get('modelsystemoperational');
        return request.data;
    },
};

export {
    useSmbios,
    useWindowsVersion,
    useSecureBoot,
    useSDCard,
    useModelDPK,
    useModelDPKConfig,
    useResolution,
    useLineSetup,
    useModelImage,
    useModelImageStatus,
    useModelSystemOperational
};