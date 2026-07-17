type FetchState = 
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; errorMessage: string };

function renderUI(state: FetchState) {
  if (state.status === "loading") return <Spinner />;
  
  if (state.status === "error") {
    // TypeScript knows 'errorMessage' exists here!
    return <Error msg={state.errorMessage} />; 
  }

  if (state.status === "success") {
    // TypeScript knows 'data' exists here!
    return <ul>{state.data.map(d => <li>{d}</li>)}</ul>;
  }
}




////////>>>>>>?////////


type SocketMessage = 
  | { type: "USER_JOINED"; userId: string; timestamp: number }
  | { type: "NEW_MESSAGE"; text: string; senderId: string }
  | { type: "TYPING_INDICATOR"; isTyping: boolean };

function handleSocketData(event: SocketMessage) {
  switch (event.type) {
    case "NEW_MESSAGE":
      console.log(event.text); // Safely narrowed
      break;
    case "USER_JOINED":
      console.log("Joined at", event.timestamp); // Safely narrowed
      break;
  }
}