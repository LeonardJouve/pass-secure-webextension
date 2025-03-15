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
    clear: (route: Route): void => set({stack: [], current: route}),
    push: (route): void => set(({stack, current}) => ({stack: [...stack, current], current: route})),
    pop: (): void => set(({stack}) => {
        if (!stack.length) {
            return {};
        }

        const newStack = [...stack];
        const top = newStack.pop();
        return {stack: newStack, top};
    }),
}));

export default useRouter;
