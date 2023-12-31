interface iExpenseEntry {
  name: string;
  price: number;
  purchaseDate: string;
  description: string;
  place: string;
}

export const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const addExpenseEntry = async () => {
  const res = await fetch(
  new Request(createUrl("/api/entry"), { method: "POST" })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
