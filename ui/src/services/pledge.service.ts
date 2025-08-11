import {type ApiResponse, makeGetRequest, makePostRequest} from "../utils/api.util.ts";

export interface PledgeModel {
    id?: string
    name: string
    phone: string
    amount: number
}


export const loadPledges = async (): Promise<ApiResponse<PledgeModel[]>> => {
    return makeGetRequest<PledgeModel[]>('/api/v1/pledges');
}

export const createPledge = async (pledge: PledgeModel): Promise<ApiResponse<PledgeModel>> => {
    return makePostRequest<PledgeModel>('/api/v1/pledges', pledge);
}