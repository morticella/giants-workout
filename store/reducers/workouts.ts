import {IWorkout} from "mocks/workout";
import { LOAD_RUNNING_WORKOUT_SUCCESS, FETCH_WORKOUTS_SUCCESS } from "../../assets/constants";

export function workouts(state = {
    workouts: [],
    runningWorkout : {}
}, action : any) {
    switch (action.type) {
        case FETCH_WORKOUTS_SUCCESS:
            return {
                ...state,
                workouts: action.workouts
            }
        case LOAD_RUNNING_WORKOUT_SUCCESS:
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

