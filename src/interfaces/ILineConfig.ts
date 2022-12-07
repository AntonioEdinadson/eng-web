export interface ILineSetup {
    id?: number;
    IPServer: string;
    linha: string;
    modelo: string;
    systemVersion: string;
    status: boolean;
}

export interface IImageCreate {
    id?: number;
    operationalSystem: string;
    operationalSystemVersion: string;
    recovery: string;
    language: string;
    buildVersion: string;
    fileName: string;
    fileDate: string;
    observation: string;
    status: boolean;
    modelo?: string;
}

export interface ISelect {
    label: string;
    value: number;
    version?: string;
}

export interface ISystemOperational {
    id?: number;
    name: string;
    version: string;
    status: boolean;
}

export interface IAssociateImage {
    id?: number;
    idImage: number;
    modelo: string;
    systemVersion: string;
    directory: string;
    modeloImageStatus: {
        id: number;
        fileName: string;
    }
}
