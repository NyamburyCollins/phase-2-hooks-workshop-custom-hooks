import { useEffect, useState } from "react";

function getLocalStorageValue(key) {
  const storedValue = localStorage.getItem(key);
  try {
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return storedValue;
  }
}

function setLocalStorageValue(key, value) {
  const valueToStore = JSON.stringify(value);
  localStorage.setItem(key, valueToStore);
}

export function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => {
    const storedValue = getLocalStorageValue(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    setLocalStorageValue(key, state);
  }, [key, state]);

  return [state, setState];
}

function Form() {
  const [name, setName] = useLocalStorage("userName", "");

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Name:</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <h4>{name ? `Welcome, ${name}!` : "Enter your name"}</h4>
    </form>
  );
}

function FormWithObject() {
  const [formData, setFormData] = useLocalStorage("formData", {
    title: "",
    content: "",
  });

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="title">Title:</label>
      <input name="title" value={formData.title} onChange={handleChange} />
      <label htmlFor="content">Content:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
    </form>
  );
}

export default function App() {
  return (
    <div>
      <h2>useLocalStorage can save string</h2>
      <Form />
      <hr />
      <h2>useLocalStorage can save objects (Bonus)</h2>
      <FormWithObject />
    </div>
  );
}