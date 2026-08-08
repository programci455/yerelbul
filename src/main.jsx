import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const initial = [
  {
    id: 1,
    name: "Değirmen Kafe",
    cat: "Kafe",
    icon: "☕",
    city: "Soma",
    desc: "Kahve, tatlı, kahvaltı ve keyifli kafe.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 2,
    name: "Ocakbaşı Restoran",
    cat: "Restoran",
    icon: "🍽️",
    city: "Soma",
    desc: "Soma'da ızgara ve restoran hizmeti.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 3,
    name: "POLAT RESTORAN",
    cat: "Restoran",
    icon: "🍽️",
    city: "Soma",
    desc: "Soma'da yerel restoran.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 4,
    name: "Davette Restaurant",
    cat: "Restoran",
    icon: "🍴",
    city: "Soma",
    desc: "Soma'da yemek ve restoran hizmeti.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 5,
    name: "Elisa Oto Yıkama",
    cat: "Oto Yıkama",
    icon: "🚗",
    city: "Soma",
    desc: "Soma'da araç yıkama ve temizlik hizmeti.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 6,
    name: "Titiz Oto Yıkama",
    cat: "Oto Yıkama",
    icon: "🚗",
    city: "Soma",
    desc: "Araç iç ve dış temizlik hizmetleri.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 7,
    name: "Akpak Oto Yıkama",
    cat: "Oto Yıkama",
    icon: "🚘",
    city: "Soma",
    desc: "Soma'da oto yıkama hizmeti.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 8,
    name: "Otorapor Manisa Soma Oto Ekspertiz",
    cat: "Oto Ekspertiz",
    icon: "🔧",
    city: "Soma",
    desc: "Soma'da oto ekspertiz hizmeti.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 9,
    name: "Yamanlar Oto Ekspertiz Soma",
    cat: "Oto Ekspertiz",
    icon: "🔧",
    city: "Soma",
    desc: "Araç ekspertiz ve kontrol hizmetleri.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 10,
    name: "Soma Bay & Bayan Giyim",
    cat: "Giyim",
    icon: "👕",
    city: "Soma",
    desc: "Kadın ve erkek giyim mağazası.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 11,
    name: "Soma Özceritler Giyim",
    cat: "Giyim",
    icon: "👗",
    city: "Soma",
    desc: "Giyim ve abiye ürünleri.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 12,
    name: "Model Giyim",
    cat: "Giyim",
    icon: "🛍️",
    city: "Soma",
    desc: "Soma'da giyim mağazası.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 13,
    name: "Gold İnternet Kafe",
    cat: "İnternet Kafe",
    icon: "🖥️",
    city: "Soma",
    desc: "Soma'da internet ve bilgisayar hizmetleri.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 14,
    name: "Özen Alabalık Restoran",
    cat: "Restoran",
    icon: "🐟",
    city: "Soma",
    desc: "Soma Darkale'de alabalık restoranı.",
    phone: "",
    featured: false,
    views: 0
  },
  {
    id: 15,
    name: "Değirmen Darkale Restoran",
    cat: "Restoran",
    icon: "🏡",
    city: "Soma",
    desc: "Darkale'de restoran hizmeti.",
    phone: "",
    featured: false,
    views: 0
  }
];

const categories = [
  "Restoran",
  "Kafe",
  "Berber",
  "Oto Yıkama",
  "Oto Ekspertiz",
  "Giyim",
  "İnternet Kafe",
  "Güzellik"
];

const storageKey = "yerelbul-soma-businesses";

function App() {
  const [businesses, setBusinesses] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : initial;
  });

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [modal, setModal] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(businesses));
  }, [businesses]);

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const text = `${b.name} ${b.cat} ${b.city} ${b.desc}`.toLowerCase();

      return (
        (!q || text.includes(q.toLowerCase())) &&
        (!cat || b.cat === cat)
      );
    });
  }, [businesses, q, cat]);

  function addBusiness(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const category = form.get("cat");

    const icons = {
      Restoran: "🍽️",
      Kafe: "☕",
      Berber: "💈",
      "Oto Yıkama": "🚗",
      "Oto Ekspertiz": "🔧",
      Giyim: "👕",
      "İnternet Kafe": "🖥️",
      Güzellik: "✨"
    };

    const business = {
      id: Date.now(),
      name: form.get("name"),
      cat: category,
      city: form.get("city") || "Soma",
      desc: form.get("desc") || "Soma yerel işletmesi.",
      phone: form.get("phone") || "",
      icon: icons[category] || "📍",
      featured: false,
      views: 0
    };

    setBusinesses((prev) => [business, ...prev]);
    setModal(false);
    e.currentTarget.reset();
  }

  function toggleFeatured(id) {
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, featured: !b.featured }
          : b
      )
    );
  }

  function increaseView(id) {
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, views: b.views + 1 }
          : b
      )
    );
  }

  return (
    <>
      <header>
        <div className="logo">
          Yerel<span>Bul</span>
        </div>

        <nav>
          <a href="#kesfet">Keşfet</a>
          <a href="#kampanya">Kampanyalar</a>

          <button onClick={() => setModal(true)}>
            İşletmeni Ekle
          </button>

          <button
            className="adminBtn"
            onClick={() => setAdmin(!admin)}
          >
            Admin
          </button>
        </nav>
      </header>

      <section className="hero">
        <div>
          <b className="pill">
            📍 Soma • Manisa
          </b>

          <h1>
            Soma'daki yerel işletmeleri
            <br />
            <em>tek yerde keşfet.</em>
          </h1>

          <p>
            Soma'daki restoran, kafe, mağaza ve hizmet
            işletmelerini kolayca bul.
          </p>

          <div className="search">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="İşletme veya kategori ara..."
            />

            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option value="">
                Tüm kategoriler
              </option>

              {categories.map((category) => (
                <option key={category}>
                  {category}
                </option>
              ))}
            </select>

            <button>
              ARA
            </button>
          </div>
        </div>
      </section>

      <main id="kesfet">
        <div className="head">
          <div>
            <small>
              SOMA • YEREL İŞLETMELER
            </small>

            <h2>
              Soma işletmeleri
            </h2>
          </div>

          <span>
            {filtered.length} sonuç
          </span>
        </div>

        <div className="grid">
          {filtered.map((business) => (
            <article
              className="card"
              key={business.id}
            >
              <div className="cover">
                {business.icon}

                {business.featured && (
                  <label>
                    ⭐ ÖNE ÇIKAN
                  </label>
                )}
              </div>

              <div className="body">
                <small>
                  {business.cat} · {business.city}
                </small>

                <h3>
                  {business.name}
                </h3>

                <p>
                  {business.desc}
                </p>

                <div className="stats">
                  👁️{" "}
                  {business.views.toLocaleString("tr-TR")}
                  {" "}görüntülenme
                </div>

                <div className="actions">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      increaseView(business.id)
                    }
                    href={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      encodeURIComponent(
                        `${business.name} Soma Manisa`
                      )
                    }
                  >
                    📍 Harita
                  </a>

                  {business.phone && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={
                        "https://wa.me/" +
                        business.phone.replace(/\D/g, "")
                      }
                    >
                      💬 WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <section
        id="kampanya"
        className="cta"
      >
        <div>
          <small>
            SOMA İŞLETME SAHİPLERİ
          </small>

          <h2>
            Daha fazla müşteriye ulaş.
          </h2>

          <p>
            İşletmeni YerelBul'a ücretsiz ekle.
            Daha sonra işletmeni öne çıkararak
            daha fazla kişiye ulaş.
          </p>
        </div>

        <button onClick={() => setModal(true)}>
          Ücretsiz Başla →
        </button>
      </section>

      {admin && (
        <section className="admin">
          <div className="head">
            <div>
              <small>
                YÖNETİM
              </small>

              <h2>
                Admin Paneli
              </h2>
            </div>

            <span>
              {businesses.length} işletme
            </span>
          </div>

          <div className="adminTable">
            {businesses.map((business) => (
              <div
                className="row"
                key={business.id}
              >
                <b>
                  {business.icon} {business.name}
                </b>

                <span>
                  {business.cat}
                </span>

                <span>
                  {business.views} görüntülenme
                </span>

                <button
                  onClick={() =>
                    toggleFeatured(business.id)
                  }
                >
                  {business.featured
                    ? "Öne çıkarmayı kaldır"
                    : "Öne çıkar"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer>
        © 2026 YerelBul ·
        Soma yerel işletmeleri için dijital platform
      </footer>

      {modal && (
        <div className="overlay">
          <div className="modal">
            <button
              className="x"
              onClick={() => setModal(false)}
            >
              ×
            </button>

            <h2>
              İşletmeni Ekle
            </h2>

            <form onSubmit={addBusiness}>
              <input
                name="name"
                required
                placeholder="İşletme adı"
              />

              <select
                name="cat"
                required
              >
                <option value="">
                  Kategori seç
                </option>

                {categories.map((category) => (
                  <option key={category}>
                    {category}
                  </option>
                ))}
              </select>

              <input
                name="city"
                defaultValue="Soma"
                placeholder="Şehir / ilçe"
              />

              <input
                name="phone"
                placeholder="Telefon / WhatsApp"
              />

              <textarea
                name="desc"
                placeholder="İşletme açıklaması"
              />

              <button className="primary">
                İşletmeyi Kaydet
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <App />
);
