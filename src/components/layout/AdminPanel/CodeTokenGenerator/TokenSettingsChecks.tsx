import { TokenSettings } from "@/types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import useWindowSize from "@/hooks/useWindowSize";

type Props = {
  tokenSettings: TokenSettings;
  setTokenSettings: (val: TokenSettings) => void;
};

type InputContainerProps = {
  children: React.ReactNode;
  label: string;
};

const InputContainer: React.FC<InputContainerProps> = ({ label, children }) => {
  const isMobile = useWindowSize(700)
  return (
    <label className={clsx(
      "flex items-center gap-2 text-sm font-medium text-gray-700",
      isMobile ? '' : 'px-5'
    )} style={{wordBreak: "break-word"}}>
      {children}
      {label}
    </label>
  );
};

export const TokenSettingsChecks: React.FC<Props> = ({
  tokenSettings,
  setTokenSettings,
}) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputContainer label={t('generate.uppercase')}>
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
      <InputContainer label={t('generate.lowercase')}>
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
      <InputContainer label={t('generate.numbers')}>
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
      <InputContainer label={t('generate.symbols')}>
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
