import React, { useState } from "react";
import axios from "axios";
import PasswordIcon from "@mui/icons-material/Password";

function App() {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(false);
  const [useDigits, setUseDigits] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const generatePassword = async () => {
    try {
      const response = await axios.post(`${apiBase}/api/generate/`, {
        length: length,
        uppercase: useUpper,
        digits: useDigits,
        symbols: useSymbols,
      });
      if (response) {
        setPassword(response.data.password);
      } else {
        setPassword("");
      }
    } catch (error) {
      console.error("Error generating password:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-red-100">
      <div className="m-8">
        <h1>Password Generator</h1>

        <div className="flex flex-col justify-center items-start mb-2">
          <div className="my-2">
            <label>Length: </label>
            <input
              type="number"
              value={length}
              min={0}
              max={20}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="my-2">
            <label>
              <input
                type="checkbox"
                checked={useUpper}
                onChange={() => setUseUpper(!useUpper)}
              />{" "}
              Include Uppercase
            </label>
          </div>

          <div className="my-2">
            <label>
              <input
                type="checkbox"
                checked={useDigits}
                onChange={() => setUseDigits(!useDigits)}
              />{" "}
              Include Digits
            </label>
          </div>

          <div className="my-2">
            <label>
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={() => setUseSymbols(!useSymbols)}
              />{" "}
              Include Symbols
            </label>
          </div>
        </div>
      </div>

      <div className="m-2">
        <button
          className="!bg-purple-700 flex justify-center"
          onClick={generatePassword}
        >
          <PasswordIcon />
          Generate
        </button>
      </div>

      {password && (
        <div className="m-2">
          <h2>Your Password:</h2>
          <p>{password}</p>
        </div>
      )}
    </div>
  );
}

export default App;
