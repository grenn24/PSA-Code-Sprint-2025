import { User } from "@common/types/user";
import { PayloadAction } from "@reduxjs/toolkit";
export interface UserSliceState {
    user: User | null;
    isAuthenticated: boolean;
}
export declare const userSlice: import("@reduxjs/toolkit").Slice<UserSliceState, {
    reset: () => UserSliceState;
    setUser: (state: import("immer").WritableDraft<UserSliceState>, action: {
        payload: any;
        type: string;
    }) => void;
    setIsAuthenticated: (state: import("immer").WritableDraft<UserSliceState>, action: PayloadAction<boolean>) => void;
}, "user", "user", import("@reduxjs/toolkit").SliceSelectors<UserSliceState>>;
export declare const reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/reset">, setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/setUser">, setIsAuthenticated: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "user/setIsAuthenticated">;
declare const userSliceReducer: import("redux").Reducer<UserSliceState>;
export default userSliceReducer;
