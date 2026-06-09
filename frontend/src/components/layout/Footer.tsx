import Image from "next/image";
import Link from "next/link";
export default function Footer() {
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
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/legal/terminos-condiciones">Terms</a>
        <a href="/cookies-policy">Cookies Policy</a>
      </div>

    </footer>
  );
}
