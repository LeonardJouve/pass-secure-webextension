import {create} from "zustand";

export enum Route {
    LOGIN,
    REGISTER,
    MAIN,
    EDIT_PROFILE,
    CREATE_FOLDER,
    EDIT_FOLDER,
    CREATE_ENTRY,
    EDIT_ENTRY,
    UNLOCK,
}

type Entry = {
    route: Route;
    params: Record<string|number, unknown>;
};

type RouterStore = {
    stack: Entry[];
    current: Entry;
    clear: (route: Entry["route"], params?: Entry["params"]) => void;
    push: (route: Entry["route"], params?: Entry["params"]) => void;
    pop: () => void;
    replace: (route: Entry["route"], params?: Entry["params"]) => void;
};

const useRouter = create<RouterStore>((set) => ({
    stack: [],
    current: {route: Route.LOGIN, params: {}},
    clear: (route: Entry["route"], params: Entry["params"] = {}): void => set({stack: [], current: {route, params}}),
    push: (route, params = {}): void => set(({stack, current}) => ({stack: [...stack, current], current: {route, params}})),
    pop: (): void => set(({stack}) => {
        if (!stack.length) {
            return {};
        }

        const newStack = [...stack];
        const current = newStack.pop();
        return {stack: newStack, current};
    }),
    replace: (route, params = {}): void => set({current: {route, params}}),
}));

export default useRouter;
