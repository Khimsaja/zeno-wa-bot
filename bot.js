const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const { state, saveState } = useSingleFileAuthState('./auth.json');

async function startBot() {
  const sock = makeWASocket({ auth: state, printQRInTerminal: true });
  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const pesan = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').toLowerCase();

    if (pesan === '#list') {
      const teks = `
╭─────────────────╮
│  📦 DAFTAR LIST "ZENO STORE"
├─────────────────╯
│ 1. PAYMENT
│ 2. YOUTUBE
│ 3. SPOTIFY
│ 4. CANVA
│ 5. VIDIO
│ 6. NETFLIX
│ 7. GTC
│ 8. CAPCUT
│ 9. VIU
│ 10. WETV
│ 11. IQIYI
│ 12. BSTATION
│ 13. ALIGHT
│ 14. ZOOM
│ 15. PRIME
│ 16. REMINI
│ 17. PICSART
│ 18. VPN
│ 19. APPLE
│ 20. VISION
│ 21. DISNEY
│ 22. GDRIVE
│ 23. CARA ORDER
│ 24. GPT
│ 25. LOKLOK
│ 26. RCTI
│ 27. HBO
╰─────────────────╯

Ketik nama produk untuk lihat harganya.
Contoh: *spotify*
`;
      await sock.sendMessage(from, { text: teks });
    } else if (pesan === '#payment') {
      await sock.sendMessage(from, { text: 'Silakan scan QRIS berikut untuk pembayaran:' });
      await sock.sendMessage(from, {
        image: fs.readFileSync('./qris.jpg'),
        caption: 'Scan QR untuk bayar ya kak! 😊'
      });
    } else if (pesan.includes('spotify')) {
      const teks = `*_SPOTIFY PREMIUM_*

🏷 *INDPLAN FULLGAR*
1 Bulan : Rp${15000 + 2000}
2 Bulan : Rp${25000 + 2000}

🏷 *FAMPLAN FULLGAR*
1 Bulan : Rp${15000 + 2000}

✅ Akun Dari Seller
✅ Tanyakan Stok Sebelum Beli`;
      await sock.sendMessage(from, { text: teks });
    } else if (pesan.includes('canva')) {
      const teks = `*_CANVA PREMIUM_*

🏷 *MEMBER PRO*
1 Bulan : Rp${1000 + 2000}
3 Bulan : Rp${2000 + 2000}
Designer +1k

🏷 *HEAD PRO*
1 Bulan : Rp${5000 + 2000}

✅ 1-3 Bulan Full Garansi
✅ Via Invite Email Kalian`;
      await sock.sendMessage(from, { text: teks });
    } else if (pesan.includes('youtube')) {
      const teks = `*_YOUTUBE PREMIUM_*

🏷 *1 BULAN INDPLAN*
Nogar : Rp${3000 + 2000}
Fullgar : Rp${5000 + 2000}

🏷 *1 BULAN FAMPLAN*
Invite : Rp${3000 + 2000}
Famhead : Rp${8000 + 2000}

✅ Akun Dari Seller
✅ Termasuk YT Musik
✅ Support Semua Device`;
      await sock.sendMessage(from, { text: teks });
    }
  });
}

startBot();