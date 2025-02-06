import { TokenSettings } from "@/types";

type Props = {
  tokenSettings: TokenSettings;
  setTokenSettings: (val: TokenSettings) => void;
};

type InputContainerProps = {
  children: React.ReactNode;
  label: string;
};

const InputContainer: React.FC<InputContainerProps> = ({ label, children }) => {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 px-5">
      {children}
      {label}
    </label>
  );
};

export const TokenSettingsChecks: React.FC<Props> = ({
  tokenSettings,
  setTokenSettings,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputContainer label="Uppercase">
        <input
          type="checkbox"
          checked={tokenSettings.withUppercase}
          onChange={() =>
            setTokenSettings({
              ...tokenSettings,
              withUppercase: !tokenSettings.withUppercase,
            })
          }
        />
      </InputContainer>
      <InputContainer label="Lowercase">
        <input
          type="checkbox"
          checked={tokenSettings.withLowercase}
          onChange={() =>
            setTokenSettings({
              ...tokenSettings,
              withLowercase: !tokenSettings.withLowercase,
            })
          }
        />
      </InputContainer>
      <InputContainer label="Numbers">
        <input
          type="checkbox"
          checked={tokenSettings.withNumbers}
          onChange={() =>
            setTokenSettings({
              ...tokenSettings,
              withNumbers: !tokenSettings.withNumbers,
            })
          }
        />
      </InputContainer>
      <InputContainer label="Symbols">
        <input
          type="checkbox"
          checked={tokenSettings.withSymbols}
          onChange={() =>
            setTokenSettings({
              ...tokenSettings,
              withSymbols: !tokenSettings.withSymbols,
            })
          }
        />
      </InputContainer>
    </div>
  );
};
