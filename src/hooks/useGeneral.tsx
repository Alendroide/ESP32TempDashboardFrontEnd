import { axiosAPI } from "@/api/axiosAPI";

export default function useGeneral(){
    
    async function getStats(from: string, to: string){
        try{
            const response = await axiosAPI.get(`/general/stats?from=${from}&to=${to}`);
            return response.data;
        }
        catch(error){
            console.error(error);
        }
    }

    return { getStats }
}