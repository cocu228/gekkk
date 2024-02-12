import {createContext} from 'preact';
import {FC, memo, PropsWithChildren, useContext, useEffect, useState} from 'preact/compat';

type breakpoints = /*'sm' | */'md'/* | 'lg' | 'xl' | 'xxl'| 'xxxl'*/;

export type breakpointsResult = Record<breakpoints, boolean> & {
    init: boolean;
};

const dimensions: Record<breakpoints, number> = {
    // sm: 576,
    md: 768,
    // lg: 992,
    // xl: 1200,
    // xxl: 1400,
    // xxxl: 1700,
};

const isBP = (str: string | breakpoints): str is breakpoints => str in dimensions;

const initialState: breakpointsResult = {
    init: false,

    // sm: false,
    md: false,
    // lg: false,
    // xl: false,
    // xxl: false,
    // xxxl: false,
};

export const BreakpointsContext = createContext<breakpointsResult>(initialState);

const BreakpointsProvider: FC<PropsWithChildren<unknown>> = memo(({children}): JSX.Element | null => {
    const [result, setResult] = useState<breakpointsResult>(initialState);

    useEffect(() => {
        const handler = (key: breakpoints) => {
            return ({matches}: MediaQueryListEvent) => {
                setResult(prev => ({
                    ...prev,
                    [key]: matches,
                }));
            };
        };

        const initResult: Partial<breakpointsResult> = {
            init: true,
        };

        Object.entries(dimensions).forEach(([breakpoint, size]) => {
            const mediaQuery = window.matchMedia(`(max-width: ${size}px)`);
            if (isBP(breakpoint)) {
                mediaQuery.addEventListener('change', handler(breakpoint));
                Object.assign(initResult, {
                    [breakpoint]: mediaQuery.matches,
                });
            }
        });

        setResult(prev => ({
            ...prev,
            ...initResult,
        }));
    }, []);

    return <BreakpointsContext.Provider value={result}>{children}</BreakpointsContext.Provider>;
});

export function useBreakpoints() {
    return useContext(BreakpointsContext);
}

export default BreakpointsProvider;
