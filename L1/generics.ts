// Without Generics, we have to guess the shape (brittle)
// interface AnyStore {
//   state: any;
// }

// // With Generics, the structure adapts perfectly to the caller
// interface StrictStore<TState> {
//   state: TState;
//   getState: () => TState;

// }

// const productStore: StrictStore<{ items: string[]; total: number }> = {
//   state: { items: ["Laptop"], total: 1200 },
//   getState() {
//     return this.state;
//   },
// };


// The generic wrapper
interface ApiResponse<T> {
  data: T | null;
  status: number;
  errorMessage?: string;
}

interface User { id: string; name: string; }
interface Product { sku: string; price: number; }

// Usage: The IDE now knows exactly what 'response.data' contains
const fetchUser = async (): Promise<ApiResponse<User>> => { /*...*/ }
const fetchProducts = async (): Promise<ApiResponse<Product[]>> => { /*...*/ }


interface SelectProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onSelect: (item: T) => void;
}

// Usage: TypeScript infers that 'item' is a User object automatically
<Select 
  items={[{ id: 1, name: "Alice" }]} 
  renderItem={(item) => <span>{item.name}</span>}
  onSelect={(item) => console.log(item.id)}
/>