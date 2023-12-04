import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClassRoomsPage from './pages/ClassRoomPages/ClassRoomsPage';
import AssignmentPage from './pages/AssignmentPages/AssignmentPage';
import NotificationPage from './pages/NotificationPages/NotificationPage';
import ReportPage from './pages/ReportPages/ReportPage';
import ClassRoomPage from './pages/ClassRoomPages/ClassRoomPage';
import JoinPage from './pages/ClassRoomPages/Student/JoinPage';
import ClassroomChatRoot from './pages/ClassRoomPages/Classroom/ClassroomChatRoot';
import ClassroomAssignmentRoot from './pages/ClassRoomPages/Assignments/ClassroomAssignmentRoot';
import ClassroomChat from './pages/ClassRoomPages/Classroom/ClassroomChat';
import CreateAssignment from './pages/ClassRoomPages/Assignments/CreateAssignment';
import ClassroomFiles from './pages/ClassRoomPages/Classroom/ClassroomFiles';
import Assigned from './pages/ClassRoomPages/Assignments/Assigned';
import GradedAssignment from './pages/ClassRoomPages/Assignments/GradedAssignment';
import JoinClassroomVerification from './pages/ClassRoomPages/Student/JoinClassroomVerification';
import TitleNav from './components/TitleNav';
import SideBar from './components/SideBar';
import ExamConfirm from './components/App/ExamConfirm';
import Notification from './components/Notification';
import ClassSessionsPage from './pages/ClassRoomPages/ClassSessions/ClassSessionsPage';
import CSession from './pages/ClassRoomPages/ClassSessions/CSession';
import ESession from './pages/ClassRoomPages/ExamSessions/ESession';
import ExamSessionsPage from './pages/ClassRoomPages/ExamSessions/ExamSessionsPage';
import { useSelector } from 'react-redux';
import StudentCS from './pages/ClassRoomPages/ClassSessions/StudentCS';
import StudentES from './pages/ClassRoomPages/ExamSessions/StudentES';
import Assignment from './pages/ClassRoomPages/Assignments/Assignment';
import SubmittedAssignment from './pages/ClassRoomPages/Assignments/SubmittedAssignment';
import StudentSubmission from './pages/ClassRoomPages/Assignments/StudentSubmission';
const accountType = JSON.parse(localStorage.getItem('accountType'));

const App = () => {
  const { isShowExamConfirm } = useSelector((state) => state.examSession);
  const { notification } = useSelector((state) => state.app);
  console.log(navigator.onLine);
  return (
    <>
      <TitleNav />
      <SideBar />
      {notification.isActive && <Notification />}
      {isShowExamConfirm && <ExamConfirm />}
      <Routes>
        <Route path="/" element={<ClassRoomsPage />} />
        <Route path=":classroomId" element={<ClassRoomPage />}>
          <Route path="" element={<ClassroomChatRoot />}>
            <Route path="" element={<ClassroomChat />} />
            <Route path="file" element={<ClassroomFiles />} />
          </Route>
          <Route path="assignment" element={<ClassroomAssignmentRoot />}>
            <Route path="" element={<Assigned />} />
            <Route path="graded" element={<GradedAssignment />} />
            <Route path="create" element={<CreateAssignment />} />
            <Route
              path=":assignmentId"
              element={
                accountType === 'student' ? (
                  <Assignment />
                ) : (
                  <StudentSubmission />
                )
              }
            />
            <Route path="submitted" element={<SubmittedAssignment />} />
          </Route>
          <Route path="class-session" element={<ClassSessionsPage />}>
            <Route path="" element={<CSession />} />
            <Route path=":classSessionId" element={<StudentCS />} />
          </Route>
          <Route path="exam-session" element={<ExamSessionsPage />}>
            <Route path="" element={<ESession />} />
            <Route path=":examSessionId" element={<StudentES />} />
          </Route>
        </Route>
        <Route path="assignment" element={<AssignmentPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route
          path=":classroomId/image"
          element={<JoinClassroomVerification />}
        />
        <Route path=":classroomId/join" element={<JoinPage />} />
      </Routes>
    </>
  );
};

export default App;
