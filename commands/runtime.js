// === runtime.js ===
const startTime = Date.now();

function getUptime() {
  const uptime = Date.now() - startTime;
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, totalMs: uptime };
}

function getRuntimeCommand() {
  return {
    pattern: "runtime",
    tags: ["utility"],
    desc: "Show bot uptime",
    react: "\u23F1\uFE0F",
    filename: __filename,
    use: ".runtime",
    execute: async (conn, message, args, { from, reply }) => {
      try {
        const uptime = getUptime();
        const runtimeText = `\u23F1\uFE0F *POPKID Runtime Info*

\u2022 Uptime: *${uptime.days}d ${uptime.hours}h ${uptime.minutes}m ${uptime.seconds}s*
\u2022 Started: ${new Date(startTime).toLocaleString()}
\u2022 Total: ${uptime.totalMs.toLocaleString()} ms

\u26A1 Powered by POPKID`;

        await conn.sendMessage(from, {
          react: { text: "\u23F1\uFE0F", key: message.key }
        });

        const isNewsletter = from.endsWith('@newsletter');

        if (isNewsletter) {
          await conn.sendMessage(from, {
            text: runtimeText,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363423997837331@newsletter",
                newsletterName: "popkid",
                serverMessageId: 147
              }
            }
          }, { quoted: message });
        } else {
          await conn.sendMessage(from, {
            text: runtimeText,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363423997837331@newsletter",
                newsletterName: "popkid",
                serverMessageId: 147
              },
              externalAdReply: {
                title: "POPKID - Runtime Info",
                body: "POPKID Bot uptime information",
                thumbnailUrl: "https://files.catbox.moe/6dhr11.jpg",
                sourceUrl: "https://github.com/popkid",
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: message });
        }
      } catch (e) {
        console.error("Runtime error:", e);
        await conn.sendMessage(from, {
          react: { text: "\u274C", key: message.key }
        });
        reply("\u26A0\uFE0F Failed to fetch runtime info.");
      }
    }
  };
}

module.exports = {
  getUptime,
  getRuntimeCommand
};
