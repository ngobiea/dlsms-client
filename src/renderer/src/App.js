import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClassRoomsPage from './pages/ClassRoomPages/ClassRoomsPage';
import MonitorPage from './pages/MonitorPages/MonitorPage';
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

const App = () => {
  return (
    <>
      <TitleNav />
      <SideBar />
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
          </Route>
        </Route>
        <Route path="monitor" element={<MonitorPage />} />
        <Route path="assignment" element={<AssignmentPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path=":classroomId/image" element={<JoinClassroomVerification />} />
        <Route path=":classroomId/join" element={<JoinPage />} />
      </Routes>
    </>
  );
};

export default App;
