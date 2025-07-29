import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { MUITextField } from '../mui'
import { NumberMaskInput, NumberMaskInputComma, PhoneMaskInput } from './input-mask.component'

export type TextFieldProps<T extends FieldValues = Record<string, any>> = Omit<MuiTextFieldProps, 'name'> & {
    inputFormat?: 'NORMAL' | 'NUMBER' | 'DECIMAL' | 'PRICE' | 'PASSWORD' | 'PHONE' | 'PPN' | 'PERCENT' | 'EMAIL'
    name: Path<T>
    control: Control<T>
    onValueChange?: (value: string) => void
    isReadOnly?: boolean
    variant?: 'standard' | 'outlined' | 'filled'
    placeholder?: string
    textUppercase?: boolean
    textLowercase?: boolean
    disabled?: boolean
    textSlug?: boolean
    setPercentage?: (value: string) => void
    percentage?: string
    disablePercentage?: boolean
    allowNegative?: boolean // Tambahan prop untuk mengizinkan nilai negatif
    // label?: string
}

export default function CustomTextField<T extends FieldValues = Record<string, any>>(props: TextFieldProps<T>) {
    const {
        control,
        inputFormat = 'NORMAL',
        onValueChange,
        isReadOnly = false,
        variant,
        placeholder = '',
        textUppercase = false,
        textLowercase = false,
        textSlug = false,
        disabled = false,
        percentage,
        setPercentage,
        disablePercentage,
        allowNegative = false, // Default false untuk backward compatibility
        // label,
        ...moreProps
    } = props

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const isPasswordType = inputFormat === 'PASSWORD'

    const inputComponent: any = useMemo(() => {
        switch (inputFormat) {
            case 'PERCENT':
                return percentage == 'percent' ? NumberMaskInputComma : NumberMaskInput
            case 'PRICE':
            case 'PPN':
            case 'NUMBER':
                return NumberMaskInput
            case 'DECIMAL':
                return NumberMaskInputComma
            case 'PHONE':
                return PhoneMaskInput

            default:
                return undefined
        }
    }, [inputFormat, percentage])

    const endAdornment = useMemo(() => {
        switch (inputFormat) {
            case 'PASSWORD':
                return (
                    <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? (
                                <VisibilityOffRoundedIcon fontSize='small' />
                            ) : (
                                <VisibilityRoundedIcon fontSize='small' />
                            )}
                        </IconButton>
                    </InputAdornment>
                )
            case 'PERCENT':
                return (
                    <InputAdornment position={disablePercentage ? 'start' : 'end'}>
                        {disablePercentage ? (
                            <>{percentage == 'percent' ? '%' : 'Rp'}</>
                        ) : (
                            <PercentSelect percentage={percentage ?? 'percent'} setPercentage={setPercentage} />
                        )}
                    </InputAdornment>
                )
            case 'PPN':
                return <InputAdornment position='start'>%</InputAdornment>

            default:
                return moreProps.InputProps?.endAdornment
        }
    }, [inputFormat, showPassword, moreProps.InputProps?.endAdornment, percentage, setPercentage, disablePercentage])

    const startAdornment = useMemo(() => {
        switch (inputFormat) {
            case 'PHONE':
                return (
                    <InputAdornment position='start'>
                        <Typography sx={{ mt: '1px' }}>+62</Typography>
                    </InputAdornment>
                )

            case 'PRICE':
                return <InputAdornment position='start'>Rp</InputAdornment>

            default:
                return moreProps.InputProps?.startAdornment
        }
    }, [inputFormat, moreProps.InputProps?.startAdornment])

    // Fungsi untuk memvalidasi input DECIMAL dengan dukungan nilai negatif
    const validateDecimalInput = (value: string): string => {
        if (inputFormat !== 'DECIMAL') return value

        // Jika allowNegative true, izinkan tanda minus di awal
        if (allowNegative) {
            // Hapus karakter yang tidak valid kecuali angka, titik, koma, dan minus di awal
            let cleanValue = value.replace(/[^0-9.,-]/g, '')

            // Pastikan minus hanya di awal
            const hasNegative = cleanValue.startsWith('-')
            cleanValue = cleanValue.replace(/-/g, '')
            if (hasNegative) {
                cleanValue = '-' + cleanValue
            }

            return cleanValue
        } else {
            // Behavior original untuk DECIMAL tanpa negatif
            return value.replace(/[^0-9.,]/g, '')
        }
    }

    return (
        <Controller
            render={({ field, fieldState, formState: { isSubmitSuccessful } }) => {
                const error = !isSubmitSuccessful && Boolean(fieldState?.error)

                const helperText = !isSubmitSuccessful && fieldState?.error?.message

                const { onChange, ...moreField } = field

                return (
                    <MUITextField
                        {...moreProps}
                        {...moreField}
                        error={error}
                        onBlur={e => {
                            if (moreProps.onBlur) {
                                moreProps.onBlur(e) // Panggil onBlur dari props
                            }
                            field.onBlur() // Pastikan onBlur dari Controller tetap dipanggil
                        }}
                        fullWidth
                        onChange={(e: any) => {
                            let processedValue = e.target.value

                            // Validasi khusus untuk DECIMAL dengan dukungan nilai negatif
                            if (inputFormat === 'DECIMAL') {
                                processedValue = validateDecimalInput(processedValue)
                            }

                            if (textUppercase) {
                                processedValue = processedValue.toUpperCase()
                            } else if (textLowercase) {
                                processedValue = processedValue.toLowerCase().replace(/\s+/g, '_')
                            } else if (textSlug) {
                                processedValue = processedValue.toLowerCase().replace(/\s+/g, '-')
                            }

                            if (onValueChange) {
                                onValueChange(processedValue)
                            }
                            onChange(processedValue)
                        }}
                        helperText={helperText}
                        type={!isPasswordType ? moreProps.type : showPassword ? 'text' : 'password'}
                        size='medium'
                        disabled={disabled}
                        InputLabelProps={{ shrink: true }}
                        placeholder={isReadOnly ? undefined : placeholder ? placeholder : `${props?.label || ''}...`}
                        InputProps={{
                            ...moreProps.InputProps,
                            inputComponent,
                            endAdornment,
                            startAdornment,
                            autoComplete: 'off',
                            readOnly: isReadOnly,
                        }}
                        variant={variant}
                        sx={{
                            pl: variant === 'standard' ? 1 : 0,
                            '& .MuiInputBase-input:hover': {
                                cursor: isReadOnly ? 'default' : '',
                            },
                            // backgroundColor: disabled ? 'grey' : '',
                        }}
                    />
                )
            }}
            name={props.name}
            control={control}
            rules={{
                ...(inputFormat === 'EMAIL' && {
                    required: 'Email wajib diisi',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Format email tidak valid',
                    },
                }),
                ...(inputFormat === 'DECIMAL' &&
                    allowNegative && {
                        pattern: {
                            value: /^-?[0-9]*[.,]?[0-9]*$/,
                            message: 'Format angka desimal tidak valid',
                        },
                    }),
            }}
        />
    )
}

interface Props {
    percentage: string
    setPercentage?: (value: string) => void
}
function PercentSelect({ percentage, setPercentage }: Props) {
    const handleChange = (event: SelectChangeEvent) => {
        if (setPercentage) {
            setPercentage(event.target.value as string)
        }
    }

    return (
        <FormControl fullWidth>
            <Select
                variant='standard'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={percentage}
                sx={{ width: '35px' }}
                onChange={handleChange}
            >
                <MenuItem value={'percent'}>%</MenuItem>
                <MenuItem value={'rupiah'}>Rp</MenuItem>
            </Select>
        </FormControl>
    )
}
