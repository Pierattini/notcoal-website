"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
export default function OverviewSection() {
  const { t } = useLanguage();

  return (
    <section className="overviewSection">

      <div className="overviewContainer">

        <div className="overviewContent">

          <span className="overviewBadge">
            {t.home.overview.badge}
          </span>

          <h2>
            {t.home.overview.title}
          </h2>

          <p>
            {t.home.overview.description}
          </p>

        </div>

        <div className="overviewImage">

          <Image
  src="/banner.jpg"
  alt="The Not Coal Company"
  fill
  className="overviewImg"
/>

        </div>

      </div>

    </section>
  );
}