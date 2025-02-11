import { FormInput } from "@/components/common/FormInput";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setEmail("");
      setPassword("");
      return;
    }
    navigate("/admin/manage-products");
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("login.title")}
          </h1>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <FormInput
            label={t("login.email")}
            value={email}
            required
            onChange={(val: string) => setEmail(val)}
          />
          <FormInput
            label={t("login.password")}
            value={password}
            type="password"
            required
            onChange={(val: string) => setPassword(val)}
          />
        </div>
        <div className="flex w-full mt-6 justify-end">
          <button
            type="button"
            onClick={login}
            className={`px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors`}
          >
            {t("login.submit")}
          </button>
        </div>
      </div>
    </div>
  );
};
