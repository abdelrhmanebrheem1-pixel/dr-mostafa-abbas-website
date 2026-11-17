"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeft, Brain, CalendarDays, Clock3, MapPin, Phone,
  ShieldCheck, HeartHandshake, Stethoscope, Award, Menu
} from "lucide-react";

const clinics = [
  {
    name: "عيادة كفر الشيخ",
    address: "كفر الشيخ - المحاربين الجديدة - برج فينيسيا - أعلى البنك القطري - بجوار مطعم ختعم",
    phones: ["01019986068"],
    hours: [
      "الأحد: 9 صباحًا – 1 ظهرًا، و3 عصرًا – 6 مساءً",
      "الثلاثاء: 9 صباحًا – 1 ظهرًا",
      "الأربعاء: 4 عصرًا – 8 مساءً",
      "الخميس: 9 صباحًا – 1 ظهرًا"
    ],
    map: "برج فينيسيا المحاربين الجديدة كفر الشيخ"
  },
  {
    name: "عيادة رشيد",
    address: "رشيد - شارع البحر - بجوار مسجد آل حمد - عيادات دار الطب",
    phones: ["01066293232", "01012982746", "01555194008"],
    hours: ["السبت: 9 صباحًا – 1 ظهرًا"],
    map: "31.391454, 30.4226305"
  },
  {
    name: "عيادة طنطا",
    address: "مدينة طنطا - مستشفى الشروق - تقاطع شارع علي بيك الكبير مع شارع الحلو",
    phones: ["01023334719"],
    hours: ["الأربعاء: أسبوعيًا"],
    note: "ساعات العمل ستُضاف لاحقًا",
    map: "30.7963499, 31.0037908"
  },
  {
    name: "عيادة سيدي سالم",
    address: "سيدى سالم - الميدان أمام برج عبد العاطى",
    phones: [],
    whatsapp: "01004746582",
    hours: [],
    map: "31.2711364, 30.7891812"
  }
];

const qualifications = [
  "دكتوراه في مخ وأعصاب الأطفال",
  "عضو الجمعية المصرية لمخ وأعصاب الأطفال",
  "عضو الجمعية الأوروبية لمخ وأعصاب الأطفال"
];

export default function Home() {
  const [liveClinics, setLiveClinics] = useState(clinics);
  const [liveDoctorImage, setLiveDoctorImage] = useState("/images/doctor.jpeg");
  const [liveHeroLead, setLiveHeroLead] = useState("رعاية طبية متخصصة في مخ وأعصاب الأطفال والطب النفسي للأطفال، مع اهتمام بفهم احتياجات كل طفل ومساندة أسرته.");
  useEffect(() => { fetch("/api/site-content", {cache:"no-store"}).then(r => r.ok ? r.json() : null).then(d => { if(Array.isArray(d?.clinics) && d.clinics.length===4) setLiveClinics(d.clinics); if(d?.heroLead) setLiveHeroLead(d.heroLead); if(d?.doctorImage) setLiveDoctorImage(d.doctorImage); }).catch(()=>{}); }, []);
  return (
    <main>
      <div className="topline"><span>مواعيد العيادات والحجز بالحضور</span><span>رعاية تبدأ بالفهم... واهتمام يمتد للمستقبل</span></div>
      <header className="header">
        <a className="brand" href="#home" aria-label="الرئيسية"><span className="brand-mark"><Brain size={25}/></span><span><b>د. مصطفى عباس</b><small>مخ وأعصاب وطب نفسي أطفال</small></span></a>
        <nav><a href="#about">عن الدكتور</a><a href="#specialty">التخصص</a><a href="#clinics">العيادات</a><a href="#contact">تواصل معنا</a></nav>
        <a className="nav-cta" href="#clinics">مواعيد العيادات <ArrowLeft size={16}/></a>
        <a className="mobile-cta" href="#clinics"><Menu size={22}/></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow"><span className="dot"/> رعاية متخصصة للأطفال</span>
          <h1>صحة طفلك النفسية والعصبية <em>تستحق اهتمامًا متخصصًا</em></h1>
          <p className="hero-lead">{liveHeroLead}</p>
          <div className="hero-actions"><a className="primary-btn" href="#clinics">تعرّف على العيادات <ArrowLeft size={18}/></a><a className="text-btn" href="#about">اعرف المزيد عن الدكتور</a></div>
          <div className="hero-proof"><span><ShieldCheck size={18}/> مؤهلات علمية متخصصة</span><span><HeartHandshake size={18}/> اهتمام بالطفل والأسرة</span></div>
        </div>
        <div className="hero-art" aria-label="صورة الدكتور مصطفى عباس">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <div className="portrait-placeholder"><img className="doctor-photo" src={liveDoctorImage || "/images/doctor.jpeg"} alt="د. مصطفى عباس" /><b>د. مصطفى عباس</b><span>استشاري أول مخ وأعصاب وطب نفسي أطفال</span></div>
          <div className="floating-note"><span className="note-icon"><Stethoscope size={20}/></span><span><b>رعاية متخصصة</b><small>مخ وأعصاب وطب نفسي أطفال</small></span></div>
          <div className="hero-stamp"><HeartHandshake size={22}/><span>اهتمام<br/>ورعاية</span></div>
        </div>
      </section>

      <section className="ticker"><span>د. مصطفى عباس</span><i>✳</i><span>استشاري أول مخ وأعصاب وطب نفسي أطفال</span><i>✳</i><span>أربع عيادات لخدمتكم</span><i>✳</i><span>الحجز بالحضور</span></section>

      <section className="section about-section" id="about">
        <div className="section-heading"><span className="eyebrow">نبذة عن الدكتور</span><h2>خبرة علمية واهتمام <em>بصحة طفلك</em></h2></div>
        <div className="about-grid">
          <div className="about-copy"><p>د. مصطفى عباس، استشاري أول مخ وأعصاب وطب نفسي أطفال، متخصص في مجال مخ وأعصاب الأطفال والطب النفسي للأطفال.</p><p>حاصل على دكتوراه في مخ وأعصاب الأطفال، وعضو الجمعية المصرية لمخ وأعصاب الأطفال، وعضو الجمعية الأوروبية لمخ وأعصاب الأطفال.</p><p>يهدف هذا الموقع إلى تقديم معلومات واضحة للأسر حول تخصصات الدكتور والعيادات ومواعيد الحجز، بما يسهل الوصول إلى المعلومات والتواصل.</p><a className="inline-link" href="#clinics">استعرض مواقع العيادات <ArrowLeft size={17}/></a></div>
          <div className="credential-card"><div className="credential-icon"><Award size={27}/></div><span className="card-kicker">المؤهلات والعضويات</span><h3>المؤهلات العلمية</h3>{qualifications.map((q)=><div className="credential-row" key={q}><span className="check">✓</span><span>{q}</span></div>)}</div>
        </div>
      </section>

      <section className="specialty-section" id="specialty"><div className="section"><div className="section-heading center"><span className="eyebrow">التخصص</span><h2>اهتمام متخصص <em>بصحة الأطفال</em></h2><p>مخ وأعصاب الأطفال والطب النفسي للأطفال، مع توفير المعلومات اللازمة للأهل عن العيادات وطرق الحجز.</p></div><div className="specialty-card"><div className="specialty-icon"><Brain size={34}/></div><div><h3>مخ وأعصاب وطب نفسي أطفال</h3><p>استشاري أول مخ وأعصاب وطب نفسي أطفال</p></div><span className="specialty-number">01</span></div></div></section>

      <section className="section clinics-section" id="clinics">
        <div className="section-heading"><span className="eyebrow">أماكن ومواعيد العيادات</span><h2>اختر العيادة <em>الأقرب إليك</em></h2><p>الحجز يتم بالحضور إلى العيادة. يُرجى التأكد من المواعيد قبل التوجه.</p></div>
        <div className="clinic-grid">{liveClinics.map((clinic, index)=><article className="clinic-card" key={clinic.name}><div className="clinic-top"><span className="clinic-index">0{index+1}</span><span className="clinic-pin"><MapPin size={20}/></span></div><h3>{clinic.name}</h3><p className="clinic-address"><MapPin size={16}/>{clinic.address}</p><div className="clinic-detail-title"><Clock3 size={16}/> مواعيد العمل</div><ul className="hours">{clinic.hours.map(h=><li key={h}>{h}</li>)}</ul>{clinic.note && <p className="note">{clinic.note}</p>}<div className="clinic-detail-title phone-title"><Phone size={16}/> للحجز والاستفسار</div><div className="phone-list">{clinic.phones.map(p=><a href={`tel:${p}`} key={p} dir="ltr">{p}</a>)}</div>{clinic.whatsapp && <a className="whatsapp-link" href={`https://wa.me/2${clinic.whatsapp.slice(1)}`} target="_blank" rel="noreferrer">تواصل واتساب: {clinic.whatsapp}</a>}<a className="map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.map)}`} target="_blank" rel="noreferrer">عرض الموقع على الخريطة <ArrowLeft size={16}/></a><div className="booking-note"><CalendarDays size={15}/> الحجز بالحضور</div></article>)}</div>
      </section>

      <section className="contact-band" id="contact"><div><span className="eyebrow light">نحن هنا لمساعدتك</span><h2>للاستفسار عن العيادات ومواعيدها</h2><p>يمكنك التواصل هاتفيًا مع العيادة المناسبة أو زيارة موقعها خلال مواعيد العمل المعلنة.</p></div><a href="#clinics" className="light-btn">أرقام العيادات ومواعيدها <ArrowLeft size={17}/></a></section>
      <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Brain size={23}/></span><span><b>د. مصطفى عباس</b><small>مخ وأعصاب وطب نفسي أطفال</small></span></a><p>رعاية تبدأ بالفهم... واهتمام يمتد للمستقبل.</p><span className="copyright">© {new Date().getFullYear()} د. مصطفى عباس. جميع الحقوق محفوظة.</span></footer>
      <a className="back-top" href="#home" aria-label="العودة للأعلى">↑</a>
    </main>
  );
}