import { useState } from 'react';
import {
  ArrowRight,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Play,
  Sparkles,
  Utensils,
  Wine,
  X,
} from 'lucide-react';

const interiorImage =
  'https://images.pexels.com/photos/2923034/pexels-photo-2923034.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const diningImage =
  'https://images.pexels.com/photos/39490291/pexels-photo-39490291.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const steakImage =
  'https://images.pexels.com/photos/8112966/pexels-photo-8112966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const cocktailImage =
  'https://images.pexels.com/photos/17541202/pexels-photo-17541202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

type ReservationModalProps = {
  onClose: () => void;
};

type MenuItem = {
  name: string;
  desc: string;
  price: string;
};

type MenuCategory = {
  id: string;
  label: string;
  icon: typeof Utensils;
  items: MenuItem[];
};

const menuCategories: MenuCategory[] = [
  {
    id: 'mezeler',
    label: 'Mezeler',
    icon: Utensils,
    items: [
      { name: 'Humus', desc: 'Nohut, tahin, limon, zeytinyağı', price: '₺95' },
      { name: 'Haydari', desc: 'Süzme yoğurt, taze nane, sarımsak', price: '₺85' },
      { name: 'Acılı Ezme', desc: 'Domates, biber, soğan, nar ekşisi', price: '₺90' },
      { name: 'Patlıcan Söğürme', desc: 'Közlenmiş patlıcan, biber, sarımsak', price: '₺110' },
      { name: 'Fava', desc: 'İçli bakla, limon, dereotu', price: '₺105' },
      { name: 'Şakşuka', desc: 'Köz patlıcan, biber, domates, sarımsaklı yoğurt', price: '₺115' },
      { name: 'Arnavut Ciğeri', desc: 'Kızarmış ciğer, soğan, sumak', price: '₺165' },
      { name: 'Kalamar Tava', desc: 'Kızarmış kalamar, tarator sos', price: '₺245' },
      { name: 'Paça Çorbası', desc: 'Geleneksel kemik suyu çorba, sarımsak', price: '₺85' },
      { name: 'İçli Köfte', desc: 'Bulgur kabuklu, cevizli kıyma iç harç', price: '₺125' },
    ],
  },
  {
    id: 'sicaklar',
    label: 'Sıcaklar',
    icon: Utensils,
    items: [
      { name: 'Beyti Kebap', desc: 'Lavaş arası döner, domates sos, yoğurt', price: '₺320' },
      { name: 'Adana Kebap', desc: 'Acılı kıyma kebabı, közlenmiş biber, soğan', price: '₺295' },
      { name: 'Urfa Kebap', desc: 'Acısız kıyma kebabı, domates, biber', price: '₺285' },
      { name: 'Kuzu Şiş', desc: 'Közlenmiş kuzu butu, pilav, köz biber', price: '₺340' },
      { name: 'Tavuk Şiş', desc: 'Marine tavuk göğsü, pilav, köz sebze', price: '₺245' },
      { name: 'Karışık Izgara', desc: 'Adana, kuzu şiş, tavuk şiş, köfte', price: '₺420' },
      { name: 'Balık Izgara', desc: 'Günün balığı, roka, limon', price: '₺385' },
      { name: 'Hünkar Beğendi', desc: 'Köz patlıcan püresi üstünde et yahnisi', price: '₺330' },
      { name: 'Mantı', desc: 'El açması, sarımsaklı yoğurt, tereyağı', price: '₺195' },
      { name: 'Kuzu Tandır', desc: 'Fırında kuzu butu, pilav, köz biber', price: '₺360' },
    ],
  },
  {
    id: 'alkoller',
    label: 'Alkoller',
    icon: Wine,
    items: [
      { name: 'Rakı', desc: 'Yeni rakı — 35 cl', price: '₺420' },
      { name: 'Rakı', desc: 'Yeni rakı — 70 cl (şişe)', price: '₺780' },
      { name: 'Tek Rakı', desc: 'Tek kadeh — 5 cl', price: '₺85' },
      { name: 'Votka', desc: 'İstanblue — tek kadeh', price: '₺95' },
      { name: 'Viski', desc: 'Johnnie Walker — tek kadeh', price: '₺165' },
      { name: 'Gin', desc: 'Bombay Sapphire — tek kadeh', price: '₺145' },
      { name: 'Beyaz Şarap', desc: 'Kavaklıdere — bardak', price: '₺120' },
      { name: 'Kırmızı Şarap', desc: 'Kavaklıdere — bardak', price: '₺120' },
      { name: 'Bira', desc: 'Efes Pilsen — 33 cl', price: '₺95' },
      { name: 'Bira', desc: 'Efes Pilsen — 50 cl', price: '₺135' },
    ],
  },
  {
    id: 'kokteyller',
    label: 'Kokteyller',
    icon: Wine,
    items: [
      { name: 'Nehir Kenarı', desc: 'Gin, narenciye, nane, soda', price: '₺185' },
      { name: 'Bakır Kadeh', desc: 'Viski, bal, limon, tarçın', price: '₺195' },
      { name: 'Mavi Gece', desc: 'Votka, likör, lime, sprite', price: '₺175' },
      { name: 'Narlı Fizz', desc: 'Gin, nar suyu, limon, maden suyu', price: '₺190' },
      { name: 'İstanbul Mule', desc: 'Votka, zencefil, limon, maden suyu', price: '₺180' },
      { name: 'Sigara Böreği', desc: 'Tekila, portakal likörü, lime (shot)', price: '₺145' },
      { name: 'Açılış', desc: 'Bitter, vermut, portakal kabuğu', price: '₺165' },
      { name: 'Sıcak Kalpler', desc: 'Viski, bal, limon, karanfil', price: '₺200' },
    ],
  },
  {
    id: 'icecekler',
    label: 'İçecekler',
    icon: Utensils,
    items: [
      { name: 'Limonata', desc: 'Taze sıkma, nane', price: '₺65' },
      { name: 'Ayran', desc: 'Geleneksel köpüklü', price: '₺45' },
      { name: 'Şalgam', desc: 'Acılı veya acısız', price: '₺55' },
      { name: 'Maden Suyu', desc: 'Sade — 20 cl', price: '₺40' },
      { name: 'Kola', desc: '33 cl', price: '₺55' },
      { name: 'Türk Çayı', desc: 'Geleneksel demleme', price: '₺35' },
      { name: 'Türk Kahvesi', desc: 'Geleneksel cezve', price: '₺65' },
      { name: 'Filtre Kahve', desc: 'Sıcak veya soğuk', price: '₺75' },
      { name: 'Taze Portakal Suyu', desc: 'Günün taze sıkımı', price: '₺85' },
      { name: 'Sahlep', desc: 'Geleneksel, tarçın', price: '₺70' },
    ],
  },
];

function ReservationModal({ onClose }: ReservationModalProps) {
  const [sent, setSent] = useState(false);

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="reservation-modal" role="dialog" aria-modal="true" aria-labelledby="reservation-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="Pencereyi kapat" onClick={onClose}>
          <X size={20} />
        </button>
        {sent ? (
          <div className="success-state">
            <span className="success-mark"><Sparkles size={22} /></span>
            <p className="eyebrow">Talebiniz alındı</p>
            <h2>Masada görüşmek üzere.</h2>
            <p>Ekibimiz en kısa sürede sizi arayarak rezervasyonunuzu kesinleştirecek.</p>
            <button className="button button-dark" onClick={onClose}>Kapat</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Masanız hazır</p>
            <h2 id="reservation-title">Rezervasyon yapın.</h2>
            <p className="modal-intro">Akşamınızı şimdi planlayın, gerisini bize bırakın.</p>
            <form className="reservation-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <label>Ad soyad<input required type="text" placeholder="Adınız soyadınız" /></label>
              <div className="form-row">
                <label>Tarih<input required type="date" /></label>
                <label>Kişi sayısı<select defaultValue="2"><option value="2">2 kişi</option><option value="3">3 kişi</option><option value="4">4 kişi</option><option value="5">5+ kişi</option></select></label>
              </div>
              <label>Telefon numarası<input required type="tel" placeholder="05XX XXX XX XX" /></label>
              <button className="button button-red" type="submit">Rezervasyonu gönder <ArrowRight size={17} /></button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  const closeMenu = () => setMenuOpen(false);
  const currentCategory = menuCategories.find((c) => c.id === activeCategory) ?? menuCategories[0];

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#ana-sayfa" onClick={closeMenu} aria-label="Cevriye 34 ana sayfa">
          <span className="brand-mark">C<span>34</span></span>
          <span className="brand-name">CEVRİYE <small>34</small></span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#ana-sayfa" onClick={closeMenu}>Ana sayfa</a>
          <a href="#hikayemiz" onClick={closeMenu}>Hakkımızda</a>
          <a href="#menu" onClick={closeMenu}>Menü</a>
          <a href="#iletisim" onClick={closeMenu}>İletişim</a>
        </nav>
        <button className="header-reserve" onClick={() => setReservationOpen(true)}>Rezervasyon <ArrowRight size={16} /></button>
        <button className="mobile-menu-button" aria-label="Menüyü aç" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </header>

      <main>
        <section className="hero" id="ana-sayfa">
          <div className="hero-image" style={{ backgroundImage: `url(${interiorImage})` }} />
          <div className="hero-overlay" />
          <div className="hero-content page-width">
            <div className="hero-copy">
              <p className="eyebrow light"><span /> Maltepe'de, gece boyunca</p>
              <h1>Karanlık çökünce<br /><em>Cevriye</em> başlar.</h1>
              <p className="hero-description">İyi meze, iyi rakı ve uzun sofralar için tasarlanmış yeni nesil meyhane.</p>
              <div className="hero-actions">
                <button className="button button-red" onClick={() => setReservationOpen(true)}>Masanı ayırt <ArrowRight size={17} /></button>
                <a className="story-link" href="#menu"><span className="play-icon"><Play size={13} fill="currentColor" /></span> Menüyü incele</a>
              </div>
            </div>
            <div className="hero-aside">
              <span>İstanbul / TR</span>
              <span className="hero-line" />
              <span>İdealtepe</span>
            </div>
          </div>
          <a className="scroll-cue" href="#hikayemiz"><span /> Aşağı kaydır</a>
        </section>

        <section className="intro section-padding page-width" id="hikayemiz">
          <div className="section-kicker"><span>01</span><span className="kicker-line" /><span>Hikayemiz</span></div>
          <div className="intro-grid">
            <div>
              <h2>Bir mekândan<br /><em>daha fazlası.</em></h2>
            </div>
            <div className="intro-copy">
              <p className="large-copy">Cevriye 34, şehrin hızından uzaklaşmak ve anın tadını çıkarmak için var.</p>
              <p>Maltepe İdealtepe'de, denizin manzarasına karşı; geleneksel meyhane kültürünü yeni nesil bir anlayışla buluşturuyoruz. Mezesi, rakısı, müziği ve sohbetiyle; size kendinizi iyi hissettirmek için buradayız.</p>
              <a className="text-link" href="#menu">Menüyü keşfet <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="intro-photo-wrap">
            <img src={diningImage} alt="Cevriye 34'te zarif bir masa sunumu" />
            <div className="photo-note"><span>34</span><p>Her akşam<br />özel bir hikâye.</p></div>
          </div>
        </section>

        <section className="experience section-padding" id="lezzetler">
          <div className="page-width">
            <div className="section-kicker light"><span>02</span><span className="kicker-line" /><span>Deneyim</span></div>
            <div className="experience-heading"><h2>Lezzet, <em>özenle.</em></h2><p>Günün her saatine eşlik eden, kendine özgü bir deneyim.</p></div>
            <div className="experience-grid">
              <article className="experience-card featured-card"><img src={steakImage} alt="Özenle hazırlanmış imza tabak" /><div className="card-shade" /><div className="card-copy"><span>01 / Mutfak</span><h3>İmza tabaklar</h3><p>Ateşin ve malzemenin kusursuz uyumu.</p><a href="#menu" aria-label="İmza tabaklar menüsünü gör"><ArrowRight size={20} /></a></div></article>
              <article className="experience-card"><img src={cocktailImage} alt="Cevriye 34 barında kırmızı kokteyl" /><div className="card-shade" /><div className="card-copy"><span>02 / Bar</span><h3>Gece ritüeli</h3><p>Usta dokunuşlarla hazırlanan içkiler ve kokteyller.</p><a href="#menu" aria-label="Bar menüsünü gör"><ArrowRight size={20} /></a></div></article>
              <article className="service-highlight"><span className="highlight-icon"><Clock3 size={19} /></span><p className="eyebrow">Her gün açık</p><h3>Akşam 18:00'dan<br />gece yarısına.</h3><a className="text-link light-link" href="#iletisim">Çalışma saatleri <ArrowRight size={16} /></a></article>
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="page-width">
            <div className="section-kicker light"><span>03</span><span className="kicker-line" /><span>Menü</span></div>
            <div className="menu-heading">
              <h2>Sofra <em>kurulu.</em></h2>
              <p>Mezelerden sıcaklara, rakıdan kokteyllere kadar; yeni nesil meyhane sofrasının tüm lezzetleri.</p>
            </div>
            <div className="menu-tabs">
              {menuCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    className={activeCategory === cat.id ? 'menu-tab is-active' : 'menu-tab'}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <Icon size={16} /> {cat.label}
                  </button>
                );
              })}
            </div>
            <div className="menu-list">
              {currentCategory.items.map((item, index) => (
                <div key={`${currentCategory.id}-${index}`} className="menu-item">
                  <div className="menu-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <span className="menu-dots" />
                  <span className="menu-price">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="menu-note">Fiyatlar tahmini olup sezon değişiklik gösterebilir.</p>
          </div>
        </section>

        <section className="quote-section page-width">
          <div className="quote-mark">"</div>
          <blockquote>Güzel bir gece, güzel bir<br /><em>hatıraya dönüşür.</em></blockquote>
          <div className="quote-detail"><span className="quote-line" /> Cevriye 34'ün felsefesi</div>
        </section>

        <section className="contact section-padding" id="iletisim">
          <div className="page-width contact-grid">
            <div>
              <div className="section-kicker"><span>04</span><span className="kicker-line" /><span>İletişim</span></div>
              <h2>Görüşmek<br /><em>üzere.</em></h2>
              <p className="contact-intro">Sizi ağırlamak için sabırsızlanıyoruz. Rezervasyon ve sorularınız için bize ulaşın.</p>
              <button className="button button-red" onClick={() => setReservationOpen(true)}>Masanı ayırt <ArrowRight size={17} /></button>
            </div>
            <div className="contact-details">
              <div className="detail-item"><MapPin size={20} /><div><span>Adres</span><p>İdealtepe Mah. Sahil Cad. No:34<br />Maltepe / İstanbul</p></div></div>
              <div className="detail-item"><Phone size={20} /><div><span>Telefon</span><p>+90 216 555 34 34</p></div></div>
              <div className="detail-item"><Mail size={20} /><div><span>E-posta</span><p>hello@cevriye34.com</p></div></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <a className="brand footer-brand" href="#ana-sayfa"><span className="brand-mark">C<span>34</span></span><span className="brand-name">CEVRİYE <small>34</small></span></a>
          <p>İyi meze. İyi rakı. İyi geceler.</p>
          <div className="footer-social">
            <a href="#iletisim" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="mailto:hello@cevriye34.com" aria-label="E-posta"><Mail size={18} /></a>
            <span>© 2024 Cevriye 34</span>
          </div>
        </div>
      </footer>
      {reservationOpen && <ReservationModal onClose={() => setReservationOpen(false)} />}
    </div>
  );
}

export default App;
