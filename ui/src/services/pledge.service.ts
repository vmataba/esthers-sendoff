import {get} from '../utils/api.util'

export interface Pledge {
    id: string;
    name: string;
    amount: number;
}

export const loadPledges = async () => {
    return await get('/api/v1/pledges');

}