import { useState } from "react";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";
import { dark } from "../AppLayout/AppLayout";

export default function DarkModeButton() {
  const [mode, setMode] = useState(dark());

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
