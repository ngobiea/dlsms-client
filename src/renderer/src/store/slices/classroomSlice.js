import { createSlice } from '@reduxjs/toolkit';

const classroomSlice = createSlice({
  name: 'classroom',
  initialState: {
    classrooms: [],
    classroomId: '',
    name: '',
    code: '',
    description: '',
    tutor: {
      id: '',
      firstName: '',
      lastName: '',
    },
    students: [],
  },
  reducers: {
    setClassrooms(state, action) {
      state.classrooms = action.payload;
    },
    addClassroom(state, action) {
      state.classrooms.push(action.payload);
    },
    setClassRoomId(state, action) {
      state.classroomId = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setCode(state, action) {
      state.code = action.payload;
    },
    setTutor(state, action) {
      state.tutor = action.payload;
    },
    setStudents(state, action) {
      state.students = action.payload;
    },
    addStudent(state, action) {
      state.students.push(action.payload);
    },
  },
});

export const {
  setClassRoomId,
  setName,
  setDescription,
  setCode,
  setTutor,
  setStudents,
  addStudent,
  setClassrooms,
  addClassroom,
} = classroomSlice.actions;
export const classroomReducer = classroomSlice.reducer;
