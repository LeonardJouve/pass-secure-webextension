import {create} from "zustand";

type ErrorStore = {
    error: string|null;
    setError: (error: string) => void;
};

const useError = create<ErrorStore>((set) => ({
    error: null,
    setError: (error): void => set({error}),
}));

export default useError;
