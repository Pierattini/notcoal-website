"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CookiesPolicyPage() {
  const { t } = useLanguage();

  return (
    <main className="legalPage">
      <section className="legalHero">
        <div className="legalContainer">
          <span className="sectionBadge">{t.legalPages.cookies.badge}</span>
          <h1>{t.legalPages.cookies.title}</h1>
          <p>
            {t.legalPages.cookies.description}
          </p>
        </div>
      </section>

      <section className="legalSection">
        <div className="legalContainer legalDocument">
          <p>
            This Cookie Policy was last updated on June 10, 2026. It explains how TheNotCoalCompany OÜ uses cookies and similar technologies on this website.
          </p>

          <h2>1. Introduction</h2>
          <p>
            Our website uses cookies and other related technologies. For convenience, all such technologies are referred to as “cookies” in this document. Cookies may be placed by TheNotCoalCompany OÜ or by carefully selected third parties that support hosting, security, analytics or website functionality.
          </p>

          <h2>2. What are cookies?</h2>
          <p>
            A cookie is a small file that is sent along with pages of this website and stored by your browser on your computer, mobile phone or another device. The information stored in a cookie may be returned to our systems or to the systems of relevant third parties during a subsequent visit.
          </p>

          <h2>3. What are scripts?</h2>
          <p>
            A script is a piece of program code used to make the website function properly and interactively. This code may run on our server or on your device, for example to submit a contact form, remember preferences or improve page performance.
          </p>

          <h2>4. What is a web beacon?</h2>
          <p>
            A web beacon, also known as a pixel tag, is a small invisible text or image element that can be used to monitor website traffic or interaction. If used, web beacons may help measure page visits, campaign performance or similar technical events, subject to the cookie preferences selected by the user.
          </p>

          <h2>5. Cookies</h2>

          <h3>5.1 Technical or functional cookies</h3>
          <p>
            Some cookies ensure that parts of the website work properly and that user preferences remain known. Functional cookies may support Next.js, Vercel hosting, contact forms, cookie consent storage and language preferences. We may place these cookies without prior consent because they are necessary for the website to operate correctly.
          </p>

          <h3>5.2 Analytics cookies</h3>
          <p>
            Analytics cookies may help us understand how visitors use the website, which pages are visited and how the site performs. If Google Analytics or a similar analytics service is implemented, it will only be activated after the user gives analytics consent.
          </p>

          <h3>5.3 Marketing or tracking cookies</h3>
          <p>
            Marketing or tracking cookies are cookies or similar local storage technologies that may be used to measure campaigns, understand referral sources or support relevant business communications. These cookies are optional and are only used if the user consents to marketing cookies.
          </p>

          <h2>6. Placed cookies</h2>
          <p>
            The website is prepared to use the following cookie categories and services:
          </p>
          <ul>
            <li><strong>Next.js:</strong> functional website rendering and navigation.</li>
            <li><strong>Vercel:</strong> hosting, performance, security and delivery infrastructure.</li>
            <li><strong>Cookie consent storage:</strong> functional storage of the user’s cookie decision.</li>
            <li><strong>Language preferences:</strong> functional storage of language or interface preferences where implemented.</li>
            <li><strong>Contact forms:</strong> functional data processing required to submit enquiries and meeting requests.</li>
            <li><strong>Google Analytics:</strong> analytics cookies only if implemented and accepted by the user.</li>
            <li><strong>Marketing tools:</strong> marketing cookies only if implemented and accepted by the user.</li>
          </ul>

          <h2>7. Consent</h2>
          <p>
            When you visit our website for the first time, we show a consent modal with an explanation about cookies. You can accept all cookies, decline optional cookies or select your preferences. Optional analytics and marketing cookies are not enabled unless you choose them.
          </p>
          <p>
            If you close the consent modal using the X button, optional cookies remain disabled and the decision is stored so the modal does not keep appearing on every visit.
          </p>

          <h3>7.1 Manage your consent settings</h3>
          <ul>
            <li><strong>Functional Cookies:</strong> always active because they are necessary.</li>
            <li><strong>Analytics Cookies:</strong> optional.</li>
            <li><strong>Marketing Cookies:</strong> optional.</li>
          </ul>

          <h2>8. Enabling, disabling and deleting cookies</h2>
          <p>
            You can use your browser to automatically or manually delete cookies. You can also configure your browser so that certain cookies may not be placed, or so that you receive a message each time a cookie is placed. Please refer to your browser’s help section for detailed instructions.
          </p>
          <p>
            Please note that the website may not work properly if all cookies are disabled. If you delete cookies or local storage in your browser, the consent modal may appear again on your next visit.
          </p>

          <h2>9. Your rights with respect to personal data</h2>
          <p>
            Where cookies or similar technologies involve personal data, you may have the following rights under the GDPR:
          </p>
          <ul>
            <li>The right to know why your personal data is needed, what will happen to it and how long it will be retained.</li>
            <li>The right of access to personal data known to us.</li>
            <li>The right to rectification, completion, deletion or blocking of your personal data where applicable.</li>
            <li>The right to withdraw consent where processing is based on consent.</li>
            <li>The right to data portability.</li>
            <li>The right to object to processing, unless there are justified grounds for continuing the processing.</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the contact details below. If you have a complaint about how we handle personal data, you may also contact the relevant supervisory authority.
          </p>

          <h2>10. Contact details</h2>
          <p>
            For questions or comments about this Cookie Policy, please contact us using the following details:
          </p>

          <div className="legalInfoCard">
            <p><strong>Company name:</strong> TheNotCoalCompany OÜ</p>
            <p><strong>Registry code:</strong> 17503248</p>
            <p><strong>VAT number:</strong> EE 102984561</p>
            <p><strong>Registered address:</strong> Tööstuse 75-71, Tallinn, Estonia, 10416</p>
            <p><strong>Phone:</strong> <a href="tel:+34611354698">+34 611 354 698</a></p>
            <p><strong>Email:</strong> <a href="mailto:hi@notcoal.eu">hi@notcoal.eu</a></p>
          </div>

          <p>
            For more information about the processing of personal data, please read our{" "}
            <Link href="/privacy-policy">{t.legalLinks.privacyPolicy}</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
