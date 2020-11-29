import {PAGE_HOME, PAGE_CREATE_WORKOUT, PAGE_TIMER_WORKOUT, PAGE_EDIT_WORKOUT} from '../../assets/constants'

export function navigation(state = {
    page : {
        name: PAGE_HOME
    }
}, action : any) {
    switch (action.type) {
        case PAGE_HOME:
            return {name: PAGE_HOME}
        case PAGE_EDIT_WORKOUT:
            return {name: PAGE_EDIT_WORKOUT}
        case PAGE_CREATE_WORKOUT:
            return {name: PAGE_CREATE_WORKOUT}
        case PAGE_TIMER_WORKOUT:
            return {name: PAGE_TIMER_WORKOUT}
        case PAGE_EDIT_WORKOUT:
            return {name: PAGE_EDIT_WORKOUT}
        default:
            return state
    }
}

