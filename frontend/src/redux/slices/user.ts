import { User } from "@common/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
	user: User | null;
	isAuthenticated: boolean;
}
const initialState: UserSliceState = {
	user: null,
	isAuthenticated: false,
};
export const userSlice = createSlice({
	// Name of slice
	name: "user",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setUser: (state, action) => {
            state.user = action.payload
        },
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const {
	reset,
	setUser,
	setIsAuthenticated,
} = userSlice.actions;

const userSliceReducer = userSlice.reducer;

export default userSliceReducer;
