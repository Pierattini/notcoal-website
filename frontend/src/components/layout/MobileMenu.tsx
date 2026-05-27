"use client";

import Link from "next/link";

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
          Inicio
        </Link>

        <Link href="/services" onClick={onClose}>
          <Grid2x2 size={18} />
          Servicios
        </Link>

        <Link href="/projects" onClick={onClose}>
          <BriefcaseBusiness size={18} />
          Proyectos
        </Link>

        <Link href="/company" onClick={onClose}>
          <Building2 size={18} />
          Empresa
        </Link>

       {/* 
<Link href="/contact" onClick={onClose}>
  <Mail size={18} />
  Contacto
</Link>
*/}

      </aside>
    </>
  );

}