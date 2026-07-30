// // BAD: Stale closure risk if called multiple times rapidly
// function handleLikeStale() {
//   store.setState({ likes: store.getState().likes + 1 });
// }

// // GOOD: Functional updater guarantees it receives the absolute latest state
// function handleLikeSafe() {
//   store.setState((currentState) => {
//     return { likes: currentState.likes + 1 };
//   });
// }

// ///////>>>>>///////

// interface AppState {
//   notifications: string[];
// }

// function addNotification(message: string) {
//   store.setState((prev) => ({
//     // We spread the old array and append the new item
//     notifications: [...prev.notifications, message],
//   }));
// }

// Inside a component or class tracking counters
let totalDownloads = 0;

async function handleDownloadClick() {
  // Simulating an async network call lag
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Danger: totalDownloads could have changed externally during the 100ms lag!
  totalDownloads = totalDownloads + 1;
}


type StateUpdater<T> = (currentState: T) => T;

class AtomicStore<TState> {
  private state: TState;
  
  setState(updater: StateUpdater<TState>) {
    // The updater function safely receives the absolute latest actual reference
    this.state = updater(this.state);
  }
}

// Usage: Completely immune to asynchronous race condition bugs
store.setState((latestState) => ({
  ...latestState,
  counter: latestState.counter + 1
}));

// setState(prev => ({ ...prev, counter: prev.counter + 1 }));


