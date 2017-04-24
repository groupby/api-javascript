export const thunk = (type: string, data: any) => (dispatch) => dispatch({ type, ...data });

export const rayify = <T>(arr: T | T[]): T[] => Array.isArray(arr) ? arr : [arr];
