import { User } from '../../shared/models/user.model';

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAuthInitialized: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  isAuthInitialized: false, 
  loading: false,
  error: null,
};