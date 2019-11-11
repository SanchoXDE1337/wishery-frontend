let nextTodoId = 0;

export type TActionType = 'ADD_TODO' | 'SET_VISIBILITY_FILTER' | 'TOGGLE_TODO'

export type TFilterType = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'

export interface IAction {
    type: TActionType
}

export interface IAddTodoAction extends IAction{
    id: number
    text: string
}
export interface ISetVisibilityFiltern extends IAction{
    filter: TFilterType
}
export interface IToggleTodo extends IAction{
    id: number
}


export const addTodo = (text: string): IAddTodoAction => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
});

export const setVisibilityFilter = (filter: TFilterType): ISetVisibilityFiltern => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const toggleTodo = (id: number): IToggleTodo => ({
    type: 'TOGGLE_TODO',
    id
});

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};
