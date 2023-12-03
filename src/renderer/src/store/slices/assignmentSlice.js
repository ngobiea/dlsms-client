import { createSlice } from '@reduxjs/toolkit';
const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assigned: [],
    submitted: [],
    graded: [],
    submissionId: '',
    assignmentId: '',
  },
  reducers: {
    setAssignedAssignment(state, action) {
      state.assigned = action.payload;
    },
    setSubmittedAssignment(state, action) {
      state.submitted = action.payload;
    },
    setGradedAssignment(state, action) {
      state.graded = action.payload;
    },
    addAssignedAssignment(state, action) {
      state.assigned.push(action.payload);
    },
    addSubmittedAssignment(state, action) {
      state.submitted.push(action.payload);
    },
    addGradedAssignment(state, action) {
      state.graded.push(action.payload);
    },
    updateAssignedAssignment(state, action) {
      const { _id, ...rest } = action.payload;
      const index = state.assigned.findIndex((a) => a._id === _id);
      state.assigned[index] = { ...state.assigned[index], ...rest };
    },
    updateSubmittedAssignment(state, action) {
      const { _id, ...rest } = action.payload;
      const index = state.submitted.findIndex((a) => a._id === _id);
      state.submitted[index] = { ...state.submitted[index], ...rest };
    },
    updateGradedAssignment(state, action) {
      const { _id, ...rest } = action.payload;
      const index = state.graded.findIndex((a) => a._id === _id);
      state.graded[index] = { ...state.graded[index], ...rest };
    },
    removeGradedAssignment(state, action) {
      const { _id } = action.payload;
      const index = state.graded.findIndex((a) => a._id === _id);
      state.graded.splice(index, 1);
    },
    removeAssignedAssignment(state, action) {
      const { _id } = action.payload;
      const index = state.assigned.findIndex((a) => a._id === _id);
      state.assigned.splice(index, 1);
    },
    removeSubmittedAssignment(state, action) {
      const { _id } = action.payload;
      const index = state.submitted.findIndex((a) => a._id === _id);
      state.submitted.splice(index, 1);
    },
    setSubmissionId(state, action) {
      const { assignmentId, submissionId } = action.payload;
      console.log(action.payload);
      state.submissionId = submissionId;
      state.assignmentId = assignmentId;
    },
  },
});

export const {
  setAssignedAssignment,
  setSubmittedAssignment,
  setGradedAssignment,
  addAssignedAssignment,
  addSubmittedAssignment,
  addGradedAssignment,
  updateAssignedAssignment,
  updateSubmittedAssignment,
  updateGradedAssignment,
  removeGradedAssignment,
  removeAssignedAssignment,
  removeSubmittedAssignment,
  setSubmissionId,
} = assignmentSlice.actions;

export const assignmentReducer = assignmentSlice.reducer;
