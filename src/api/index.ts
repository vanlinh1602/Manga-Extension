import axios from 'axios';
import { BACKEND_URL } from '../lib/constant';

export const post = async (router: string, data?: any) => {
	const result = await axios.post(BACKEND_URL + router, data);
	if (result.data){
		return result.data;
	}
	return null;
};