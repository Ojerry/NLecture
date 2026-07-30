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





//// >>>> ////



interface NetworkState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  data: string[] | null;
}

// const newState: NetworkState = {
//   isLoading: true,
//   isError: true,
//   errorMessage: "Failed to fetch data",
//   data: [...],
// }

type NetworkStateUnion = {state: object, loading: boolean}
interface INetworkStateUnion {
  state: object;
  loading: boolean;
}

interface NetworkStateUnion {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  data: string[] | null;
}

type SecureNetworkState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; errorMessage: string }
  | { status: "success"; data: string[] };

// switch (secureState.status) {
//   case "error":
//     console.log(secureState.errorMessage);
//     break;
//   case "success":
//     console.log(secureState.data); // TypeScript knows this exists!
//     break;
//   default:
//     console.log("No data yet");
// }

const [data, setData] = useState<SecureNetworkState>();

const fetchData = ()=>{
  try{
    setData({ status: "loading" });
    const response = await fetch("https://api.example.com/data");

    const data = await response.json();
    setData({ status: "success", data });

  }catch(e){
    setData({ status: "error", errorMessage: "Failed to fetch data" });
  }
}

function renderDashboard(state: SecureNetworkState) {
  // At this line, trying to read state.data throws an error because it might not exist yet!
  
  switch (state.status) {
    case "error":
      state.
      // TypeScript reads the guard and narrows the block. 
      // It guarantees state.errorMessage exists here!
      return `<ErrorAlert message={state.errorMessage} />`;
      
    case "success":
      state.
      // TypeScript safely unblocks full autocomplete access to state.data
      return `<ul>${state.data.map(item => `<li>${item}</li>`)}</ul>`;
  }
}


renderDashboard(data);



`
In TypeScript, interface and type are highly similar and often interchangeable 
for defining object shapes. However, type is more flexible and 
expressive because it handles primitives, unions, and advanced utility types, 
while interface is specifically tailored for defining object structures and 
supports automated declaration merging. 
`

interface UserState {
  status: "idle" | "loading" | "success" | "error";
  data?: { id: string; name: string };
  errorMessage?: string;
}

function renderProfile(state: UserState) {
  if (state.status === "success") {
    // ❌ TypeScript Compiler Error: 'state.data' is possibly 'undefined'
    console.log(state.data.name); 
  }
}


