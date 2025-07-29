import { AxiosError, AxiosResponse } from 'axios'
import { getApi } from '../helpers'
import { useMutation } from '@tanstack/react-query'
import { axiosInterceptor } from '@/config'

export const useAddScheduleTrip = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('trip_schedule'), data),
        mutationKey: ['ADD_TRIP_SCHEDULE'],
    })
}

export const useEditScheduleTrip = (id: number) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('trip_schedule') + '/' + id, data),
        mutationKey: ['ADD_TRIP_SCHEDULE'],
    })
}
