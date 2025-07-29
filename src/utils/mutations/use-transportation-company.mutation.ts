import { AxiosError, AxiosResponse } from 'axios'
import { getApi } from '../helpers'
import { useMutation } from '@tanstack/react-query'
import { axiosInterceptor } from '@/config'

export const useAddTransportationCompany = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('transportation_company'), data),
        mutationKey: ['ADD_TRANSPORTATION_COMPANY'],
    })
}

export const useEditTransportationCompany = (id: number) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('transportation_company') + '/' + id, data),
        mutationKey: ['EDIT_TRANSPORTATION_COMPANY'],
    })
}
