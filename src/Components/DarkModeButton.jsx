import { useState } from "react";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function dark() {
  document.documentElement.classList.toggle("dark");
  if (localStorage.theme === "light") localStorage.theme = "dark";
  else localStorage.theme = "light";

  return localStorage.theme;
}

export default function DarkModeButton() {
  const [mode, setMode] = useState(localStorage.them);

  return (
    <DarkModeToggle
      mode={mode}
      size="sm"
      inactiveTrackColor="#a39c83"
      inactiveTrackColorOnHover="#d0cdc1"
      inactiveTrackColorOnActive="#a39c83"
      activeTrackColor="#393838"
      activeTrackColorOnHover="#272726"
      activeTrackColorOnActive="#0f172a"
      inactiveThumbColor="#1e293b"
      activeThumbColor="#facc15"
      onChange={(mode) => {
        setMode(dark());
      }}
    />
  );
}
