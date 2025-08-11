import {
    type ApiResponse,
    makeDeleteRequest,
    makeGetRequest,
    makePostRequest,
    makePutRequest
} from "../utils/api.util.ts";

export interface PledgeModel {
    id?: string
    name: string
    phone: string
    amount: number
    totalPaid?: number
}


export const loadPledges = async (): Promise<ApiResponse<PledgeModel[]>> => {
    return makeGetRequest<PledgeModel[]>('/api/v1/pledges');
}

const createPledge = async (pledge: PledgeModel): Promise<ApiResponse<PledgeModel>> => {
    return makePostRequest<PledgeModel>('/api/v1/pledges', pledge);
}

const updatePledge = async (pledge: PledgeModel): Promise<ApiResponse<PledgeModel>> => {
    return makePutRequest<PledgeModel>(`/api/v1/pledges/${pledge.id}`, pledge);
}

export const savePledge = async (pledge: PledgeModel): Promise<ApiResponse<PledgeModel>> => {
    if (pledge.id) {
        return updatePledge(pledge);
    } else {
        return createPledge(pledge);
    }
}

export const deletePledge = async (id: string): Promise<ApiResponse<void>> => {
    return makeDeleteRequest<void>(`/api/v1/pledges/${id}`);
}