Target Focus: Advanced Generics, Immutability, Type Narrowing, & Callback Updaters

Timeline: 1 Week (Due before our next sync)

📌 The Target Interface Contract
Your task is to implement a factory function createStore that strictly satisfies this TypeScript interface:

TypeScript
export type FunctionalUpdater<TState> = (current: TState) => Partial<TState>;
export type StateUpdatePayload<TState> = Partial<TState> | FunctionalUpdater<TState>;

export interface MiniStore<TState> {
getState: () => TState;
setState: (updater: StateUpdatePayload<TState>) => void;
}

// The factory function you need to implement:
export declare function createStore<TState>(initialState: TState): MiniStore<TState>;
⚙️ Week 1 Technical Requirements
Generic State Initialization:

createStore must accept an initialState object and infer its exact generic shape (TState) without using any.

Read Access (getState):

Must return the current snapshot of the state safely.

Write Access (setState):

Must accept EITHER a direct partial object slice (e.g., { theme: "dark" }) OR a functional callback updater (e.g., (prev) => ({ count: prev.count + 1 })).

Must narrow the type of updater at runtime using typeof to handle both cases cleanly.

Must immutably merge state updates under the hood using shallow object spreading.

🧪 Definition of Done / Acceptance Criteria
[ ] Setting up a clean TypeScript project environment (tsc, vite, or vitest/jest).

[ ] Passing an invalid property key or wrong primitive type to setState() triggers a compile-time error immediately in the IDE.

[ ] Calling setState() using a callback updater correctly receives the fresh current state, preventing stale closure bugs.

[ ] Includes a simple demo file (index.ts or a test runner) demonstrating state changes in action.

💡 Guidance & Blocker Process
Start by writing out the TypeScript definitions first before writing the actual JavaScript execution logic!

If you get stuck on functional updater logic or type narrowing for setState, drop your draft snippet in our chat channel—don't stay stuck for more than 24 hours without reaching out.
