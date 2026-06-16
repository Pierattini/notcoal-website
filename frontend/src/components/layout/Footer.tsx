"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footerSimple">

  <div className="footerBrandSimple">
  <Image
    src="/logos/logofullt.png"
    alt="The Not Coal Company"
    width={320}
    height={64}
    className="footerLogoHorizontal"
    priority
  />
</div>



      <div className="footerMenuSimple">
        <Link href="/">Home</Link>
        <Link href="/company">Company</Link>
        <Link href="/services">Services</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/#contacto">Contact</Link>
      </div>

      <div className="footerLegalSimple">
        <a href="/privacy-policy">{t.legalLinks.privacyPolicy}</a>
        <a href="/legal/terminos-condiciones">{t.legalLinks.terms}</a>
        <a href="/cookies-policy">{t.legalLinks.cookiesPolicy}</a>
      </div>

    </footer>
  );
}
