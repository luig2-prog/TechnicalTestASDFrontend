import { Area } from "./Area";
import { User } from "./User";

export interface FixedAsset {
    id: number;
    assetName: string;
    description: string;
    assetType: string;
    assetSerial: string;
    inventoryNumber: number;
    weight: number;
    height: number;
    assetWith: number;
    large: number;
    buyValue: number;
    dateBuy: number;
    user: User;
    area: Area
}