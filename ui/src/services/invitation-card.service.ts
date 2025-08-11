import {
    type ApiResponse,
    makeDeleteRequest,
    makeGetRequest,
    makePostRequest,
    makePutRequest
} from "../utils/api.util.ts";

export interface InvitationCardModel {
    id?: string
    name: string
    phone: string
}


export const loadInvitationCards = async (): Promise<ApiResponse<InvitationCardModel[]>> => {
    return makeGetRequest<InvitationCardModel[]>('/api/v1/invitation-cards');
}

const createInvitationCard = async (model: InvitationCardModel): Promise<ApiResponse<InvitationCardModel>> => {
    return makePostRequest<InvitationCardModel>('/api/v1/invitation-cards', model);
}

const updateInvitationCard = async (model: InvitationCardModel): Promise<ApiResponse<InvitationCardModel>> => {
    return makePutRequest<InvitationCardModel>(`/api/v1/invitation-cards/${model.id}`, model);
}

export const saveCard = async (model: InvitationCardModel): Promise<ApiResponse<InvitationCardModel>> => {
    if (model.id) {
        return updateInvitationCard(model);
    } else {
        return createInvitationCard(model);
    }
}

export const deleteCard = async (id: string): Promise<ApiResponse<void>> => {
    return makeDeleteRequest<void>(`/api/v1/invitation-cards/${id}`);
}

export const viewCard = async (id: string): Promise<ApiResponse<InvitationCardModel>> => {
    return makeGetRequest<InvitationCardModel>(`/api/v1/invitation-cards/${id}`);
}