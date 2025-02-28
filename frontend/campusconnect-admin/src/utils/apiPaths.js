export const BASE_URL = "https://adminpannel-s5so.onrender.com";

//utils/apipaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",

    GET_USER_INFO: "/api/v1/auth/getUser",
    UPDATE_PROFILE: "/api/v1/auth/update",
  },
  USERS: {
    USER_LIST: "/api/v1/users",
    UPDATE_STATUS: (id) => `/api/v1/users/${id}/status`,
  },

  POLLS: {
    CREATE: "/api/v1/poll/create",
    GET_ALL: "/api/v1/poll/getAllPolls",
    ADD_USER: "/api/v1/poll/addUser",
    GET_BY_ID: (pollId) => `/api/v1/poll/${pollId}`,
    VOTE: (pollId) => `/api/v1/poll/${pollId}/vote`,
    CLOSE: (pollId) => `/api/v1/poll/${pollId}/close`,
    BOOKMARK: (pollId) => `/api/v1/poll/${pollId}/bookmark`,
    GET_BOOKMARKED: "/api/v1/poll/votedPolls",
    DELETE: (pollId) => `/api/v1/poll/${pollId}/delete`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
  REPORTS: {
    CREATE: "/api/v1/reports/create",
    GET_ALL: "/api/v1/reports",
    GET_BY_ID: (reportId) => `/api/v1/reports/${reportId}`,
    DELETE_POST: (postId) => `/api/v1/reports/delete-post/${postId}/delete`,
    MARK_AS_CHECKED: (reportId) => `/api/v1/reports/${reportId}/mark-checked`,
  },
};
