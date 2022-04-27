import { createContext, useReducer, ReactNode, FC } from "react";
import { Surveys } from "../../types/survey";

interface DriveToken {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

interface Group {
  id: string;
  name: string;
  surveys: string[];
  userId: string;
}

type SetFieldHandler = (
  fieldKey: string,
  value: string | DriveToken | Group[] | Surveys[]
) => void;

export interface Admin {
  uid: string;
  editingGroupId: string;
  editingSurveyId: string;
  newSurveyId: string;
  driveToken?: DriveToken;
  groups: Group[];
  surveys: Surveys[];
  setField: SetFieldHandler;
}

const initialState: Admin = {
  uid: "",
  editingGroupId: "",
  editingSurveyId: "",
  newSurveyId: "",
  driveToken: {
    access_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
    expiry_date: 0,
  },
  groups: [],
  surveys: [],
  setField: (fieldKey, value) => {},
};

const AdminContext = createContext(initialState);

interface AdminAction {
  type: string;
  payload: string | DriveToken | Group[] | Surveys[];
}

interface AdminReducerState {
  uid: string;
  editingGroupId: string;
  editingSurveyId: string;
  newSurveyId: string;
  driveToken?: DriveToken;
  groups: Group[];
  surveys: Surveys[];
}

const adminReducer = (state: AdminReducerState, action: AdminAction) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const initAdminReducerState = {
  uid: "",
  editingGroupId: "",
  editingSurveyId: "",
  newSurveyId: "",
  driveToken: {
    access_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
    expiry_date: 0,
  },
  groups: [],
  surveys: [],
};

interface AdminProviderProps {
  children: ReactNode;
}

const AdminProvider: FC<AdminProviderProps> = ({ children }) => {
  const [adminInfo, dispatch] = useReducer(adminReducer, initAdminReducerState);
  const setFieldHandler: SetFieldHandler = (fieldKey, value) => {
    dispatch({ type: fieldKey, payload: value });
  };
  const adminDefaultContext = {
    ...initialState,
    setField: setFieldHandler,
  };
  return (
    <AdminContext.Provider value={adminDefaultContext}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
