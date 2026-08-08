# YerelBul V2

Çalışan React + Vite MVP. Veriler demo olarak LocalStorage'da tutulur; bu sayede backend olmadan hemen denenebilir.

## Kurulum
1. Node.js 20+ kurun.
2. Bu klasörde `npm install`
3. `npm run dev`
4. Tarayıcıda terminalde verilen adresi açın.

## V2 özellikleri
- Modern responsive ana sayfa
- Arama ve kategori filtreleme
- İşletme ekleme
- LocalStorage kalıcı demo verisi
- WhatsApp / Google Maps bağlantıları
- Öne çıkan işletme mantığı
- Basit admin görünümü
- İstatistik alanları
- Supabase için örnek SQL şeması
- Ortam değişkeni şablonu

## Gerçek üretim sürümüne geçiş
Supabase Auth + Database + Storage bağlanmalı; admin rolü server-side doğrulanmalı; ödeme sağlayıcısı server-side webhook ile doğrulanmalı. `owner_id` ve RLS politikaları kullanılmalı. Gerçek ödeme anahtarları asla frontend'e konulmamalıdır.

## Paketler
`npm install`
`npm run dev`
`npm run build`
