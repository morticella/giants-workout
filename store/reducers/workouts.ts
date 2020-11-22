import {IWorkout} from "mocks/workout";

export function workouts(state = {
    workouts: [],
    runningWorkout : {}
}, action : any) {
    const normalizeWorkouts = action.workouts;
    const finalWorkouts: string[] = [];
    switch (action.type) {
        case 'fetchWorkouts': 
        // normalizeWorkouts.map((workout : string) => {
        //         finalWorkouts.push(JSON.parse(workout));
        //     });
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

