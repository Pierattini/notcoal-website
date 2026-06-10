"use client";

import {
  Menu,
  User,
  X
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState
} from "react";

import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const { openLoginModal } = useAuth();
  const [open, setOpen] =
    useState(false);
  const [userMenuOpen, setUserMenuOpen] =
    useState(false);
  const userMenuRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const closeMenu = () => {
      setOpen(false);
    };

    window.addEventListener(
      "scroll",
      closeMenu
    );

    return () => {
      window.removeEventListener(
        "scroll",
        closeMenu
      );
    };

  }, []);

  useEffect(() => {
    const closeUserMenu = (
      event: MouseEvent
    ) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      closeUserMenu
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeUserMenu
      );
    };
  }, []);

  return (
    <>
      <header className="nav">

        <div className="brand">

          <Image
  src="/logos/logofullt.png"
  alt="The Not Coal Company"
  width={420}
  height={84}
  className="navbarLogo"
  priority
/>

        </div>

        <nav className="navLinks">

  <Link href="/">
    {t.navbar.home}
  </Link>

  <Link href="/services">
    {t.navbar.services}
  </Link>

  <Link href="/projects">
    {t.navbar.projects}
  </Link>

  <Link href="/company">
    {t.navbar.company}
  </Link>

  <Link href="/contact">
    {t.navbar.contact}
  </Link>

</nav>

        <div className="navRight">

          <div className="languageSwitcher">
            <button
              className={locale === 'en' ? 'activeLang' : ''}
              onClick={() => setLocale('en')}
              aria-pressed={locale === 'en'}
            >
              EN
            </button>

            <button
              className={locale === 'es' ? 'activeLang' : ''}
              onClick={() => setLocale('es')}
              aria-pressed={locale === 'es'}
            >
              ES
            </button>

            <button
              className={locale === 'de' ? 'activeLang' : ''}
              onClick={() => setLocale('de')}
              aria-pressed={locale === 'de'}
            >
              DE
            </button>

          </div>

          <div
            className="userAccess"
            ref={userMenuRef}
          >
            <button
              type="button"
              className="userAccessButton"
              aria-label="My Project"
              aria-expanded={userMenuOpen}
              onClick={() =>
                setUserMenuOpen(!userMenuOpen)
              }
            >
              <User size={20} strokeWidth={1.8} />
              <span className="userAccessTooltip">
                My Project
              </span>
            </button>

            {userMenuOpen && (
              <div className="userAccessDropdown">
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(false);
                    openLoginModal();
                  }}
                >
                  Login
                </button>

                {/*
                  Future authenticated menu options:
                  My Project, Profile and Logout.
                  CLIENT users will later access /my-project.
                */}
              </div>
            )}
          </div>

          <button
            className="menuBtn"
            onClick={() =>
              setOpen(!open)
            }
          >
            {
              open
                ? <X size={26} />
                : <Menu size={26} />
            }
          </button>

        </div>

      </header>

      <MobileMenu
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );

}
