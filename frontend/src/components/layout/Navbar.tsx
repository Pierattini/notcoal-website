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
import { useLanguage } from "@/context/LanguageContext";
export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  console.log(locale);
console.log(t);
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
          <div className="logoBox">
            N
          </div>

          <strong>
            The Not Coal Company
          </strong>
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
    onClick={() => setLocale("en")}
    className={locale === "en" ? "activeLang" : ""}
  >
    EN
  </button>

  <button
    onClick={() => setLocale("es")}
    className={locale === "es" ? "activeLang" : ""}
  >
    ES
  </button>

  <button
    onClick={() => setLocale("de")}
    className={locale === "de" ? "activeLang" : ""}
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