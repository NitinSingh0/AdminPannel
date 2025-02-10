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

  //update totalPolllsVotes count locally
  const onUserVoted = () => {
    const totalPollsVotes = user.totalPollsVotes || 0;
    updateUserStats("totalPollsVotes", totalPollsVotes + 1);
  };

  //update totalPollsCreated count locally

  const onPollCreatedOrDelete = (type = "create") => {
    const totalPollsCreated = user.totalPollsCreated || 0;
    updateUserStats(
      "totalPollsCreated",
      type == "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
    );
  };

  // Add or remove pol id from bookmarkedPolls
  const toggleBookmarkId = (id) => {
    const bookmarks = user.bookmarkedPolls || [];
    const index = bookmarks.indexOf(id);
    if (index === -1) {
      //Add the ID if it's not in the array
      setUser((prev) => ({
        ...prev,
        bookmarkedPolls: [...bookmarks, id],
        totalPollBookmarked: prev.totalPollsBookmarked + 1,
      }));
    } else {
      //Remove the ID if it's already in the array
      setUser((prev) => ({
        ...prev,
        bookmarkedPolls: bookmarks.filter((item) => item !== id),
        totalPollsBookmarked: prev.totalPollBookmarked - 1,
      }));
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        onPollCreatedOrDelete,
        onUserVoted,
        toggleBookmarkId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
