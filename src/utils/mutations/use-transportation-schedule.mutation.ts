import { AxiosError, AxiosResponse } from 'axios'
import { getApi } from '../helpers'
import { useMutation } from '@tanstack/react-query'
import { axiosInterceptor } from '@/config'

export const useAddTransportationSchedule = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('transportation_schedule'), data),
        mutationKey: ['ADD_TRANSPORTATION_SCHEDULE'],
    })
}

export const useEditTransportationSchedule = (id: number) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('transportation_schedule') + '/' + id, data),
        mutationKey: ['EDIT_TRANSPORTATION_SCHEDULE'],
    })
}
