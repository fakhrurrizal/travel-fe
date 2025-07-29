import { AxiosError, AxiosResponse } from 'axios'
import { getApi } from '../helpers'
import { useMutation } from '@tanstack/react-query'
import { axiosInterceptor } from '@/config'

export const useAddTransportationTerminal = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('transportation_terminal'), data),
        mutationKey: ['ADD_TRANSPORTATION_TERMINAL'],
    })
}

export const useEditTransportationTerminal = (id: number) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('transportation_terminal') + '/' + id, data),
        mutationKey: ['EDIT_TRANSPORTATION_TERMINAL'],
    })
}
