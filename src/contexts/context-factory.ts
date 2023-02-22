import React from 'react'
import {identity} from 'ramda'
import * as H from 'history';
import { now } from '../utils/date-utils';

const defaultValues = new Map<React.Context<any>, any>()

export const contextFactory = <T>(defaultValue: T) => {
    const context = React.createContext(defaultValue)
    defaultValues.set(context, defaultValue)
    return Object.assign(context, {
        subscribe: <R = T>(selector: (value: T) => R = identity as any) =>
            useSubscribe(context, selector),
        Provider: context.Provider,
        Consumer: context.Consumer,
    })
}

export const useSubscribe = <T, R = T>(
    context: React.Context<T>,
    selector: (value: T) => R = identity as any,
) => {
    const value = React.useContext(context)
    /*
      if (value === defaultValues.get(context))
        console.warn(
          'No Provider for context ',
          context,
          'default value used instead',
          value,
        )
    */
    return selector(value)
}


export const HistoryContext = contextFactory(H.createBrowserHistory())

export const SearchContext = contextFactory('')

export const RoutePropsContext = contextFactory({params: {}, location: {} as any as H.Location,})
