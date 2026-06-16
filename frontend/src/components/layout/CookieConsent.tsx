"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type CookiePreferences = {
  functional: true;
  analytics: boolean;
  marketing: boolean;
};

type ConsentView = "summary" | "preferences";

const STORAGE_KEY = "cookiePreferences";
const CONSENT_KEY = "cookieConsentDecision";

const defaultPreferences: CookiePreferences = {
  functional: true,
  analytics: false,
  marketing: false,
};

const allPreferences: CookiePreferences = {
  functional: true,
  analytics: true,
  marketing: true,
};

const saveConsentDecision = (
  preferences: CookiePreferences,
  decision: "accepted" | "declined" | "custom" | "closed",
) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  localStorage.setItem(CONSENT_KEY, decision);
  document.cookie = `cookie_consent=${decision}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
};

export default function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<ConsentView>("summary");
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const hasDecision = Boolean(localStorage.getItem(CONSENT_KEY));

    const frame = requestAnimationFrame(() => {
      if (!hasDecision) {
        setVisible(true);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const closeModal = () => {
    saveConsentDecision(defaultPreferences, "closed");
    setPreferences(defaultPreferences);
    setVisible(false);
  };

  const acceptAll = () => {
    saveConsentDecision(allPreferences, "accepted");
    setPreferences(allPreferences);
    setVisible(false);
  };

  const declineAll = () => {
    saveConsentDecision(defaultPreferences, "declined");
    setPreferences(defaultPreferences);
    setVisible(false);
  };

  const savePreferences = () => {
    saveConsentDecision(preferences, "custom");
    setVisible(false);
  };

  const togglePreference = (field: keyof Omit<CookiePreferences, "functional">) => {
    setPreferences((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookieConsentOverlay" role="presentation">
      <div
        className="cookieConsentCard"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookieConsentTitle"
      >
        <button
          type="button"
          className="cookieConsentClose"
          onClick={closeModal}
          aria-label="Close cookie consent"
        >
          ×
        </button>

        {view === "summary" ? (
          <>
            <div className="cookieConsentHeader">
              <span className="cookieBadge">Cookies</span>
              <h2 id="cookieConsentTitle">Manage consent</h2>
              <p>
                We use cookies and similar technologies to operate this website, remember essential preferences, improve performance and, if you agree, support analytics and marketing activity. Optional cookies are never enabled unless you choose them.
              </p>
            </div>

            <div className="cookieConsentActions">
              <button type="button" className="cookieConsentButton" onClick={acceptAll}>
                Accept All
              </button>
              <button type="button" className="cookieConsentButton" onClick={declineAll}>
                Decline All
              </button>
              <button type="button" className="cookieConsentButton" onClick={() => setView("preferences")}>
                Select Preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cookieConsentHeader">
              <span className="cookieBadge">Preferences</span>
              <h2 id="cookieConsentTitle">Cookie preferences</h2>
              <p>
                Choose which optional cookies The Not Coal Company OÜ may use. Functional cookies remain enabled because they are required for core website features.
              </p>
            </div>

            <div className="cookieConsentCategories">
              <label className="cookiePreferenceRow">
                <input type="checkbox" checked disabled />
                <span>
                  <strong>Functional Cookies</strong>
                  <small>Required for security, forms, language preferences and basic site operation.</small>
                </span>
              </label>

              <label className="cookiePreferenceRow">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference("analytics")}
                />
                <span>
                  <strong>Analytics Cookies</strong>
                  <small>Help us understand website performance and improve the experience.</small>
                </span>
              </label>

              <label className="cookiePreferenceRow">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference("marketing")}
                />
                <span>
                  <strong>Marketing Cookies</strong>
                  <small>Support relevant communications and campaign measurement where implemented.</small>
                </span>
              </label>
            </div>

            <div className="cookieConsentActions">
              <button type="button" className="cookieConsentButton" onClick={savePreferences}>
                Save Preferences
              </button>
              <button type="button" className="cookieConsentButton" onClick={() => setView("summary")}>
                Back
              </button>
            </div>
          </>
        )}

        <div className="cookieConsentLinks">
          <Link href="/cookies-policy">{t.legalLinks.cookiesPolicy}</Link>
          <Link href="/privacy-policy">{t.legalLinks.privacyPolicy}</Link>
        </div>
      </div>
    </div>
  );
}
