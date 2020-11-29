import {IWorkout} from "../../mocks/workout";
import {
    LOAD_RUNNING_WORKOUT_SUCCESS,
    FETCH_WORKOUTS_SUCCESS,
    CREATE_WORKOUT_SUCCESS,
    EDIT_WORKOUT_SUCCESS,
    DELETE_WORKOUT_SUCCESS
} from "../../assets/constants";

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
        case CREATE_WORKOUT_SUCCESS:
            return {
                ...state,
                workouts: [
                    ...state.workouts,
                    action.workouts
                ]
            }
        case EDIT_WORKOUT_SUCCESS:
            const afterEdit = state.workouts.map((workout : IWorkout) : IWorkout => {
                if (workout.name !== action.workout.name) {
                    return workout;
                }
                return {
                    ...workout,
                    ...action.workout
                }
            });
            return {
                ...state,
                workouts: [...afterEdit]
            }
        case DELETE_WORKOUT_SUCCESS:
            const afterDelete = state.workouts.filter((workout : IWorkout): boolean => workout.name !== action.workout.name);
            return {
                ...state,
                workouts: [...afterDelete]
            }
        default:
            return state
    }
}

