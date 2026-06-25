// === menu.js — POPKID Auto-Menu ===
// Scans all command files at runtime and builds a clean categorised menu.
// No hardcoding — add a new command file and it auto-appears here.

const fs   = require('fs');
const path = require('path');

// ─── category display config ────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  fun:        { icon: '🎮', label: 'FUN & GAMES'   },
  group:      { icon: '👥', label: 'GROUP TOOLS'   },
  utility:    { icon: '⚙️',  label: 'UTILITY'       },
  downloader: { icon: '⬇️',  label: 'DOWNLOADERS'  },
  sticker:    { icon: '🎭', label: 'STICKERS'      },
  search:     { icon: '🔍', label: 'SEARCH'        },
  music:      { icon: '🎵', label: 'MUSIC'         },
  tools:      { icon: '🛠️',  label: 'TOOLS'        },
  convert:    { icon: '🔄', label: 'CONVERT'       },
  settings:   { icon: '🔧', label: 'SETTINGS'      },
  other:      { icon: '📦', label: 'OTHER'         },
  general:    { icon: '📌', label: 'GENERAL'       },
};

// Preferred display order
const CATEGORY_ORDER = [
  'fun', 'group', 'utility', 'downloader', 'sticker',
  'music', 'search', 'tools', 'convert', 'settings', 'other', 'general'
];

// ─── helper: load every command from the commands folder ────────────────────
function scanCommands(commandsDir) {
  const grouped = {}; // { category -> [{ pattern, desc }] }
  let total = 0;

  const files = fs.readdirSync(commandsDir).filter(
    f => f.endsWith('.js') && !f.startsWith('.') && f !== 'menu.js'
  );

  for (const file of files) {
    try {
      const filePath = path.join(commandsDir, file);

      // Bust require cache so we always get fresh data
      if (require.cache[require.resolve(filePath)]) {
        delete require.cache[require.resolve(filePath)];
      }

      const mod = require(filePath);

      // Collect command entries (single export OR named-export object)
      const entries = [];

      if (mod.pattern && mod.execute) {
        entries.push(mod);
      } else if (typeof mod === 'object') {
        for (const val of Object.values(mod)) {
          if (val && val.pattern && val.execute) entries.push(val);
        }
      }

      // Special case: runtime module exports getRuntimeCommand()
      if (typeof mod.getRuntimeCommand === 'function') {
        try { entries.push(mod.getRuntimeCommand()); } catch (_) {}
      }

      for (const cmd of entries) {
        const cat = (cmd.category || (cmd.tags && cmd.tags[0]) || 'general')
          .toLowerCase().trim();

        if (!grouped[cat]) grouped[cat] = [];

        // Avoid duplicates (aliases push same pattern multiple times)
        const already = grouped[cat].some(c => c.pattern === cmd.pattern);
        if (!already) {
          grouped[cat].push({
            pattern: cmd.pattern,
            desc:    cmd.desc || '',
          });
          total++;
        }
      }
    } catch (err) {
      console.error(`[menu] Error scanning ${file}:`, err.message);
    }
  }

  return { grouped, total };
}

// ─── builder: turn grouped map into a WhatsApp-formatted string ─────────────
function buildMenuText(grouped, total, prefix, botName, ownerName) {
  const now     = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  let text = '';
  text += `╔═══════════════════════╗\n`;
  text += `║   🚀  *${botName}*  🚀   ║\n`;
  text += `╚═══════════════════════╝\n\n`;
  text += `👤 *Owner* : ${ownerName}\n`;
  text += `📌 *Prefix* : \`${prefix}\`\n`;
  text += `🕐 *Time*  : ${timeStr}  •  ${dateStr}\n`;
  text += `⚡ *Commands* : ${total} loaded\n`;
  text += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`;

  // Sort categories by preferred order, then alphabetically for any unknowns
  const cats = Object.keys(grouped).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  for (const cat of cats) {
    const cfg   = CATEGORY_CONFIG[cat] || { icon: '📂', label: cat.toUpperCase() };
    const cmds  = grouped[cat];

    text += `\n${cfg.icon} *${cfg.label}*\n`;

    for (const cmd of cmds) {
      const descPart = cmd.desc ? ` — _${cmd.desc}_` : '';
      text += `  ❯ \`${prefix}${cmd.pattern}\`${descPart}\n`;
    }
  }

  text += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💡 _Type any command to get started!_\n`;
  text += `🔗 *Powered by POPKID TECH*`;

  return text;
}

// ─── command export ──────────────────────────────────────────────────────────
module.exports = {
  pattern:  'menu',
  desc:     'Show all available bot commands',
  category: 'utility',
  tags:     ['utility'],
  react:    '📋',
  filename: __filename,
  use:      '.menu',

  execute: async (conn, message, m, { from, reply }) => {
    try {
      // React immediately so the user knows it's working
      await conn.sendMessage(from, {
        react: { text: '📋', key: message.key }
      });

      // Pull bot config from server env / fallback gracefully
      const botName   = process.env.BOT_NAME   || 'POPKID BOT';
      const ownerName = process.env.OWNER_NAME  || 'POPKID';
      const prefix    = process.env.PREFIX       || '.';
      const menuImg   = process.env.MENU_IMAGE_URL || 'https://up6.cc/2026/04/177631893622821.jpg';

      // Scan commands directory
      const commandsDir = path.join(__dirname);
      const { grouped, total } = scanCommands(commandsDir);

      // Also inject the built-in commands that live in server.js
      const builtIns = [
        { pattern: 'ping',   desc: 'Check bot speed & response time', category: 'utility' },
        { pattern: 'prefix', desc: 'Show current command prefix',      category: 'settings' },
      ];
      for (const b of builtIns) {
        if (!grouped[b.category]) grouped[b.category] = [];
        const exists = grouped[b.category].some(c => c.pattern === b.pattern);
        if (!exists) {
          grouped[b.category].push({ pattern: b.pattern, desc: b.desc });
          // total is already counted — but add 1 for display
        }
      }
      const displayTotal = total + builtIns.length;

      const menuText = buildMenuText(grouped, displayTotal, prefix, botName, ownerName);

      // Send with external ad reply card (same style as the rest of the bot)
      await conn.sendMessage(from, {
        text: menuText,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid:     '120363423997837331@newsletter',
            newsletterName:    'popkid',
            serverMessageId:   200,
          },
          externalAdReply: {
            title:                `📋 ${botName} — Command Menu`,
            body:                 `${displayTotal} commands loaded • Powered by POPKID`,
            thumbnailUrl:         menuImg,
            mediaType:            1,
            renderLargerThumbnail: true,
          },
        },
      }, { quoted: message });

    } catch (err) {
      console.error('[menu] Error generating menu:', err);
      reply('⚠️ Could not generate menu. Please try again.');
    }
  },
};
