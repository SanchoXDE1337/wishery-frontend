export const actionTypes = {
    LOGIN: 'LOGIN'
}


export interface IAction {
    type: string
}

export interface ILoginAction extends IAction {
    token: string
    id: string
}

export const login = (token: string, id: string): ILoginAction => ({
    type: actionTypes.LOGIN,
    token,
    id
});

export const test = (type: string) => ({type})
