// Question generation by card question ID.
window.MathraCardQuestions = {
    buatSoalAktivasi(card) {
        let soalTeks = "";
        let jawabanKunci = 0;
        const drawVektor3D = (x, y, z) => `<span style="display:inline-block; vertical-align:middle; text-align:center; padding: 2px 8px; margin: 0 4px; border-left: 2px solid #d4af37; border-right: 2px solid #d4af37; border-radius: 8px; font-weight:bold; line-height:1.25;"><div style="border-bottom:1px dashed rgba(212,175,55,0.3); padding-bottom:2px; margin-bottom:2px;">${x}</div><div style="border-bottom:1px dashed rgba(212,175,55,0.3); padding-bottom:2px; margin-bottom:2px;">${y}</div><div>${z}</div></span>`;

                    if (card.soalId === "B01") { // Logika khusus untuk B01 dengan angka acak
                        // Daftar Tripel Pythagoras dasar (a, b, c) dimana c adalah sisi miring
                        const pythagoreanTriples = [
                            {a: 3, c: 5}, {a: 6, c: 10}, {a: 9, c: 15}, {a: 12, c: 20}, // Berbasis 3-4-5
                            {a: 5, c: 13}, {a: 10, c: 26}, // Berbasis 5-12-13
                            {a: 8, c: 17}, // Berbasis 8-15-17
                            {a: 7, c: 25}  // Berbasis 7-24-25
                        ];
                        
                        // Pilih satu set angka secara acak
                        let randomIndex = Math.floor(Math.random() * pythagoreanTriples.length);
                        let a = pythagoreanTriples[randomIndex].a;
                        let c = pythagoreanTriples[randomIndex].c;
                        
                        // --- PERUBAHAN AGAR HASIL BULAT ---
                        // Buat pengali dari kelipatan sisi miring (c)
                        let kelipatan = Math.floor(Math.random() * 5 + 2); // Acak pengali dari c * 2 sampai c * 6
                        let pengali = c * kelipatan;
                        
                        // Buat pengurangan yang bervariasi (5, 10, 15, atau 20)
                        let pengurangan = Math.floor(Math.random() * 4 + 1) * 5; 
                        
                        // Membuat soal dengan simbol matematika
                        soalTeks = `Diketahui segitiga siku-siku dengan panjang sisi tegak a = ${a} dan sisi miring c = ${c}.\n\nTentukan nilai dari: ${pengali} × sin θ - ${pengurangan}\n(asumsikan sudut θ berada di hadapan sisi a)`;
                        
                        // Menghitung jawaban yang dijamin bulat karena pengali habis membagi c
                        jawabanKunci = (kelipatan * a) - pengurangan; 
        
                     } else if (card.soalId === "B02") { // Logika khusus untuk B02
                        // Menghasilkan angka acak bilangan bulat untuk Sudut Keliling antara 15 hingga 85 derajat
                        let sudutKelilingAcak = Math.floor(Math.random() * 71) + 15; 
                        
                        soalTeks = `Tentukan besar Sudut Pusat AOB dari sudut keliling ACB = ${sudutKelilingAcak}° `;
                        
                        // Kunci jawaban: Sudut Pusat = 2 x Sudut Keliling
                        jawabanKunci = 2 * sudutKelilingAcak; 
                        
                    } else if (card.soalId === "B03") { // Logika khusus untuk B03
                        // Memastikan r kelipatan 7 agar hasil (menggunakan pi = 22/7) selalu bulat
                        let pengali = Math.floor(Math.random() * 4) + 1; // Angka acak 1 hingga 4
                        let r = pengali * 7; // Menghasilkan r = 7, 14, 21, atau 28
                        
                        soalTeks = `Hitung luas tembereng jika diketahui jari-jari lingkaran adalah r = <b>${r} cm</b> dan juring sebesar 1/4 lingkaran serta ada segitiga siku-siku di dalamnya.<br>
                        <i>(Gunakan π = 22/7)</i>`;
                        
                        // Luas Juring = 1/4 * 22/7 * r * r
                        let luasJuring = (1/4) * (22/7) * r * r;
                        // Luas Segitiga = 1/2 * alas * tinggi = 1/2 * r * r
                        let luasSegitiga = (1/2) * r * r;
                        
                        // Kunci Jawaban
                        jawabanKunci = luasJuring - luasSegitiga;
        
                    } else if (card.soalId === "B04") { // Logika khusus untuk B04
                        // Daftar pasangan b dan c dari Tripel Pythagoras 
                        // dimana c adalah faktor dari 65 (5, 13, 65) agar hasil selalu bulat
                        const pasanganBC = [
                            {b: 3, c: 5}, {b: 4, c: 5}, 
                            {b: 5, c: 13}, {b: 12, c: 13}, 
                            {b: 16, c: 65}, {b: 25, c: 65}, 
                            {b: 33, c: 65}, {b: 39, c: 65},
                            {b: 52, c: 65}, {b: 60, c: 65}, {b: 63, c: 65}
                        ];
                        
                        // Pilih satu pasangan secara acak
                        let acak = Math.floor(Math.random() * pasanganBC.length);
                        let b = pasanganBC[acak].b;
                        let c = pasanganBC[acak].c;
                        
                        soalTeks = `Tentukan nilai 65 · cos θ − 30 dari sudut perisainya (b = ${b}, c = ${c}) untuk menyuntikkan daya dorong ekstra pada Serangan Dasar!`;
                        
                        // cos θ = b / c
                        jawabanKunci = (65 * (b / c)) - 30;
                    
                    } else if (card.soalId === "B05") { // Logika khusus untuk B05
                        // Agar 50 * (a / b) menghasilkan bilangan bulat, b harus merupakan faktor dari 50.
                        // Faktor dari 50 yang cocok untuk alas (b) adalah 5, 10, atau 25.
                        const pilihanB = [5, 10, 25];
                        let b = pilihanB[Math.floor(Math.random() * pilihanB.length)];
                        
                        // Tinggi segitiga (a) diacak dari rentang 5 hingga 24
                        let a = Math.floor(Math.random() * 20) + 5; 
                        
                        soalTeks = `Hitung nilai 50 · tan θ dari proporsi segitiga (a = ${a}, b = ${b}).`;
                        
                        // Kunci Jawaban: 50 * tan θ, dimana tan θ = a / b
                        jawabanKunci = 50 * (a / b);
        
                    } else if (card.soalId === "B06") { // Logika khusus untuk B06
                        // Pecahan acak untuk sin θ menggunakan pasangan Tripel Pythagoras sebagai pengecoh
                        const pecahanSin = ["3/5", "5/13", "7/25", "8/17", "9/41", "12/37", "15/17"];
                        let sinAcak = pecahanSin[Math.floor(Math.random() * pecahanSin.length)];
                        
                        // Mengacak angka pengali (misal kelipatan 10 dari 60 hingga 120) agar bonus ATK dinamis
                        let pengali = Math.floor(Math.random() * 7 + 6) * 10; 
                        
                        soalTeks = `Tentukan nilai dari ${pengali} · (sin² θ + cos² θ) berdasarkan segitiga (sin θ = ${sinAcak}).`;
                        
                        // Kunci Jawaban: Karena sin² θ + cos² θ SELALU = 1, maka hasilnya adalah pengali * 1
                        jawabanKunci = pengali;
        
                    } else if (card.soalId === "B07") { // Logika khusus untuk B07
                        // Kombinasi jari-jari (r) dan sudut (p) yang menjamin luas juring bernilai bulat (menggunakan pi = 22/7)
                        const kombinasiJuring = [
                            { r: 14, p: 45 }, { r: 14, p: 90 }, { r: 14, p: 135 }, { r: 14, p: 270 },
                            { r: 21, p: 20 }, { r: 21, p: 40 }, { r: 21, p: 60 }, { r: 21, p: 100 }, { r: 21, p: 120 }
                        ];
                        
                        // Pilih satu kombinasi secara acak
                        let pilihan = kombinasiJuring[Math.floor(Math.random() * kombinasiJuring.length)];
                        
                        soalTeks = `Hitung luas juring jika diketahui jari-jari lingkaran adalah r = ${pilihan.r} dan juring sebesar ${pilihan.p}°.\n(Gunakan π = 22/7)`;
                        
                        // Rumus Luas Juring = (p / 360) * (22 / 7) * r * r
                        jawabanKunci = (pilihan.p / 360) * (22 / 7) * pilihan.r * pilihan.r;
                    
                    } else if (card.soalId === "B08") { // Logika khusus untuk B08
                        // Menggunakan Tripel Pythagoras agar hasil akar untuk GSPD selalu bulat
                        // d = jarak pusat, a = jumlah jari-jari (R+r), gspd = jawaban
                        const tripelGSPD = [
                            { d: 74, a: 24, gspd: 70 }, // Sesuai contoh Anda
                            { d: 13, a: 5, gspd: 12 },
                            { d: 17, a: 8, gspd: 15 },
                            { d: 25, a: 7, gspd: 24 },
                            { d: 26, a: 10, gspd: 24 },
                            { d: 29, a: 20, gspd: 21 },
                            { d: 34, a: 16, gspd: 30 },
                            { d: 37, a: 12, gspd: 35 },
                            { d: 41, a: 9, gspd: 40 },
                            { d: 50, a: 14, gspd: 48 }
                        ];
        
                        // Pilih salah satu set Tripel Pythagoras secara acak
                        let pilihan = tripelGSPD[Math.floor(Math.random() * tripelGSPD.length)];
                        
                        // Memecah nilai 'a' menjadi R dan r (dengan R > r) secara acak
                        // r_kecil tidak boleh 0, maksimal bernilai setengah dari 'a'
                        let r_kecil = Math.floor(Math.random() * Math.floor(pilihan.a / 2)) + 1; 
                        let R_besar = pilihan.a - r_kecil;
        
                        soalTeks = `Tentukan panjang Garis Singgung Persekutuan Dalam (GSPD) pada gambar (gunakan jarak pusat d = ${pilihan.d} cm, R = ${R_besar} cm, dan r = ${r_kecil} cm).`;
                        
                        // Kunci Jawaban
                        jawabanKunci = pilihan.gspd;
        
                    } else if (card.soalId === "B09") { // Logika khusus untuk B09
                        // Kumpulan Tripel Pythagoras dasar (x, y, z)
                        const tripelVektor = [
                            {x: 3, y: 4, z: 5}, {x: 5, y: 12, z: 13}, 
                            {x: 8, y: 15, z: 17}, {x: 7, y: 24, z: 25}, 
                            {x: 9, y: 40, z: 41}, {x: 12, y: 35, z: 37},
                            {x: 20, y: 21, z: 29}
                        ];
                        
                        // Pilih satu tripel dasar secara acak
                        let base = tripelVektor[Math.floor(Math.random() * tripelVektor.length)];
                        
                        // Beri pengali acak (misal 2 sampai 6) agar angkanya menjadi besar namun tetap proporsional
                        let k = Math.floor(Math.random() * 5) + 2; 
                        
                        // Dapatkan nilai total X (atas) dan Y (bawah) dari vektor resultan
                        let X = base.x * k;
                        let Y = base.y * k;
                        
                        // Pecah nilai total X menjadi u1 dan v1 (di mana u1 + v1 = X)
                        let u1 = Math.floor(Math.random() * (X - 2)) + 1;
                        let v1 = X - u1;
                        
                        // Pecah nilai total Y menjadi u2 dan v2 (di mana u2 + v2 = Y)
                        let u2 = Math.floor(Math.random() * (Y - 2)) + 1;
                        let v2 = Y - u2;
                        
                        // Fungsi kecil untuk menggambar desain Vektor Kolom 2 baris menggunakan CSS di JavaScript
                        const drawVektor = (a, b) => `<span style="display:inline-block; vertical-align:middle; text-align:center; padding: 2px 6px; margin: 0 4px; border-left: 2px solid #d4af37; border-right: 2px solid #d4af37; border-radius: 8px; font-weight:bold; line-height:1.25;"><div style="border-bottom:1px dashed rgba(212,175,55,0.3); padding-bottom:3px; margin-bottom:2px;">${a}</div><div>${b}</div></span>`;
                        
                        soalTeks = `Tentukan panjang dari vektor resultan |<b>u</b> + <b>v</b>|.<br><br>Jika diketahui:<br><b>u</b> = ${drawVektor(u1, u2)} dan <b>v</b> = ${drawVektor(v1, v2)}`;
                        
                        // Kunci Jawaban: Magnitude dari (X, Y) yang tak lain adalah (z * k)
                        jawabanKunci = base.z * k;
                    
                    } else if (card.soalId === "B10") { // Logika khusus untuk B10
                        // Membuat elemen vektor acak dengan rentang angka 3 hingga 12
                        let u1 = Math.floor(Math.random() * 10) + 3;
                        let u2 = Math.floor(Math.random() * 10) + 3;
                        let v1 = Math.floor(Math.random() * 10) + 3;
                        let v2 = Math.floor(Math.random() * 10) + 3;
                        
                        // Fungsi untuk menggambar desain Vektor Kolom 2 baris (bisa menduplikasi jika letaknya di luar scope, atau langsung dipanggil jika didefinisikan secara global sebelumnya)
                        const drawVektor = (a, b) => `<span style="display:inline-block; vertical-align:middle; text-align:center; padding: 2px 6px; margin: 0 4px; border-left: 2px solid #d4af37; border-right: 2px solid #d4af37; border-radius: 8px; font-weight:bold; line-height:1.25;"><div style="border-bottom:1px dashed rgba(212,175,55,0.3); padding-bottom:3px; margin-bottom:2px;">${a}</div><div>${b}</div></span>`;
                        
                        soalTeks = `Tentukan hasil perkalian skalar (dot product) <b>u</b> · <b>v</b> dari dua vektor berikut:<br><br><b>u</b> = ${drawVektor(u1, u2)} dan <b>v</b> = ${drawVektor(v1, v2)}`;
                        
                        // Kunci Jawaban: (u1 * v1) + (u2 * v2)
                        jawabanKunci = (u1 * v1) + (u2 * v2);
        
                    } else if (card.soalId === "B11") { // Logika khusus untuk B11
                        // Mengacak pusat lingkaran (a dan b) dari 1 hingga 50 sebagai pengecoh
                        let a = Math.floor(Math.random() * 50) + 1;
                        let b = Math.floor(Math.random() * 50) + 1;
                        
                        // Mengacak jari-jari (r) berupa bilangan bulat (misal dari rentang 20 hingga 90)
                        let r = Math.floor(Math.random() * 71) + 20; 
                        let rKuadrat = r * r; // Nilai r^2 yang akan ditampilkan di soal
                        
                        // Menuliskan soal dengan angka pusat dan kuadrat jari-jari acak
                        soalTeks = `Tentukan panjang jari-jari r dari persamaan lingkaran ((x − ${a})² + (y + ${b})² = ${rKuadrat}).`;
                        
                        // Kunci Jawaban: Akar dari rKuadrat yang nilainya sudah pasti bulat (yaitu r itu sendiri)
                        jawabanKunci = r;
                    
                    } else if (card.soalId === "B12") { // Logika khusus untuk B12
                        // Mengatur xA dan xB selalu kelipatan 2 (genap) agar xM (titik tengah) pasti bulat
                        let xA = (Math.floor(Math.random() * 30) + 10) * 2; // Genap acak 20 hingga 78
                        let xB = (Math.floor(Math.random() * 30) + 40) * 2; // Genap acak 80 hingga 138
                        
                        // yA dan yB hanya sebagai pengecoh (bisa angka ganjil maupun genap)
                        let yA = Math.floor(Math.random() * 80) + 20;
                        let yB = Math.floor(Math.random() * 80) + 20;
                        
                        // Tambahan konstanta bonus (misal 10, 20, atau 30)
                        let bonus = (Math.floor(Math.random() * 3) + 1) * 10;
                        
                        soalTeks = `Tentukan nilai xM + ${bonus}, di mana xM adalah koordinat absis dari titik tengah segmen AB pada gambar (A(${xA}, ${yA}) dan B(${xB}, ${yB})).`;
                        
                        // Kunci Jawaban: ((xA + xB) / 2) + bonus
                        jawabanKunci = ((xA + xB) / 2) + bonus;
        
                    } else if (card.soalId === "B13") { // Logika khusus untuk B13
                        // Menggunakan Tripel Pythagoras agar hasil akar untuk GSPL selalu bulat
                        // d = sisi miring (jarak pusat), selisih = (R-r), gspl = jawaban
                        const tripelGSPL = [
                            { d: 61, selisih: 11, gspl: 60 }, // Sesuai dengan contoh Anda
                            { d: 13, selisih: 5, gspl: 12 },
                            { d: 17, selisih: 8, gspl: 15 },
                            { d: 25, selisih: 7, gspl: 24 },
                            { d: 29, selisih: 20, gspl: 21 },
                            { d: 37, selisih: 12, gspl: 35 },
                            { d: 41, selisih: 9, gspl: 40 },
                            { d: 53, selisih: 28, gspl: 45 },
                            { d: 65, selisih: 16, gspl: 63 }
                        ];
                        
                        // Pilih salah satu set Tripel Pythagoras secara acak
                        let pilihan = tripelGSPL[Math.floor(Math.random() * tripelGSPL.length)];
                        
                        // Mengacak nilai r (jari-jari kecil) dari 5 hingga 24
                        let r_kecil = Math.floor(Math.random() * 20) + 5;
                        // Menentukan R (jari-jari besar) berdasarkan selisih
                        let R_besar = r_kecil + pilihan.selisih;
                        
                        soalTeks = `Tentukan panjang Garis Singgung Persekutuan Luar (GSPL) pada gambar (gunakan jarak pusat d = ${pilihan.d} cm, R = ${R_besar} cm, dan r = ${r_kecil} cm).`;
                        
                        // Kunci Jawaban
                        jawabanKunci = pilihan.gspl;
        
        
                    } else if (card.soalId === "B14") { // Logika khusus untuk B14
                        // Menggunakan Tripel Pythagoras agar titik persinggungan selalu bulat
                        const tripelGS = [
                            { x: 3, y: 4, r: 5 }, 
                            { x: 5, y: 12, r: 13 }, 
                            { x: 8, y: 15, r: 17 }, 
                            { x: 7, y: 24, r: 25 }
                        ];
                        let base = tripelGS[Math.floor(Math.random() * tripelGS.length)];
                        
                        // Pengali acak 2 hingga 5 untuk memperbesar angka
                        let k = Math.floor(Math.random() * 4) + 2; 
                        
                        let x1 = base.x * k;
                        let y1 = base.y * k;
                        let rKuadrat = Math.pow(base.r * k, 2);
                        
                        // Mencari Faktor Persekutuan Terbesar (GCD) untuk menyederhanakan persamaan
                        const getGCD = (a, b) => b === 0 ? a : getGCD(b, a % b);
                        let gcd = getGCD(x1, y1);
                        
                        // Menyederhanakan Ax + By = C
                        let A_gs = x1 / gcd;
                        let B_gs = y1 / gcd;
                        let C_gs = rKuadrat / gcd;
                        
                        // Bonus acak (misal 10, 20, 30, 40, atau 50)
                        let bonus = (Math.floor(Math.random() * 5) + 1) * 10;
                        
                        soalTeks = `Tentukan nilai C + ${bonus}, di mana C adalah konstanta dari bentuk sederhana garis singgung ${A_gs}x + ${B_gs}y = C pada gambar (x² + y² = ${rKuadrat} di titik (${x1}, ${y1})).`;
                        
                        // Kunci Jawaban: C ditambah bonus
                        jawabanKunci = C_gs + bonus;
        
                    } else if (card.soalId === "B15") { // Logika khusus untuk B15
                        // Mengacak titik pusat (a, b) dalam rentang (-20 hingga 20, kecuali 0)
                        let a = (Math.floor(Math.random() * 15) + 5) * (Math.random() < 0.5 ? 1 : -1);
                        let b = (Math.floor(Math.random() * 15) + 5) * (Math.random() < 0.5 ? 1 : -1);
                        
                        // Mengacak jari-jari (r) bilangan bulat antara 30 hingga 79
                        let r = Math.floor(Math.random() * 50) + 30;
                        
                        // Menghitung koefisien A, B, dan C
                        let A = -2 * a;
                        let B = -2 * b;
                        let C = (a * a) + (b * b) - (r * r);
                        
                        // Format tanda + atau - agar tampilan persamaan di web terlihat rapi
                        let teksA = A >= 0 ? `+ ${A}` : `- ${Math.abs(A)}`;
                        let teksB = B >= 0 ? `+ ${B}` : `- ${Math.abs(B)}`;
                        let teksC = C >= 0 ? `+ ${C}` : `- ${Math.abs(C)}`;
                        
                        soalTeks = `Tentukan panjang jari-jari r dari persamaan lingkaran umum pada gambar (x² + y² ${teksA}x ${teksB}y ${teksC} = 0).`;
                        
                        // Kunci Jawaban: Jari-jari r
                        jawabanKunci = r;
        
                    } else if (card.soalId === "B16") { // Logika khusus untuk B16
                        // Daftar kombinasi komponen Tripel 3D (x, y, z) yang menghasilkan panjang r bulat
                        const tripel3D = [
                            { x: 0, y: 4, z: 3, r: 5 },   // Sesuai contoh Anda (rasio 0:4:3)
                            { x: 0, y: 12, z: 5, r: 13 },
                            { x: 1, y: 2, z: 2, r: 3 },
                            { x: 2, y: 3, z: 6, r: 7 },
                            { x: 4, y: 4, z: 7, r: 9 },
                            { x: 2, y: 10, z: 11, r: 15 }
                        ];
        
                        // Pilih salah satu pola tripel 3D secara acak
                        let base = tripel3D[Math.floor(Math.random() * tripel3D.length)];
        
                        // Acak tanda positif/negatif untuk masing-masing komponen
                        let sx = Math.random() < 0.5 ? 1 : -1;
                        let sy = Math.random() < 0.5 ? 1 : -1;
                        let sz = Math.random() < 0.5 ? 1 : -1;
        
                        // Faktor pengali acak (k = 8 hingga 20)
                        let k = Math.floor(Math.random() * 13) + 8;
        
                        // Komponen vektor hasil perkalian silang (u x v)
                        let vx = base.x * k * sx;
                        let vy = base.y * k * sy;
                        let vz = base.z * k * sz;
        
                        soalTeks = `Tentukan panjang dari vektor hasil perkalian silang |<b>u</b> × <b>v</b>| pada gambar:<br><br><b>u</b> × <b>v</b> = ${drawVektor3D(vx, vy, vz)}`;
        
                        // Kunci Jawaban: Modulus |u x v| = base.r * k (Pasti berupa bilangan bulat)
                        jawabanKunci = base.r * k;
                        
                    } else {
                        // Biarkan soal lama untuk kartu lain
                        let tipeSoal = Math.floor(Math.random() * 4); 
                        let rusuk = Math.floor(Math.random() * 6) + 4; 
                        
                        if (tipeSoal === 0) { soalTeks = `Kubus ABCD.EFGH memiliki panjang rusuk ${rusuk} cm.\nBerapa cm³ Volume ruang kubus tersebut?`; jawabanKunci = Math.pow(rusuk, 3); } 
                        else if (tipeSoal === 1) { soalTeks = `Kubus ABCD.EFGH memiliki panjang rusuk ${rusuk} cm.\nBerapa cm² Luas Permukaan totalnya?`; jawabanKunci = 6 * Math.pow(rusuk, 2); } 
                        else if (tipeSoal === 2) { soalTeks = `Pada Kubus ABCD.EFGH berusuk ${rusuk} cm.\nBerapa nilai KUADRAT dari jarak titik A ke titik C (AC²)?`; jawabanKunci = 2 * Math.pow(rusuk, 2); } 
                        else { soalTeks = `Pada Kubus ABCD.EFGH berusuk ${rusuk} cm.\nBerapa nilai KUADRAT dari jarak titik A ke titik G (AG²)?`; jawabanKunci = 3 * Math.pow(rusuk, 2); }
                    }

        return { soalTeks, jawabanKunci };
    }
};
