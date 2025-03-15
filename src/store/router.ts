import {create} from "zustand";

export enum Route {
    LOGIN,
    REGISTER,
    MAIN,
    EDIT_PROFILE,
}

type RouterStore = {
    stack: Route[];
    current: Route;
    clear: (route: Route) => void;
    push: (route: Route) => void;
    pop: () => void;
};

const useRouter = create<RouterStore>((set) => ({
    stack: [],
    current: Route.MAIN,
    clear: (current: Route): void => set({stack: [], current}),
    push: (route): void => set(({stack, current}) => ({stack: [...stack, current], current: route})),
    pop: (): void => set(({stack}) => {
        if (!stack.length) {
            return {};
        }

        const newStack = [...stack];
        const current = newStack.pop();
        return {stack: newStack, current};
    }),
}));

export default useRouter;
