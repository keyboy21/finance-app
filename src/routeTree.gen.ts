/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as IncomesIndexImport } from './routes/incomes/index'
import { Route as ExpensesIndexImport } from './routes/expenses/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const IncomesIndexRoute = IncomesIndexImport.update({
  path: '/incomes/',
  getParentRoute: () => rootRoute,
} as any)

const ExpensesIndexRoute = ExpensesIndexImport.update({
  path: '/expenses/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/expenses/': {
      preLoaderRoute: typeof ExpensesIndexImport
      parentRoute: typeof rootRoute
    }
    '/incomes/': {
      preLoaderRoute: typeof IncomesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ExpensesIndexRoute,
  IncomesIndexRoute,
])

/* prettier-ignore-end */