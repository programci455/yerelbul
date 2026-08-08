import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const initial=[
{id:1,name:"Pilavcı Raşit Usta",cat:"Restoran",icon:"🍗",city:"Turgutlu",desc:"Tavuk döner, pilav ve uygun fiyatlı menüler.",phone:"",featured:true,views:1280},
{id:2,name:"Kahve Durağı",cat:"Kafe",icon:"☕",city:"Turgutlu",desc:"Kahve, tatlı ve keyifli çalışma alanı.",phone:"",featured:true,views:940},
{id:3,name:"Premium Barber",cat:"Berber",icon:"💈",city:"Turgutlu",desc:"Erkek saç, sakal ve bakım hizmetleri.",phone:"",featured:false,views:620},
{id:4,name:"Hızlı Oto Yıkama",cat:"Oto Yıkama",icon:"🚗",city:"Turgutlu",desc:"İç-dış yıkama ve detaylı temizlik.",phone:"",featured:false,views:480}
];
function App(){
 const [businesses,setBusinesses]=useState(()=>JSON.parse(localStorage.getItem("yb2-businesses")||"null")||initial);
 const [q,setQ]=useState(""); const [cat,setCat]=useState(""); const [modal,setModal]=useState(false); const [admin,setAdmin]=useState(false);
 useEffect(()=>localStorage.setItem("yb2-businesses",JSON.stringify(businesses)),[businesses]);
 const filtered=useMemo(()=>businesses.filter(b=>(!q||(b.name+" "+b.cat+" "+b.city+" "+b.desc).toLowerCase().includes(q.toLowerCase()))&&(!cat||b.cat===cat)),[businesses,q,cat]);
 function add(e){e.preventDefault();const f=new FormData(e.currentTarget);const b={id:Date.now(),name:f.get("name"),cat:f.get("cat"),city:f.get("city")||"Turgutlu",desc:f.get("desc")||"Yerel işletme.",phone:f.get("phone")||"",icon:{"Restoran":"🍽️","Kafe":"☕","Berber":"💈","Oto Yıkama":"🚗","Güzellik":"✨"}[f.get("cat")],featured:false,views:0};setBusinesses(x=>[b,...x]);setModal(false);e.currentTarget.reset()}
 function toggle(id){setBusinesses(x=>x.map(b=>b.id===id?{...b,featured:!b.featured}:b))}
 return <><header><div className="logo">Yerel<span>Bul</span></div><nav><a href="#kesfet">Keşfet</a><a href="#kampanya">Kampanyalar</a><button onClick={()=>setModal(true)}>İşletmeni Ekle</button><button className="adminBtn" onClick={()=>setAdmin(!admin)}>Admin</button></nav></header>
 <section className="hero"><div><b className="pill">📍 Turgutlu • Manisa</b><h1>Yerel işletmeleri<br/><em>tek yerde keşfet.</em></h1><p>İşletmeni bul, kampanyaları keşfet, doğrudan iletişime geç.</p><div className="search"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="İşletme veya kategori ara..."/><select value={cat} onChange={e=>setCat(e.target.value)}><option value="">Tüm kategoriler</option><option>Restoran</option><option>Kafe</option><option>Berber</option><option>Oto Yıkama</option><option>Güzellik</option></select><button>ARA</button></div></div></section>
 <main id="kesfet"><div className="head"><div><small>ÖNE ÇIKANLAR</small><h2>Popüler işletmeler</h2></div><span>{filtered.length} sonuç</span></div><div className="grid">{filtered.map(b=><article className="card" key={b.id}><div className="cover">{b.icon}{b.featured&&<label>⭐ ÖNE ÇIKAN</label>}</div><div className="body"><small>{b.cat} · {b.city}</small><h3>{b.name}</h3><p>{b.desc}</p><div className="stats">👁️ {b.views.toLocaleString("tr-TR")} görüntülenme</div><div className="actions"><a target="_blank" href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(b.name+" "+b.city)}>📍 Harita</a><a target="_blank" href={b.phone?"https://wa.me/"+b.phone.replace(/\D/g,""):"#"}>💬 WhatsApp</a></div></div></article>)}</div></main>
 <section id="kampanya" className="cta"><div><small>İŞLETME SAHİPLERİ</small><h2>Daha fazla müşteriye ulaş.</h2><p>İşletmeni ücretsiz ekle. Sonrasında öne çıkarak daha fazla kişiye ulaş.</p></div><button onClick={()=>setModal(true)}>Ücretsiz Başla →</button></section>
 {admin&&<section className="admin"><div className="head"><div><small>YÖNETİM</small><h2>Admin Paneli</h2></div><span>{businesses.length} işletme</span></div><div className="adminTable">{businesses.map(b=><div className="row" key={b.id}><b>{b.icon} {b.name}</b><span>{b.cat}</span><span>{b.views} görüntülenme</span><button onClick={()=>toggle(b.id)}>{b.featured?"Öne çıkarmayı kaldır":"Öne çıkar"}</button></div>)}</div></section>}
 <footer>© 2026 YerelBul · Yerel işletmeler için dijital platform</footer>
 {modal&&<div className="overlay"><div className="modal"><button className="x" onClick={()=>setModal(false)}>×</button><h2>İşletmeni Ekle</h2><form onSubmit={add}><input name="name" required placeholder="İşletme adı"/><select name="cat" required><option value="">Kategori</option><option>Restoran</option><option>Kafe</option><option>Berber</option><option>Oto Yıkama</option><option>Güzellik</option></select><input name="city" placeholder="Şehir / ilçe" defaultValue="Turgutlu"/><input name="phone" placeholder="WhatsApp telefon numarası"/><textarea name="desc" placeholder="İşletme açıklaması"></textarea><button className="primary">İşletmeyi Kaydet</button></form></div></div>}</>
}
createRoot(document.getElementById("root")).render(<App/>);