"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookiePreferences";
const CONSENT_KEY = "cookieConsentAccepted";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const savePreferences = (preferences: CookiePreferences) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  localStorage.setItem(CONSENT_KEY, "true");
  document.cookie = `cookie_consent=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
};

const getStoredPreferences = (): CookiePreferences | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as CookiePreferences;
  } catch {
    return null;
  }
};

const hasStoredConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "true";
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const storedPreferences = getStoredPreferences();
    if (storedPreferences) {
      setPreferences(storedPreferences);
    }
    if (!hasStoredConsent()) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const allGranted = {
      necessary: true,
      analytics: true,
      marketing: true,
    } as const;
    setPreferences(allGranted);
    savePreferences(allGranted);
    setVisible(false);
  };

  const rejectAll = () => {
    setPreferences(defaultPreferences);
    savePreferences(defaultPreferences);
    setVisible(false);
  };

  const saveSelection = () => {
    savePreferences(preferences);
    setVisible(false);
  };

  const togglePreference = (field: keyof Omit<CookiePreferences, "necessary">) => {
    setPreferences((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookieConsentBanner" role="dialog" aria-modal="true" aria-label="Consentimiento de cookies">
      <div className="cookieConsentCard">
        <div className="cookieConsentHeader">
          <div>
            <span className="cookieBadge">Cookies</span>
            <h2>Control de cookies y privacidad</h2>
          </div>
          <p>Selecciona tus preferencias de cookies para mejorar tu experiencia manteniendo el cumplimiento de RGPD/GDPR.</p>
        </div>

        <div className="cookieConsentContent">
          <div className="cookieConsentText">
            <p>
              Usamos cookies necesarias para el funcionamiento básico del sitio. Las cookies analíticas y de marketing solo se activarán tras un consentimiento explícito.
            </p>
          </div>

          <div className="cookieConsentCategories">
            <div className="cookieCategory">
              <div>
                <strong>Cookies necesarias</strong>
                <p>Siempre activas para que el sitio funcione correctamente.</p>
              </div>
              <span className="cookieState">Siempre activas</span>
            </div>

            <div className="cookieCategory">
              <div>
                <strong>Cookies analíticas</strong>
                <p>Recogen datos anónimos para mejorar el rendimiento del sitio.</p>
              </div>
              <label className="cookieToggle">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference("analytics")}
                />
                <span>Activar</span>
              </label>
            </div>

            <div className="cookieCategory">
              <div>
                <strong>Cookies de marketing</strong>
                <p>Personalizan contenidos y anuncios según tus preferencias.</p>
              </div>
              <label className="cookieToggle">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference("marketing")}
                />
                <span>Activar</span>
              </label>
            </div>
          </div>

          <div className="cookieConsentActions">
            <button type="button" className="cookieConsentButton cookieConsentPrimary" onClick={acceptAll}>
              Aceptar todas
            </button>
            <button type="button" className="cookieConsentButton cookieConsentSecondary" onClick={rejectAll}>
              Rechazar
            </button>
            <button type="button" className="cookieConsentButton cookieConsentTextButton" onClick={() => setOpen(!open)}>
              {open ? "Cerrar" : "Configurar preferencias"}
            </button>
          </div>

          {open ? (
            <div className="cookieConsentPreferences">
              <div className="cookiePreferencesList">
                <label>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                  />
                  Cookies necesarias (siempre activas)
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference("analytics")}
                  />
                  Cookies analíticas
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference("marketing")}
                  />
                  Cookies de marketing
                </label>
              </div>
              <div className="cookiePreferencesActions">
                <button type="button" className="cookieConsentButton cookieConsentPrimary" onClick={saveSelection}>
                  Guardar preferencias
                </button>
                <Link href="/legal/cookies" className="cookieConsentLink">
                  Política de Cookies
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
