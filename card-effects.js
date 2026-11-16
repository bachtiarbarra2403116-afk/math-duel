// Card effects keyed by effect ID. Shared game helpers are injected by the caller.
window.MathraCardEffects = {
    async aktifkan(card, activePlayer, opponent, context) {
        const { state, UI, log, hitungAfiliasi, punyaAfiliasi, pilihDariDaftar, hancurkanKartu } = context;
                        switch(card.efekId) {
                            case "B01": card.atk += 250; log(`${card.nama} mendapat +250 ATK.`); break; 
                            case "B02": { // B02 Multigon: ada Circle lain di field -> ATK x2
                                if (hitungAfiliasi(activePlayer.field, "Circle") > 0) { card.atk *= 2; log(`${card.nama}: ada kartu Circle di field, ATK menjadi 2x lipat (${card.atk}).`); }
                                else log(`${card.nama}: tidak ada kartu Circle lain di field, ATK tidak berubah.`);
                                break; }
                            case "B03": card.efekAktif = true; log(`${card.nama}: ATK 4x saat field lawan kosong, hancur setelah menyerang.`); break; // B03
                            case "B04": card.atk += 300; log(`${card.nama} mendapat +300 ATK.`); break; 
                            case "B05": { // B05 Tango: punya Sinner (B01) & Cosmos (B04) di field -> ATK x2 & serang 2x
                                let adaB01 = activePlayer.field.some(c => c.kode === "B01"), adaB04 = activePlayer.field.some(c => c.kode === "B04");
                                if (adaB01 && adaB04) { card.atk *= 2; card.serangDua = true; log(`${card.nama}: Sinner & Cosmos hadir. ATK digandakan (${card.atk}) dan bisa menyerang 2 kali.`); }
                                else log(`${card.nama}: butuh Sinner - Sinus of Trigonometry dan Cosmos - Cosinus of Trigonometry di field, efek tidak aktif.`);
                                break; }
                            case "B06": { // B06 Monos: ada Trigonometry lain di field -> tambahkan ATK satu kartu pilihanmu ke kartu ini
                                if (hitungAfiliasi(activePlayer.field, "Trigonometry") === 0) { log(`${card.nama}: tidak ada kartu Trigonometry lain di field, efek tidak aktif.`); break; }
                                let kandidatB06 = activePlayer.field.filter(c => c.tipe === "Bidak");
                                let sumberB06 = await pilihDariDaftar(kandidatB06, "Target B06: Monos", "Pilih kartu milikmu yang nilai serangannya akan ditambahkan ke kartu ini.\n\nKetik nomor kartu:");
                                if (!sumberB06) { log(`Pemilihan target dibatalkan. Efek ${card.nama} hangus.`); break; }
                                card.atk += sumberB06.atk;
                                log(`${card.nama} menyerap ${sumberB06.atk} ATK dari ${sumberB06.nama}. ATK sekarang ${card.atk}.`);
                                break; }
                            case "B07": { // B07 Biggon: pilih satu Circle milikmu (boleh kartu ini sendiri) -> +150 ATK
                                let kandidatB07 = [...activePlayer.field.filter(c => punyaAfiliasi(c, "Circle")), card];
                                let targetB07 = await pilihDariDaftar(kandidatB07, "Target B07: Biggon", "Pilih satu kartu Circle milikmu untuk ditambah +150 ATK (kartu ini boleh dipilih).\n\nKetik nomor kartu:");
                                if (!targetB07) { log(`Pemilihan target dibatalkan. Efek ${card.nama} hangus.`); break; }
                                targetB07.atk += 150;
                                log(`${targetB07.nama} mendapat +150 ATK dari ${card.nama} (ATK sekarang ${targetB07.atk}).`);
                                break; }
                            case "B08": card.tidakHancurSerang = true; log(`${card.nama} tidak dapat hancur ketika diserang.`); break; // B08
                            case "B09": { // B09 Verdict: semua Bidak di field milikmu +100 ATK (tidak termasuk kartu ini)
                                let sekutu = activePlayer.field.filter(c => c.tipe === "Bidak");
                                sekutu.forEach(c => c.atk += 100);
                                log(sekutu.length ? `${card.nama}: ${sekutu.length} Bidak milik ${activePlayer.nama} mendapat +100 ATK.` : `${card.nama}: belum ada Bidak lain di field, efek tidak mengenai siapa pun.`);
                                break; }
                            case "B10": { // B10 Cordpot: semua Bidak lawan -85 ATK
                                let musuh = opponent.field.filter(c => c.tipe === "Bidak");
                                musuh.forEach(c => c.atk = Math.max(0, c.atk - 85));
                                log(musuh.length ? `${card.nama}: ${musuh.length} Bidak milik ${opponent.nama} kehilangan 85 ATK.` : `${card.nama}: field lawan kosong, efek tidak mengenai siapa pun.`);
                                break; }
                            case "B11": { // B11 Aquino: hancurkan satu Circle milikmu -> serangan langsung ke lawan sebesar ATK-nya
                                let kandidatB11 = activePlayer.field.filter(c => punyaAfiliasi(c, "Circle"));
                                if (kandidatB11.length === 0) { log(`${card.nama}: tidak ada kartu Circle di field untuk dikorbankan, efek tidak aktif.`); break; }
                                let korbanB11 = await pilihDariDaftar(kandidatB11, "Target B11: Aquino", "Pilih satu kartu Circle milikmu untuk DIHANCURKAN. Nilai serangannya menjadi serangan langsung ke lawan.\n\nKetik nomor kartu:", true);
                                if (!korbanB11) { log(`Pemilihan target dibatalkan. Efek ${card.nama} hangus.`); break; }
                                let dmgB11 = korbanB11.atk;
                                if (hancurkanKartu(activePlayer, korbanB11)) {
                                    opponent.hp -= dmgB11;
                                    log(`${card.nama}: ${korbanB11.nama} dihancurkan. Serangan langsung ${dmgB11} damage ke ${opponent.nama}.`);
                                } else log(`${card.nama}: ${korbanB11.nama} tidak bisa dihancurkan, serangan langsung batal.`);
                                break; }
                            case "B12": { // B12 Dimipton: jika field musuh tepat 2 Bidak, semua Bidak milikmu +150 ATK (tidak termasuk kartu ini)
                                let jmlMusuh = opponent.field.filter(c => c.tipe === "Bidak").length;
                                if (jmlMusuh === 2) {
                                    let sekutu = activePlayer.field.filter(c => c.tipe === "Bidak");
                                    sekutu.forEach(c => c.atk += 150);
                                    log(`${card.nama}: field lawan berisi 2 Bidak, ${sekutu.length} Bidak milik ${activePlayer.nama} mendapat +150 ATK.`);
                                } else {
                                    log(`${card.nama}: field lawan berisi ${jmlMusuh} Bidak (bukan 2), efek tidak aktif.`);
                                }
                                break; }
                            case "B13": { // B13 Arlenext: +50 ATK; sekali per pemain, semua Circle tidak hancur saat diserang (sampai akhir giliran lawan berikutnya)
                                card.atk += 50;
                                if (!activePlayer.b13Dipakai) {
                                    activePlayer.b13Dipakai = true;
                                    activePlayer.perisaiCircleSampai = state.turnCount + 1;
                                    log(`${card.nama}: +50 ATK. Semua kartu Circle ${activePlayer.nama} tidak dapat hancur ketika diserang hingga akhir giliran lawan berikutnya.`);
                                } else log(`${card.nama}: +50 ATK. Perisai Circle sudah pernah dipakai di permainan ini.`);
                                break; }
                            case "B14": { // B14 Gennat: +80 ATK per Circle di field (termasuk kartu ini)
                                let jmlCircle = hitungAfiliasi(activePlayer.field, "Circle") + 1;
                                card.atk += 80 * jmlCircle;
                                log(`${card.nama} mendapat +${80 * jmlCircle} ATK (${jmlCircle} kartu Circle, termasuk dirinya).`);
                                break; }
                            case "B15": { // B15 Darius: +5% dari HP saat ini
                                let bonusHp = Math.floor(activePlayer.hp * 0.05);
                                card.atk += bonusHp;
                                log(`${card.nama} mendapat +${bonusHp} ATK (5% dari ${activePlayer.hp} HP).`);
                                break; }
                            case "B16": { // B16 Duoslum: punya Verdict (B09) & Cordpot (B10) di field -> hancurkan semua Bidak lawan, tidak boleh menyerang giliran ini
                                let adaB09 = activePlayer.field.some(c => c.kode === "B09"), adaB10 = activePlayer.field.some(c => c.kode === "B10");
                                if (!(adaB09 && adaB10)) { log(`${card.nama}: butuh Verdict - The Magnitude of Geometry dan Cordpot - The Dot Product Vector di field, efek tidak aktif.`); break; }
                                let hancurB16 = 0;
                                opponent.field.filter(c => c.tipe === "Bidak").forEach(c => { if (hancurkanKartu(opponent, c)) hancurB16++; });
                                activePlayer.dilarangSerangPadaGiliran = state.turnCount;
                                log(`${card.nama}: ${hancurB16} Bidak milik ${opponent.nama} dihancurkan. ${activePlayer.nama} tidak dapat menyerang pada giliran ini.`);
                                break; }
                            case "S01": { // S01: semua Trigonometry di field milikmu +200 ATK
                                let tri = activePlayer.field.filter(c => punyaAfiliasi(c, "Trigonometry"));
                                tri.forEach(c => c.atk += 200);
                                log(tri.length ? `${card.nama}: ${tri.length} kartu Trigonometry mendapat +200 ATK.` : `${card.nama}: tidak ada kartu Trigonometry di field, efek gagal.`);
                                break; }
                            case "S02": { // S02: semua Circle di field milikmu +200 ATK
                                let cir = activePlayer.field.filter(c => punyaAfiliasi(c, "Circle"));
                                cir.forEach(c => c.atk += 200);
                                log(cir.length ? `${card.nama}: ${cir.length} kartu Circle mendapat +200 ATK.` : `${card.nama}: tidak ada kartu Circle di field, efek gagal.`);
                                break; }
                            case "S03": { // S03: pilih satu Trigonometry milikmu +180 ATK
                                let kandS03 = activePlayer.field.filter(c => punyaAfiliasi(c, "Trigonometry"));
                                if (kandS03.length === 0) { log(`${card.nama}: tidak ada kartu Trigonometry di field, efek gagal.`); break; }
                                let tS03 = await pilihDariDaftar(kandS03, "Target S03: Parallegoram Area Theorem", "Pilih satu kartu Trigonometry milikmu untuk ditambah +180 ATK.\n\nKetik nomor kartu:");
                                if (!tS03) { log(`Pemilihan target dibatalkan. Efek ${card.nama} hangus.`); break; }
                                tS03.atk += 180;
                                log(`${tS03.nama} mendapat +180 ATK dari ${card.nama} (ATK sekarang ${tS03.atk}).`);
                                break; }
                            case "S04": // S04 - Angle Bisector Theorem (Pilih Circle Sendiri)
                                let validCirc = activePlayer.field.filter(c => punyaAfiliasi(c, "Circle"));
                                if (validCirc.length === 1) {
                                    validCirc[0].atk *= 2;
                                    log(`ATK ${validCirc[0].nama} menjadi 2x lipat!`);
                                } else if (validCirc.length > 1) {
                                    let msg = "Ketik nomor Bidak Circle yang ingin digandakan ATK-nya:\n\n";
                                    validCirc.forEach((c, i) => msg += `${i+1}. ${c.nama} (ATK: ${c.atk})\n`);
                                    let pilihanValid = false;
                                    while(!pilihanValid) {
                                        let input = await UI.prompt(msg, "Target S04: Angle Bisector Theorem");
                                        if(input === null) {
                                            log("Pemilihan target dibatalkan. Efek Angle Bisector Theorem hangus.");
                                            pilihanValid = true;
                                        } else {
                                            let num = parseInt(input);
                                            if(!isNaN(num) && num >= 1 && num <= validCirc.length) {
                                                validCirc[num-1].atk *= 2;
                                                log(`ATK ${validCirc[num-1].nama} menjadi 2x lipat!`);
                                                pilihanValid = true;
                                            } else {
                                                await UI.alert("Nomor tidak valid! Silakan masukkan nomor Bidak yang tersedia.");
                                            }
                                        }
                                    }
                                } else {
                                    log("Tidak ada Bidak Circle di lapangan. Efek Angle Bisector Theorem gagal.");
                                }
                                break;
                                
                            case "S05": // S05 - Inscribed Angle Theorem (Pilih Bidak Lawan)
                                let validOpp = opponent.field.filter(c => c.tipe === "Bidak");
                                if(validOpp.length === 1) { 
                                    validOpp[0].atk = Math.floor(validOpp[0].atk / 2); 
                                    log(`ATK ${validOpp[0].nama} milik lawan dipotong 50%!`); 
                                } else if (validOpp.length > 1) {
                                    let msg = "Ketik nomor Bidak lawan yang ingin dipotong ATK-nya:\n\n";
                                    validOpp.forEach((c, i) => msg += `${i+1}. ${c.nama} (ATK: ${c.atk})\n`);
                                    let pilihanValid = false;
                                    while(!pilihanValid) {
                                        let input = await UI.prompt(msg, "Target S05: Inscribed Angle Theorem");
                                        if(input === null) {
                                            log("Pemilihan target dibatalkan. Efek Inscribed Angle Theorem hangus.");
                                            pilihanValid = true;
                                        } else {
                                            let num = parseInt(input);
                                            if(!isNaN(num) && num >= 1 && num <= validOpp.length) {
                                                validOpp[num-1].atk = Math.floor(validOpp[num-1].atk / 2);
                                                log(`ATK ${validOpp[num-1].nama} milik lawan dipotong 50%!`);
                                                pilihanValid = true;
                                            } else {
                                                await UI.alert("Nomor tidak valid! Silakan masukkan nomor Bidak yang tersedia.");
                                            }
                                        }
                                    }
                                } else {
                                    log("Tidak ada target Bidak lawan yang valid. Efek Inscribed Angle Theorem gagal.");
                                }
                                break;
                            case "S06": activePlayer.hp += 800; break; 
                            case "S07": activePlayer.hp += 1000; break; 
                            case "S08": if(activePlayer.hp <= 1500) opponent.hp = Math.floor(opponent.hp/2); else await UI.alert("HP Anda > 1500. Efek Gagal."); break;
                            case "D01": activePlayer.domainEuclid = true; log("!!! ROUND OF EUCLID - FATHER OF GEOMETRY DIAKTIFKAN !!!"); break;
                        }
    }
};
