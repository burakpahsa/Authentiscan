import { createToken, useQueryParam } from "@/helpers/tokens";
import { useCallback, useEffect, useState } from "react";

export const TokenGenerator: React.FC = () => {
  const [length, setLength] = useQueryParam("length", 64);
  const [withUppercase, setWithUppercase] = useQueryParam("uppercase", true);
  const [withLowercase, setWithLowercase] = useQueryParam("lowercase", true);
  const [withNumbers, setWithNumbers] = useQueryParam("numbers", true);
  const [withSymbols, setWithSymbols] = useQueryParam("symbols", false);

  const [token, setToken] = useState("");

  const refreshToken = useCallback(() => {
    setToken(
      createToken({
        length,
        withUppercase,
        withLowercase,
        withNumbers,
        withSymbols,
      })
    );
  }, [length, withUppercase, withLowercase, withNumbers, withSymbols]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  const copy = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <div className="p-5 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={withUppercase}
            onChange={() => setWithUppercase(!withUppercase)}
          />
          Uppercase
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={withLowercase}
            onChange={() => setWithLowercase(!withLowercase)}
          />
          Lowercase
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={withNumbers}
            onChange={() => setWithNumbers(!withNumbers)}
          />
          Numbers
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={withSymbols}
            onChange={() => setWithSymbols(!withSymbols)}
          />
          Symbols
        </label>
      </div>

      <div className="mt-4">
        <label className="block mb-2">Length: {length}</label>
        <input
          type="range"
          min="1"
          max="512"
          step="1"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <textarea
        value={token}
        readOnly
        rows={3}
        className="w-full mt-4 p-2 border rounded-lg text-center"
      />

      <div className="mt-5 flex justify-center gap-3">
        <button
          onClick={copy}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Copy
        </button>
        <button
          onClick={refreshToken}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};
