import {HOME, WORKOUT_CREATE, WORKOUT_TIMER, WORKOUT_EDIT} from '../../assets/constants'
export function navigation(state = {
    page : {
        name: HOME
    }
}, action: any) {
    switch (action.type) {
        case HOME:
            return {
                name: HOME
            }
        case WORKOUT_EDIT:
            return {
                name: WORKOUT_EDIT
            }
        case WORKOUT_CREATE:
            return {
                name: WORKOUT_CREATE
            }
        case WORKOUT_TIMER:
            return {
                name: WORKOUT_TIMER
            }
        case WORKOUT_EDIT:
            return {
                name: WORKOUT_EDIT
            }
        default:
            return state
    }
}

