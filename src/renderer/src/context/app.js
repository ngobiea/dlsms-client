import React, { createContext } from 'react';
const AppContext = createContext();

const Provider = ({ children }) => {
  return <AppContext.Provider>{children}</AppContext.Provider>;
};

export { Provider };
export default AppContext;
