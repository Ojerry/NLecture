export interface MiniStore<TState> {
  getState: () => TState;
  setState: (updater: Partial<TState> | ((current: TState) => Partial<TState>)) => void;
  subscribe: (listener: (state: TState) => void) => () => void;
}

export declare function createStore<TState>(initialState: TState): MiniStore<TState>;


const store = createStore({ counter: 0, user: { name: "Alice" } });
