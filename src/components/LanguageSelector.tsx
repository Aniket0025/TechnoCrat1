import React, { useState } from "react";
import { translateText } from "@/services/translate";

interface LanguageSelectorProps {
  name: string;
  description: string;
  materials: string[];
  certifications: string[];
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh", label: "Chinese" },
  { code: "ta", label: "Tamil" },
  { code: "bn", label: "Bengali" },
  { code: "ja", label: "Japanese" },
  { code: "ar", label: "Arabic" },
  { code: "ru", label: "Russian" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ name, description, materials, certifications }) => {
  const [selected, setSelected] = useState("en");
  const [translated, setTranslated] = useState({
    name,
    description,
    materials,
    certifications,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelected(lang);
    if (lang === "en") {
      setTranslated({ name, description, materials, certifications });
      return;
    }
    setLoading(true);
    const [tName, tDesc, tMats, tCerts] = await Promise.all([
      translateText(name, lang, "en"),
      translateText(description, lang, "en"),
      Promise.all(materials.map(m => translateText(m, lang, "en"))),
      Promise.all(certifications.map(c => translateText(c, lang, "en"))),
    ]);
    setTranslated({ name: tName, description: tDesc, materials: tMats, certifications: tCerts });
    setLoading(false);
  };

  return (
    <div className="mb-2 p-3 bg-gray-50 rounded shadow-sm">
      <label className="mr-2 font-medium">🌐 Language:</label>
      <select
        value={selected}
        onChange={handleChange}
        className="border rounded px-2 py-1 bg-gray-100 text-gray-900 focus:bg-white focus:border-green-500 font-medium shadow-sm"
        style={{ color: '#222', background: '#f8f9fa', fontWeight: 500 }}
      >
        {LANGUAGES.map((l) => (
          <option
            key={l.code}
            value={l.code}
            className="text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100"
            style={{ color: '#222', background: '#fff' }}
          >
            {l.label}
          </option>
        ))}
      </select>
      <div className="mt-2 text-gray-700 min-h-[2em]">
        {loading ? (
          <span className="italic text-gray-400">Translating...</span>
        ) : (
          <>
            <div><b>Name:</b> {translated.name}</div>
            <div><b>Description:</b> {translated.description}</div>
            <div><b>Materials:</b> {translated.materials.join(", ")}</div>
            {translated.certifications.length > 0 && (
              <div><b>Certifications:</b> {translated.certifications.join(", ")}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
