//* ------------ User Interfaces: ------------
export interface User {
    id: number;
    username: string;
    email: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    username: string;
    email: string;
    password: string;
}

interface AuthProps {
    setToken: ( token: string ) => void;
    setUser: ( user: User ) => void;
}

interface LogoutProps {
    removeToken: () => void;
    removeUser: () => void;
}

interface NavigationBarProps {
    user: User;
    removeToken: () => void;
    removeUser: () => void;
}



//* ------------ Tab Interfaces: ------------