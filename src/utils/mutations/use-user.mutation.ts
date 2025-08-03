import { AxiosError, AxiosResponse } from 'axios'
import { getApi } from '../helpers'
import { useMutation } from '@tanstack/react-query'
import { axiosInterceptor } from '@/config'

export const useAddUser = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('user'), data),
        mutationKey: ['ADD_USER'],
    })
}

export const useEditUser = (id: number) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('user') + '/' + id, data),
        mutationKey: ['EDIT_USER'],
    })
}
