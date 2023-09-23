import React from 'react';

import ExamSessionControl from '../../components/ExamSession/ExamSessionControl';
import ExamSessionView from '../../components/examSession/ExamSessionView';
const ExamSession = () => {
  return (
    <div className="relative pt-10 h-screen overflow-hidden">
      <ExamSessionControl />
      <ExamSessionView />
      
    </div>
  );
};

export default ExamSession;
