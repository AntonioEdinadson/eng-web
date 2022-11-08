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

export interface IModelDPK {
    id?: string;
    modelo: string;
    partnumber: string;
    status: Boolean;
}

export interface IModelDPKConfig {
    id?: string;
    modelo: string;
    ZPC_MODEL_SKU: string;
    ZFRM_FATOR_CL1: string;
    ZFRM_FATOR_CL2: string;
    ZSCREEN_SIZE: string;
    ZTOUCH_SCREEN: string;
    BUSINESSID: string;
    ZPGM_ELIG_VAL: string;
}

export interface IResolution {
    id?: number,
    modelo: string;
    systemVersion: string;
    currentVerticalResolution: number;
    currentHorizontalResolution: number;
    equalResolution: number;
    data: string;
    status: boolean;
}