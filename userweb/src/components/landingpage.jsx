// LandingPage.jsx
import React from "react";
import {
  Menu,
  X,
  Wallet,
  Truck,
  BadgeDollarSign,
  Smartphone,
  CalendarClock,
  Recycle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function LandingPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full min-h-screen bg-[#F8FAF7] text-gray-900 overflow-hidden">
      {/* ================= NAVBAR ================= */}
      <header className="w-full border-b border-green-100 bg-white/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {/* GANTI DENGAN LOGO ASLI */}
              <img
                src="/images/LogoK-Trash.png"
                alt="K-Trash"
                className="w-12 h-12 object-contain"
              />

              <h1 className="text-2xl font-extrabold text-green-600">
                K-Trash
              </h1>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-10 font-medium">
              <a
                href="#"
                className="text-green-600 border-b-2 border-green-600 pb-1"
              >
                Beranda
              </a>
              <a
                href="#fitur"
                className="hover:text-green-600 transition-all"
              >
                Fitur
              </a>
              <a
                href="#cara-kerja"
                className="hover:text-green-600 transition-all"
              >
                Cara Kerja
              </a>
              <a
                href="#tentang"
                className="hover:text-green-600 transition-all"
              >
                Tentang Kami
              </a>
              <a
                href="#kontak"
                className="hover:text-green-600 transition-all"
              >
                Kontak
              </a>
            </nav>

            {/* Button */}
            <button className="hidden lg:flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-all text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-100">
              <span>Masuk / Daftar</span>
            </button>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-gray-700"
            >
              {open ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-green-100 px-5 py-5">
            <div className="flex flex-col gap-5 font-medium">
              <a href="#">Beranda</a>
              <a href="#fitur">Fitur</a>
              <a href="#cara-kerja">Cara Kerja</a>
              <a href="#tentang">Tentang Kami</a>
              <a href="#kontak">Kontak</a>

              <button className="bg-green-600 text-white rounded-xl py-3 font-semibold mt-2">
                Masuk / Daftar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-24">
          <div className="grid lg:grid-cols-2 items-center gap-14">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-5 py-2 rounded-full mb-7">
                <Recycle className="text-green-600" size={18} />
                <span className="text-sm font-semibold text-gray-700">
                  Solusi Cerdas untuk Lingkungan Bersih
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl leading-tight font-extrabold">
                Kelola Sampah,
                <br />
                Jadi Lebih Mudah,
                <br />
                <span className="text-green-600">
                  Bermanfaat,
                  <br />
                  dan Berkelanjutan
                </span>
              </h1>

              <p className="mt-7 text-lg text-gray-600 leading-relaxed max-w-xl">
                K-Trash membantu Anda mengelola sampah dengan praktis.
                Pantau saldo, request jemput, dan lihat harga sampah
                dengan transparan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-green-200 transition-all">
                  Mulai Sekarang
                </button>

                <button className="border-2 border-green-200 hover:border-green-600 hover:text-green-600 px-8 py-4 rounded-2xl font-semibold transition-all bg-white">
                  Pelajari Lebih Lanjut
                </button>
              </div>

              {/* INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Wallet className="text-green-600" size={20} />
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    Saldo Aman
                    <br />
                    & Transparan
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Truck className="text-green-600" size={20} />
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    Jemput Sampah
                    <br />
                    Cepat & Mudah
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <BadgeDollarSign
                      className="text-green-600"
                      size={20}
                    />
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    Harga Jelas
                    <br />
                    per Kg
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              {/* GANTI DENGAN GAMBAR HERO */}
              <img
                src="/images/hero.png"
                alt="Hero"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section
        id="fitur"
        className="py-20 px-5 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-bold">
              FITUR UTAMA
            </span>

            <h2 className="text-4xl font-extrabold mt-6">
              Semua yang Anda Butuhkan
              <br />
              dalam Satu Genggaman
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                <Wallet className="text-green-600" size={40} />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                1. Lihat Saldo
              </h3>

              <p className="text-gray-600 leading-relaxed mb-8">
                Pantau saldo Anda secara real-time setiap saat.
                Transaksi aman dan riwayat jelas.
              </p>

              <button className="w-full bg-[#F4F7F2] hover:bg-green-600 hover:text-white transition-all py-4 rounded-2xl font-semibold">
                Lihat Saldo
              </button>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="text-green-600" size={40} />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                2. Request Jemput Sampah
              </h3>

              <p className="text-gray-600 leading-relaxed mb-8">
                Ajukan penjemputan dengan mudah. Pilih jadwal,
                jenis sampah, dan lokasi Anda.
              </p>

              <button className="w-full bg-[#F4F7F2] hover:bg-green-600 hover:text-white transition-all py-4 rounded-2xl font-semibold">
                Request Jemput
              </button>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                <BadgeDollarSign
                  className="text-green-600"
                  size={40}
                />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                3. Harga Sampah per Kg
              </h3>

              <p className="text-gray-600 leading-relaxed mb-8">
                Lihat daftar harga sampah terbaru per kg.
                Transparan dan selalu diperbarui.
              </p>

              <button className="w-full bg-[#F4F7F2] hover:bg-green-600 hover:text-white transition-all py-4 rounded-2xl font-semibold">
                Lihat Harga
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CARA KERJA ================= */}
      <section
        id="cara-kerja"
        className="py-20 bg-white px-5 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold">
              Cara Kerja K-Trash
            </h2>

            <p className="text-gray-600 text-xl mt-3">
              Mudah, Cepat, dan Efisien
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {/* STEP 1 */}
            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-6">
                1
              </div>

              <div className="bg-green-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Smartphone
                  className="text-green-600"
                  size={42}
                />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Daftar & Masuk
              </h3>

              <p className="text-gray-600">
                Buat akun dan lengkapi data diri untuk mulai
                menggunakan K-Trash.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-6">
                2
              </div>

              <div className="bg-green-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CalendarClock
                  className="text-green-600"
                  size={42}
                />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Request Jemput
              </h3>

              <p className="text-gray-600">
                Pilih jenis sampah, tentukan jadwal, dan
                konfirmasi penjemputan.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-6">
                3
              </div>

              <div className="bg-green-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Truck className="text-green-600" size={42} />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Sampah Dijemput
              </h3>

              <p className="text-gray-600">
                Petugas kami akan menjemput sampah sesuai
                jadwal yang telah ditentukan.
              </p>
            </div>

            {/* STEP 4 */}
            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-6">
                4
              </div>

              <div className="bg-green-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Wallet className="text-green-600" size={42} />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Saldo Bertambah
              </h3>

              <p className="text-gray-600">
                Sampah ditimbang, saldo Anda bertambah sesuai
                harga per kg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        id="kontak"
        className="bg-[#F1F6EE] pt-16 pb-10 px-5 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* LEFT */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/images/logo-ktrash.png"
                  alt="logo"
                  className="w-12 h-12"
                />

                <h2 className="text-3xl font-extrabold text-green-600">
                  K-Trash
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Platform digital untuk pengelolaan sampah yang
                lebih efisien, transparan, dan berkelanjutan.
              </p>

              <div className="flex items-center gap-4 mt-7">
                <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-white">
                  <Facebook size={20} />
                </div>

                <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-white">
                  <Instagram size={20} />
                </div>

                <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-white">
                  <Twitter size={20} />
                </div>

                <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-white">
                  <Youtube size={20} />
                </div>
              </div>
            </div>

            {/* MENU */}
            <div>
              <h3 className="font-bold text-xl mb-5">Menu</h3>

              <div className="flex flex-col gap-4 text-gray-600">
                <a href="#">Beranda</a>
                <a href="#fitur">Fitur</a>
                <a href="#cara-kerja">Cara Kerja</a>
                <a href="#tentang">Tentang Kami</a>
                <a href="#kontak">Kontak</a>
              </div>
            </div>

            {/* OTHER */}
            <div>
              <h3 className="font-bold text-xl mb-5">Lainnya</h3>

              <div className="flex flex-col gap-4 text-gray-600">
                <a href="#">FAQ</a>
                <a href="#">Kebijakan Privasi</a>
                <a href="#">Syarat & Ketentuan</a>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="font-bold text-xl mb-5">
                Kontak Kami
              </h3>

              <div className="space-y-5 text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-green-600 mt-1"
                    size={20}
                  />

                  <p>
                    Jl. Green City No. 123
                    <br />
                    Surabaya, Indonesia
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-green-600" size={20} />
                  <p>info@ktrash.id</p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-green-600" size={20} />
                  <p>0812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="border-t border-green-200 mt-14 pt-8 text-center text-gray-500">
            © 2026 K-Trash. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}