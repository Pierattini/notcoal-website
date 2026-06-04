import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footerSimple">

      <div className="footerBrandSimple">

  <Image
  src="/logos/logo-square.png"
  alt="The Not Coal Company"
  width={34}
  height={34}
  className="footerMiniLogo"
/>

  <strong>The Not Coal Company</strong>

</div>

      <div className="footerMenuSimple">
        <Link href="/">Home</Link>
        <Link href="/">Services</Link>
        <Link href="/">Projects</Link>
        <Link href="/">Company</Link>
        <Link href="/">Contact</Link>
      </div>

      <div className="footerLegalSimple">
        <a href="/legal/privacidad">Privacy</a>
        <a href="/legal/terminos-condiciones">Terms</a>
        <a href="/legal/cookies">Cookies</a>
      </div>

    </footer>
  );
}