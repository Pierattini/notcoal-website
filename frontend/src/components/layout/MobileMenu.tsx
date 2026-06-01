"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

import {
  Grid2x2,
  BriefcaseBusiness,
  Building2,
  Mail,
  Home
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({
  open,
  onClose
}: Props) {
  const { t } = useLanguage();

  return (
    <>
      <div
        className={`mobileOverlay ${open ? "active" : ""}`}
        onClick={onClose}
      />

      <aside
        className={`mobileMenu ${open ? "active" : ""}`}
      >

        <Link href="/" onClick={onClose}>
          <Home size={18} />
          {t.navbar.home}
        </Link>
        <Link href="/company" onClick={onClose}>
          <Building2 size={18} />
          {t.navbar.company}
        </Link>
        <Link href="/services" onClick={onClose}>
          <Grid2x2 size={18} />
          {t.navbar.services}
        </Link>

        <Link href="/projects" onClick={onClose}>
          <BriefcaseBusiness size={18} />
          {t.navbar.projects}
        </Link>
       {/* 
    <Link href="/contact" onClick={onClose}>
      <Mail size={18} />
      {t.navbar.contact}
    </Link>
    */}

      </aside>
    </>
  );
}

// touch: ensure TypeScript/IDE picks up this file after recent file changes
export {};
