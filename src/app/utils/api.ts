interface iExpenseEntry {
  name: string;
  price: number;
  purchaseDate: Date;
  description: string;
  place: string;
}

export const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const addExpenseEntry = async (expense: iExpenseEntry) => {
  const res = await fetch(
    new Request(createUrl("/api/entry"), { method: "POST", body: JSON.stringify({ expense }), }),
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
