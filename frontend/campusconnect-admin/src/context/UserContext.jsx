import React, { createContext, useState } from "react";

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const updateUser = (userData) => {
    setUser(userData);
  };
  //function to clear user data
  const clearUser = () => {
    setUser(null);
  };

  //const user stats
  const updateUserStats = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //update totalPollsCreated count locally

  const onPollCreatedOrDelete = (type = "create") => {
    const totalPollsCreated = user.totalPollsCreated || 0;
    updateUserStats(
      "totalPollsCreated",
      type == "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        onPollCreatedOrDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
