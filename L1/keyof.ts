interface TableRow {
  id: string;
  createdAt: Date;
  viewCount: number;
}

// K must be one of the keys of T
function sortData<T, K extends keyof T>(data: T[], sortBy: K): T[] {
  return data.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
}

const rows: TableRow[] = [
  /*...*/
];
sortData(rows, "viewCount"); // Valid
sortData(rows, "views"); // ❌ COMPILER ERROR: "views" is not a key of TableRow

/////////// >>> ///////////

interface UserProfile {
  username: string;
  age: number;
  isVerified: boolean;
}

// K extends keyof UserProfile ensures the key exists.
// UserProfile[K] ensures the value matches the type of that specific key!
function updateProfileField<K extends keyof UserProfile>(
  key: K,
  value: UserProfile[K],
) {
  // update logic here
}

updateProfileField("age", 25); // Valid
updateProfileField("isVerified", "yes"); // ❌ ERROR: Expected boolean, got string
