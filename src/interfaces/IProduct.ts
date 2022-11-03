export interface ISMBios {
    id?: string;
    modelo: string;
    systemManufacture: string;
    systemProduct: string;
    systemFamily: string;
    systemVersion: string;
    baseboardManufacture: string;
    systemSkuNumber: string;
    baseboardProduct: string;
    chassisManufacture: string;
    status: Boolean;
}

export interface IWindowsVersion {
    id?: string;
    modelo: string;
    systemVersion: string;
    version: string;
    csup: string;
    numberPartitionsDisk: string;
    windows: string;
    status: Boolean;
    data: string;
}

export interface ISecureBoot {
    id?: string;
    modelo: string;
    status: Boolean;
}

export interface ISDCard {
    id?: string;
    modelo: string;
    status: Boolean;
}