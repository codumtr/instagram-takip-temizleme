/**
 * ==============================================================
 *  ⚡ CODUM.TR • TOPLU TAKİP TEMİZLEME SİSTEMİ v4.5 ⚡
 *  Instagram Takip Edilenleri Otomatik Temizleme & Sıfırlama Aracı
 *  Resmi Web: https://codum.tr
 * ==============================================================
 */

(function () {
  // Önceki çalışan motoru ve arayüzü kaldır
  if (window.__CODUM_CLEANER) window.__CODUM_CLEANER.stop();
  const prevUi = document.getElementById("codum-cleaner-suite");
  if (prevUi) prevUi.remove();
  const prevStyles = document.getElementById("codum-cleaner-styles");
  if (prevStyles) prevStyles.remove();

  console.clear();
  console.log(
    `%c
   ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ███╗████████╗██████╗ 
  ██╔════╝██╔═══██╗██╔══██╗██║   ██║████╗ ████║╚══██╔══╝██╔══██╗
  ██║     ██║   ██║██║  ██║██║   ██║██╔████╔██║   ██║   ██████╔╝
  ██║     ██║   ██║██║  ██║██║   ██║██║╚██╔╝██║   ██║   ██╔══██╗
  ╚██████╗╚██████╔╝██████╔╝╚██████╔╝██║ ╚═╝ ██║   ██║   ██║  ██║
   ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝
     ⚡ INSTAGRAM TOPLU TAKİP TEMİZLEME ARACI | CODUM.TR ⚡
    `,
    "background: linear-gradient(135deg, #6366f1, #d946ef); color: #fff; font-size: 11px; font-weight: bold; padding: 10px; border-radius: 8px;"
  );

  // Ses Sentezleyici Bildirimleri
  function playAudioTone(type = "start") {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === "start") {
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.15);
      } else {
        osc.frequency.setValueAtTime(700, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.2);
      }
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  // Modern Tema Stilleri
  const styles = document.createElement("style");
  styles.id = "codum-cleaner-styles";
  styles.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
    
    #codum-cleaner-suite * {
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    }

    #codum-cleaner-suite {
      position: fixed;
      top: 25px;
      right: 25px;
      width: 325px;
      background: rgba(12, 14, 22, 0.92);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.2);
      z-index: 9999999999;
      color: #f1f5f9;
      overflow: hidden;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #codum-cleaner-suite::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, #6366f1, #d946ef, #3b82f6);
    }

    .c-header {
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: grab;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .c-badge {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.6px;
      padding: 3px 8px;
      border-radius: 99px;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.4);
      color: #a5b4fc;
    }

    .c-stat-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 14px 16px 10px;
    }

    .c-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 10px 12px;
    }

    .c-card-title {
      font-size: 10px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .c-card-val {
      font-size: 24px;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
    }

    /* iOS Tarzı Özel Switch */
    .c-switch {
      position: relative;
      display: inline-block;
      width: 38px;
      height: 22px;
    }
    .c-switch input { opacity: 0; width: 0; height: 0; }
    .c-slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #262738;
      transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 34px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .c-slider:before {
      position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px;
      background-color: #fff;
      transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 50%;
    }
    input:checked + .c-slider {
      background: linear-gradient(135deg, #6366f1, #d946ef);
    }
    input:checked + .c-slider:before {
      transform: translateX(16px);
    }

    .c-terminal {
      background: #08090f;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      padding: 8px 12px;
      height: 65px;
      overflow-y: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      color: #cbd5e1;
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin: 0 16px 12px;
    }
    .c-terminal::-webkit-scrollbar { width: 3px; }
    .c-terminal::-webkit-scrollbar-thumb { background: #222538; border-radius: 4px; }

    .c-btn {
      flex: 1;
      padding: 10px;
      border-radius: 12px;
      border: none;
      font-weight: 700;
      font-size: 12.5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .c-btn-start {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
    }
    .c-btn-start:hover {
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.55);
      transform: translateY(-1px);
    }

    .c-btn-stop {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3) !important;
      color: #f87171;
    }

    /* Küçültülmüş Pill Modu */
    #codum-cleaner-suite.minimized {
      width: 195px;
      border-radius: 99px;
      padding: 6px 12px;
    }
    #codum-cleaner-suite.minimized .c-body,
    #codum-cleaner-suite.minimized .c-terminal {
      display: none !important;
    }
    #codum-cleaner-suite.minimized .c-header {
      padding: 0;
      border: none;
    }
  `;
  document.head.appendChild(styles);

  // Panel Arayüzü
  const ui = document.createElement("div");
  ui.id = "codum-cleaner-suite";
  ui.innerHTML = `
    <!-- Header -->
    <div class="c-header" id="codum-drag-handle">
      <div style="display:flex; align-items:center; gap:9px;">
        <div style="width:26px; height:26px; border-radius:8px; background:linear-gradient(135deg, #6366f1, #d946ef); display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(217,70,239,0.3);">
          <span style="font-size:13px;">🧹</span>
        </div>
        <div>
          <div style="font-weight:800; font-size:13.5px; letter-spacing:-0.2px;">
            codum<span style="color:#d946ef;">.tr</span>
          </div>
          <div style="font-size:9.5px; color:#64748b; font-weight:600;">TAKİP TEMİZLEME PRO</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <span class="c-badge">v4.5</span>
        <button id="c-btn-min" style="background:none; border:none; color:#64748b; cursor:pointer; font-size:14px; padding:2px;">—</button>
        <button id="c-btn-close" style="background:none; border:none; color:#64748b; cursor:pointer; font-size:15px; padding:2px;">✕</button>
      </div>
    </div>

    <!-- Body -->
    <div class="c-body">
      <!-- İstatistik Sayaçları -->
      <div class="c-stat-grid">
        <div class="c-card">
          <div class="c-card-title">Temizlenen Takip</div>
          <div class="c-card-val" id="c-stat-cleaned" style="color:#34d399;">0</div>
        </div>
        <div class="c-card">
          <div class="c-card-title">Korunan Hesap</div>
          <div class="c-card-val" id="c-stat-skipped" style="color:#f59e0b;">0</div>
        </div>
      </div>

      <!-- Hız Presetleri -->
      <div style="display:flex; gap:6px; margin: 0 16px 10px;">
        <button id="btn-speed-turbo" style="flex:1; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:5px; color:#fff; font-size:10px; font-weight:600; cursor:pointer;">⚡ Turbo (0.3s)</button>
        <button id="btn-speed-fast" style="flex:1; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:5px; color:#fff; font-size:10px; font-weight:600; cursor:pointer;">🚀 Seri (0.7s)</button>
        <button id="btn-speed-safe" style="flex:1; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:5px; color:#fff; font-size:10px; font-weight:600; cursor:pointer;">🛡️ Güvenli (3s)</button>
      </div>

      <!-- Ayarlar -->
      <div style="padding: 0 16px 12px; display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:11.5px; color:#94a3b8; font-weight:500;">İşlem Gecikmesi (sn)</span>
          <div style="display:flex; align-items:center; gap:4px;">
            <input type="number" step="0.1" id="c-min-sec" value="0.2" style="width:42px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:#fff; text-align:center; padding:3px; font-size:11px;">
            <span style="color:#475569;">-</span>
            <input type="number" step="0.1" id="c-max-sec" value="0.5" style="width:42px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:#fff; text-align:center; padding:3px; font-size:11px;">
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:11.5px; color:#94a3b8; font-weight:500;">Mavi Tikli Hesapları Koru</span>
          <label class="c-switch">
            <input type="checkbox" id="c-chk-verified" checked>
            <span class="c-slider"></span>
          </label>
        </div>

        <div>
          <span style="font-size:11.5px; color:#94a3b8; font-weight:500; display:block; margin-bottom:4px;">Koruma Listesi (Dokunulmayacaklar)</span>
          <input type="text" id="c-whitelist" placeholder="kullanici1, kullanici2" style="width:100%; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#fff; padding:6px 10px; font-size:11px;">
        </div>
      </div>

      <!-- Mini Terminal Log -->
      <div class="c-terminal" id="c-terminal">
        <div><span style="color:#6366f1;">●</span> Takip temizleyici hazır. Başlat bekleniyor.</div>
      </div>

      <!-- Aksiyon Butonları -->
      <div style="display:flex; gap:8px; padding: 0 16px 14px;">
        <button id="c-btn-start" class="c-btn c-btn-start">
          <span>🧹</span> Temizlemeyi Başlat
        </button>
        <button id="c-btn-stop" class="c-btn c-btn-stop" disabled style="opacity:0.5; cursor:not-allowed;">
          Durdur
        </button>
      </div>

      <!-- Footer & Reklam -->
      <div style="padding:10px 16px; border-top:1px solid rgba(255,255,255,0.04); display:flex; justify-content:space-between; align-items:center; font-size:10px; color:#64748b;">
        <span>Instagram Takip Temizleme</span>
        <a href="https://codum.tr" target="_blank" style="color:#a5b4fc; text-decoration:none; font-weight:700;">codum.tr</a>
      </div>
    </div>
  `;
  document.body.appendChild(ui);

  // Sürükle Bırak (Draggable)
  let isDragging = false, startX, startY, initX, initY;
  const dragHandle = document.getElementById("codum-drag-handle");
  dragHandle.onmousedown = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = ui.getBoundingClientRect();
    initX = rect.left;
    initY = rect.top;
    ui.style.right = "auto";
  };
  window.onmousemove = (e) => {
    if (!isDragging) return;
    ui.style.left = `${initX + (e.clientX - startX)}px`;
    ui.style.top = `${initY + (e.clientY - startY)}px`;
  };
  window.onmouseup = () => (isDragging = false);

  // Terminal Log Fonksiyonu
  const terminal = document.getElementById("c-terminal");
  function logEvent(msg, color = "#cbd5e1") {
    const row = document.createElement("div");
    row.innerHTML = `<span style="color:${color};">›</span> ${msg}`;
    terminal.appendChild(row);
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Hız Preset Düğmeleri
  const minInp = document.getElementById("c-min-sec");
  const maxInp = document.getElementById("c-max-sec");
  document.getElementById("btn-speed-turbo").onclick = () => { minInp.value = "0.2"; maxInp.value = "0.4"; logEvent("⚡ Turbo Temizleme seçildi (0.2s - 0.4s)", "#34d399"); };
  document.getElementById("btn-speed-fast").onclick = () => { minInp.value = "0.6"; maxInp.value = "1.0"; logEvent("🚀 Seri Temizleme seçildi (0.6s - 1.0s)", "#38bdf8"); };
  document.getElementById("btn-speed-safe").onclick = () => { minInp.value = "2.5"; maxInp.value = "4.0"; logEvent("🛡️ Güvenli Temizleme seçildi (2.5s - 4.0s)", "#f59e0b"); };

  // Küçültme (Pill) Modu
  const btnMin = document.getElementById("c-btn-min");
  btnMin.onclick = () => {
    ui.classList.toggle("minimized");
    btnMin.innerText = ui.classList.contains("minimized") ? "□" : "—";
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const randomDelay = (min, max) => Math.floor((Math.random() * (max - min) + min) * 1000);

  // Takip Listesi Penceresini Kapatıp Taze Olarak Açma (Auto-Cycle)
  async function reloadFollowingList() {
    logEvent("🔄 Liste temizlendi, yeni takip edilenler yükleniyor...", "#a855f7");
    const dialog = document.querySelector('div[role="dialog"]');
    if (dialog) {
      const closeBtn = dialog.querySelector('svg[aria-label="Kapat"], svg[aria-label="Close"]')?.closest('button');
      if (closeBtn) closeBtn.click();
      else window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
    }
    await sleep(1000);
    const followingLink = document.querySelector('a[href$="/following/"], a[href*="/following/"], a[href*="/following"]');
    if (followingLink) {
      followingLink.click();
      await sleep(1400);
      return true;
    }
    return false;
  }

  // Temizleme Motoru
  const cleanerEngine = {
    active: false,
    cleanedCount: 0,
    skippedCount: 0,

    stop() {
      this.active = false;
      playAudioTone("stop");
      const btnStart = document.getElementById("c-btn-start");
      const btnStop = document.getElementById("c-btn-stop");
      btnStart.disabled = false;
      btnStart.style.opacity = "1";
      btnStart.style.cursor = "pointer";
      btnStop.disabled = true;
      btnStop.style.opacity = "0.5";
      btnStop.style.cursor = "not-allowed";
      logEvent(`İşlem durduruldu. Temizlenen toplam: ${this.cleanedCount}`, "#f87171");
    },

    async start() {
      this.active = true;
      playAudioTone("start");
      const btnStart = document.getElementById("c-btn-start");
      const btnStop = document.getElementById("c-btn-stop");
      btnStart.disabled = true;
      btnStart.style.opacity = "0.5";
      btnStart.style.cursor = "not-allowed";
      btnStop.disabled = false;
      btnStop.style.opacity = "1";
      btnStop.style.cursor = "pointer";

      const skipVerif = document.getElementById("c-chk-verified").checked;
      const wlText = document.getElementById("c-whitelist").value.toLowerCase();
      const whitelist = wlText.split(",").map((s) => s.trim().replace("@", "")).filter(Boolean);
      const statCl = document.getElementById("c-stat-cleaned");
      const statSk = document.getElementById("c-stat-skipped");

      logEvent("Takip temizleme motoru çalışıyor...", "#34d399");

      while (this.active) {
        let dialog = document.querySelector('div[role="dialog"]');
        if (!dialog) {
          const opened = await reloadFollowingList();
          if (!opened) {
            logEvent("Takip edilenler listesi açılamadı!", "#f87171");
            break;
          }
          dialog = document.querySelector('div[role="dialog"]');
        }

        const minS = parseFloat(minInp.value) || 0.2;
        const maxS = parseFloat(maxInp.value) || 0.5;

        // "Following" / "Takiptesin" butonlarını yakala
        const buttons = Array.from(dialog.querySelectorAll("button")).filter((b) => {
          const t = (b.innerText || b.textContent || "").trim();
          return (t === "Following" || t === "Takiptesin" || t === "Takip Ediliyor") && !b.dataset.codumDone;
        });

        let anyHandled = false;

        for (const btn of buttons) {
          if (!this.active) break;

          const row = btn.closest("li") || btn.closest('div[role="button"]') || btn.parentElement.parentElement;
          const link = row ? row.querySelector('a[role="link"]') : null;
          const username = link ? link.textContent.trim().toLowerCase() : "";

          // Whitelist kontrolü
          if (username && whitelist.includes(username)) {
            this.skippedCount++;
            statSk.innerText = this.skippedCount;
            logEvent(`@${username} korundu (Listede)`, "#f59e0b");
            btn.dataset.codumDone = "true";
            continue;
          }

          // Mavi tikli hesap kontrolü
          if (skipVerif && row) {
            const hasVerified = row.querySelector('svg[aria-label*="Doğrulanmış"], svg[aria-label*="Verified"]');
            if (hasVerified) {
              this.skippedCount++;
              statSk.innerText = this.skippedCount;
              logEvent(`@${username || "Hesap"} korundu (Mavi Tik)`, "#f59e0b");
              btn.dataset.codumDone = "true";
              continue;
            }
          }

          btn.dataset.codumDone = "true";
          anyHandled = true;

          // Takibi Bırak / Temizle Tıklaması
          btn.click();
          await sleep(150);

          const confirmBtn = Array.from(document.querySelectorAll('div[role="dialog"] button')).find((b) => {
            const txt = (b.innerText || b.textContent || "").trim();
            return txt === "Takibi Bırak" || txt === "Unfollow";
          });

          if (confirmBtn) confirmBtn.click();

          this.cleanedCount++;
          statCl.innerText = this.cleanedCount;

          const wait = randomDelay(minS, maxS);
          logEvent(`@${username || "Hesap"} takipten çıkarıldı (${(wait / 1000).toFixed(1)}s)`, "#34d399");
          await sleep(wait);
        }

        // Ekrandaki kişiler bittiğinde listeyi otomatik kapatıp taze olarak aç
        if (!anyHandled && this.active) {
          logEvent("Ekrandaki hesaplar temizlendi. Taze liste alınıyor...", "#38bdf8");
          await reloadFollowingList();
          await sleep(1000);

          const checkDialog = document.querySelector('div[role="dialog"]');
          const remaining = checkDialog ? Array.from(checkDialog.querySelectorAll("button")).filter((b) => {
            const t = (b.innerText || b.textContent || "").trim();
            return t === "Following" || t === "Takiptesin" || t === "Takip Ediliyor";
          }) : [];

          if (remaining.length === 0) {
            logEvent("🎉 Tebrikler! Takip ettiğiniz tüm hesaplar temizlendi.", "#34d399");
            break;
          }
        }
      }

      this.stop();
    }
  };

  window.__CODUM_CLEANER = cleanerEngine;

  document.getElementById("c-btn-start").onclick = () => cleanerEngine.start();
  document.getElementById("c-btn-stop").onclick = () => cleanerEngine.stop();
  document.getElementById("c-btn-close").onclick = () => {
    cleanerEngine.stop();
    ui.remove();
    styles.remove();
  };
})();
