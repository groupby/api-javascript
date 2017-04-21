export const thunk = (type: string, data: any) => (dispatch) => dispatch({ type, ...data });
