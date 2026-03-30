import { User } from "../../shared/models/user.model";
import { TablePreferences } from "../../shared/models/table-preferences.model";

export interface UserTableState {
    users: User[] ;
    preferences: TablePreferences | null;
    totalItems: number;
    loading: boolean;
    error: string | null;
}

export const initialUserTableState: UserTableState = {
    users: [],
    preferences: null,
    totalItems: 0,
    loading: false,
    error: null,
};