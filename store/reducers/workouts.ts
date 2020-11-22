import {IWorkout} from "mocks/workout";

export function workouts(state = {
    workouts: [],
    runningWorkout : {}
}, action : any) {
    switch (action.type) {
        case 'fetchWorkouts':
            return {
                ...state,
                workouts: action.workouts
            }
        case 'loadWorkout':
            return {
                ...state,
                runningWorkout: action.workouts
            }
        case 'createWorkout':
            return {
                ...state,
                workouts: [
                    ...state.workouts,
                    action.workouts
                ]
            }
        default:
            return state
    }
}

