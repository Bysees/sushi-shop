import { useMediaQuery } from '@material-ui/core'
import { throttle } from 'lodash'
import { useEffect, useState } from 'react'

//! Пока такая логика, мб потом подумать что можно оптимизировать / зарефакторить
export const useWrapObserv = (
  parentNode: HTMLElement | null,
  UnwrapSize: number
): boolean => {
  const IsUnwrap = useMediaQuery(`(min-width:${UnwrapSize}px)`)
  const [isWrapped, setIsWrapped] = useState<boolean>(false)

  function getWrapStatus(parentNode: HTMLElement): boolean {
    const parentOffsetTop = parentNode.getBoundingClientRect().top
    const firstChildHeight =
      parentNode.children[0].getBoundingClientRect().height
    const secondChildOffsetTop =
      parentNode.children[1].getBoundingClientRect().top
    return parentOffsetTop + firstChildHeight <= secondChildOffsetTop
  }

  //! Устанавливает состояние при первой загрузке
  useEffect(() => {
    if (parentNode) {
      setIsWrapped(() => getWrapStatus(parentNode))
    }
  }, [setIsWrapped, parentNode])

  //! Устанавливает состояние при ресайзинге страницы.
  useEffect(() => {
    if (parentNode) {
      window.onresize = throttle(() => {
        setIsWrapped(() => getWrapStatus(parentNode) && !IsUnwrap)
      }, 200)
    }
  }, [IsUnwrap, parentNode, setIsWrapped])

  return isWrapped
}
