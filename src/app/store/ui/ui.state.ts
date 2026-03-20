export interface ThemeState {
    isDarkTheme: boolean;
    loading: boolean;
    error: string | null;
}

export const initialUiState: ThemeState = {
    isDarkTheme: false,
    loading: false,
    error: null,
}