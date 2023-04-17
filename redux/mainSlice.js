import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    examineeName: "",
    examineeId: "",
    date: "",
    fvc: {
        selectedIds: [],
    },
    svc: {
        selectedIds: [],
    },
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setExamineeId: (state, action) => {
            const { examineeId, examineeName } = action.payload;
            if (!!examineeId) state.examineeId = examineeId;
            if (!!examineeName) state.examineeName = examineeName;
        },
        setDate: (state, action) => {
            const { date } = action.payload;
            if (!!date) state.date = date;
        },
        setSelectedIds: (state, action) => {
            const { selectedIds, type } = action.payload;
            if (!!selectedIds && !!type) {
                if (type === "FVC") state.fvc.selectedIds = selectedIds;
                if (type === "SVC") state.svc.selectedIds = selectedIds;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setExamineeId, setDate, setSelectedIds } = mainSlice.actions;

export default mainSlice.reducer;
