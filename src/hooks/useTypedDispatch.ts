import { useDispatch } from 'react-redux'
import { DispatchType } from '../store/store'

export const useTypedDispatch = () => useDispatch<DispatchType>()
