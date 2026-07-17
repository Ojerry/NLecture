// BAD: Stale closure risk if called multiple times rapidly
function handleLikeStale() {
  store.setState({ likes: store.getState().likes + 1 });
}

// GOOD: Functional updater guarantees it receives the absolute latest state
function handleLikeSafe() {
  store.setState((currentState) => {
    return { likes: currentState.likes + 1 };
  });
}

///////>>>>>///////

interface AppState {
  notifications: string[];
}

function addNotification(message: string) {
  store.setState((prev) => ({
    // We spread the old array and append the new item
    notifications: [...prev.notifications, message],
  }));
}
