import { User } from "../../shared/models/user.model";
import { TablePreferences } from "../../shared/models/table-preferences.model";

export interface UserTableState {
    users: User[] | null;
    preferences: TablePreferences | null;
    loading: boolean;
    error: string | null;
}

export const initialUserTableState: UserTableState = {
    users: [],
    preferences: null,
    loading: false,
    error: null,
};