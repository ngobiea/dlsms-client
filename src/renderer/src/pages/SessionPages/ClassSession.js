import React from 'react';

import SessionControl from './SessionControl';
import SessionView from './SessionView';
const ClassSession = () => {
  return (
    <div className="relative pt-10 h-screen overflow-hidden">
      <SessionControl />
      <SessionView />
    </div>
  );
};

export default ClassSession;
