"use client";

import {
  Menu,
  X
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] =
    useState(false);

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