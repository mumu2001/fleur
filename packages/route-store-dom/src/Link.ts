import { useRouterContext } from './RouterContext'
import React, { useCallback, forwardRef } from 'react'
import { parse } from 'url'

const isRoutable = (href: string | undefined) => {
  const parsed = parse(href || '')
  const current = parse(location.href)

  if (!href) return false
  if (href[0] === '#') return false
  if (parsed.protocol && parsed.protocol !== current.protocol) return false
  if (parsed.host && parsed.host !== location.host) return false
  return true
}

export const Link = forwardRef(
  (props: React.AnchorHTMLAttributes<HTMLAnchorElement>, ref) => {
    const { history } = useRouterContext()

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (props.onClick) props.onClick(e)
        if (e.isDefaultPrevented()) return
        if (!isRoutable(props.href)) return

        e.preventDefault()
        e.stopPropagation()

        history.push(props.href!)
      },
      [props.onClick, props.href],
    )

    return React.createElement('a', {
      ...props,
      ref,
      onClick: handleClick,
    })
  },
)
