import React, { useContext, useMemo } from 'react'
import { HistoryHandler } from './HistoryHandler'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { canUseDOM } from './utils'
import { History } from 'history'

export interface RouterContextObjects {
  routerContext: RouterContext
  history: History
}

export interface RouterContext {
  status: number
}

const context = React.createContext<RouterContextObjects>(null as any)

export const createRouterContext = () => ({ status: 200 })

export const useRouterContext = () => {
  return useContext(context)
}

export const RouterProvider = ({
  value = createRouterContext(),
  history = canUseDOM() ? createBrowserHistory({}) : createMemoryHistory({}),
  children,
}: {
  value?: RouterContext
  history?: History
  children?: React.ReactNode
}) => {
  return React.createElement(
    React.Fragment,
    {},
    React.createElement(
      context.Provider,
      { value: { routerContext: value, history } },
      React.createElement(HistoryHandler, { history }),
      children,
    ),
  )
}
