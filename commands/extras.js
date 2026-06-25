// === extras.js — POPKID extra commands ===

// ── .quote ──────────────────────────────────────────────────────────────────
const quoteCmd = {
  pattern: "quote",
  desc: "Get a random motivational quote",
  category: "fun",
  react: "💬",
  tags: ["fun"],
  filename: __filename,
  use: ".quote",
  execute: async (conn, message, m, { from, reply }) => {
    const quotes = [
      ["The secret of getting ahead is getting started.", "Mark Twain"],
      ["It always seems impossible until it's done.", "Nelson Mandela"],
      ["In the middle of every difficulty lies opportunity.", "Albert Einstein"],
      ["Success is not final, failure is not fatal.", "Winston Churchill"],
      ["Believe you can and you're halfway there.", "Theodore Roosevelt"],
      ["Your limitation—it's only your imagination.", "Unknown"],
      ["Push yourself, because no one else is going to do it for you.", "Unknown"],
      ["Dream it. Wish it. Do it.", "Unknown"],
      ["Great things never come from comfort zones.", "Unknown"],
      ["Don't stop when you're tired. Stop when you're done.", "Unknown"],
      ["Wake up with determination. Go to bed with satisfaction.", "Unknown"],
      ["Do something today that your future self will thank you for.", "Unknown"],
      ["The harder you work for something, the greater you'll feel when you achieve it.", "Unknown"],
      ["Dream bigger. Do bigger.", "Unknown"],
      ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    ];
    await conn.sendMessage(from, { react: { text: "💬", key: message.key } });
    const [q, author] = quotes[Math.floor(Math.random() * quotes.length)];
    await conn.sendMessage(from, {
      text: `💬 *Quote of the Moment*\n\n_"${q}"_\n\n— *${author}*\n\n⚡ Powered by POPKID`
    }, { quoted: message });
  }
};

// ── .joke ────────────────────────────────────────────────────────────────────
const jokeCmd = {
  pattern: "joke",
  desc: "Get a random joke",
  category: "fun",
  react: "😂",
  tags: ["fun"],
  filename: __filename,
  use: ".joke",
  execute: async (conn, message, m, { from, reply }) => {
    const jokes = [
      ["Why don't scientists trust atoms?", "Because they make up everything! 😂"],
      ["Why did the scarecrow win an award?", "Because he was outstanding in his field! 🌾"],
      ["I told my wife she was drawing her eyebrows too high.", "She looked surprised. 😂"],
      ["Why can't you give Elsa a balloon?", "Because she'll let it go! 🎈"],
      ["What do you call a fake noodle?", "An impasta! 🍝"],
      ["Why did the bicycle fall over?", "Because it was two-tired! 🚲"],
      ["What do you call cheese that isn't yours?", "Nacho cheese! 🧀"],
      ["Why did the math book look so sad?", "Because it had too many problems! 📚"],
      ["What do you call a sleeping dinosaur?", "A dino-snore! 🦕"],
      ["Why don't eggs tell jokes?", "They'd crack each other up! 🥚"],
      ["What do you call a fish without eyes?", "A fsh! 🐟"],
      ["Why did the golfer bring extra socks?", "In case he got a hole in one! ⛳"],
      ["What's orange and sounds like a parrot?", "A carrot! 🥕"],
      ["I'm reading a book about anti-gravity.", "It's impossible to put down! 📖"],
      ["Why did the computer go to the doctor?", "Because it had a virus! 💻"],
    ];
    await conn.sendMessage(from, { react: { text: "😂", key: message.key } });
    const [setup, punchline] = jokes[Math.floor(Math.random() * jokes.length)];
    await conn.sendMessage(from, {
      text: `😂 *POPKID Joke Time*\n\n❓ ${setup}\n\n💥 ${punchline}`
    }, { quoted: message });
  }
};

// ── .fact ────────────────────────────────────────────────────────────────────
const factCmd = {
  pattern: "fact",
  desc: "Get a random fun fact",
  category: "fun",
  react: "🧠",
  tags: ["fun"],
  filename: __filename,
  use: ".fact",
  execute: async (conn, message, m, { from, reply }) => {
    const facts = [
      "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs. 🍯",
      "A day on Venus is longer than a year on Venus. ☁️",
      "Octopuses have three hearts, blue blood, and nine brains. 🐙",
      "The Eiffel Tower grows about 6 inches taller in summer due to heat expansion. 🗼",
      "Bananas are berries, but strawberries are not. 🍌",
      "A group of flamingos is called a 'flamboyance'. 🦩",
      "Cows have best friends and get stressed when separated. 🐄",
      "The human nose can detect over 1 trillion different scents. 👃",
      "Sharks are older than trees — they've been around for 400 million years. 🦈",
      "The word 'set' has the most definitions in the English dictionary. 📖",
      "A bolt of lightning is five times hotter than the sun's surface. ⚡",
      "There are more possible chess game combinations than atoms in the universe. ♟️",
      "Cleopatra lived closer in time to the Moon landing than to the Great Pyramid's construction. 🏛️",
      "The first computer bug was an actual bug — a moth found in a relay in 1947. 🦗",
      "You can hear a blue whale's heartbeat from 2 miles away. 🐋",
    ];
    await conn.sendMessage(from, { react: { text: "🧠", key: message.key } });
    const fact = facts[Math.floor(Math.random() * facts.length)];
    await conn.sendMessage(from, {
      text: `🧠 *Random Fact*\n\n💡 ${fact}\n\n⚡ Powered by POPKID`
    }, { quoted: message });
  }
};

// ── .coinflip ────────────────────────────────────────────────────────────────
const coinflipCmd = {
  pattern: "coinflip",
  desc: "Flip a coin — heads or tails",
  category: "fun",
  react: "🪙",
  tags: ["fun"],
  filename: __filename,
  use: ".coinflip",
  execute: async (conn, message, m, { from, reply }) => {
    await conn.sendMessage(from, { react: { text: "🪙", key: message.key } });
    const result = Math.random() < 0.5 ? "🟡 *HEADS*" : "⚪ *TAILS*";
    await conn.sendMessage(from, {
      text: `🪙 *Coin Flip*\n\nThe coin landed on...\n\n${result}!\n\n⚡ POPKID`
    }, { quoted: message });
  }
};

// ── .dice ────────────────────────────────────────────────────────────────────
const diceCmd = {
  pattern: "dice",
  desc: "Roll a dice (default 6-sided, or specify sides)",
  category: "fun",
  react: "🎲",
  tags: ["fun"],
  filename: __filename,
  use: ".dice [sides]",
  execute: async (conn, message, m, { from, args, reply }) => {
    await conn.sendMessage(from, { react: { text: "🎲", key: message.key } });
    let sides = parseInt(args[0]) || 6;
    if (sides < 2 || sides > 100) sides = 6;
    const roll = Math.floor(Math.random() * sides) + 1;
    await conn.sendMessage(from, {
      text: `🎲 *Dice Roll* (d${sides})\n\nYou rolled... *${roll}*!\n\n⚡ POPKID`
    }, { quoted: message });
  }
};

// ── .wyr ─────────────────────────────────────────────────────────────────────
const wyrCmd = {
  pattern: "wyr",
  desc: "Would you rather — random dilemma",
  category: "fun",
  react: "🤔",
  tags: ["fun"],
  filename: __filename,
  use: ".wyr",
  execute: async (conn, message, m, { from, reply }) => {
    const questions = [
      ["Have the ability to fly", "Be invisible"],
      ["Be able to speak all languages", "Be able to talk to animals"],
      ["Always be 10 minutes late", "Always be 20 minutes early"],
      ["Live without music", "Live without TV"],
      ["Have unlimited money", "Have unlimited knowledge"],
      ["Fight 100 duck-sized horses", "Fight 1 horse-sized duck"],
      ["Only eat sweet food forever", "Only eat salty food forever"],
      ["Never use social media again", "Never watch movies/shows again"],
      ["Be famous but hated", "Unknown but loved"],
      ["Have super strength", "Have super speed"],
      ["Always be cold", "Always be hot"],
      ["Lose all your memories", "Never make new memories"],
      ["Live on the moon", "Live under the sea"],
    ];
    await conn.sendMessage(from, { react: { text: "🤔", key: message.key } });
    const [a, b] = questions[Math.floor(Math.random() * questions.length)];
    await conn.sendMessage(from, {
      text: `🤔 *Would You Rather...*\n\n🅰️ *${a}*\n\n           — OR —\n\n🅱️ *${b}*\n\nReply A or B! ⚡ POPKID`
    }, { quoted: message });
  }
};

// ── .advice ──────────────────────────────────────────────────────────────────
const adviceCmd = {
  pattern: "advice",
  desc: "Get a random piece of life advice",
  category: "fun",
  react: "🌟",
  tags: ["fun"],
  filename: __filename,
  use: ".advice",
  execute: async (conn, message, m, { from, reply }) => {
    const advices = [
      "Don't compare your chapter 1 to someone else's chapter 20.",
      "Take care of your body. It's the only place you have to live.",
      "Be the energy you want to attract.",
      "Surround yourself with people who make you hungry for life.",
      "Stop waiting for Friday. Find meaning in the Monday.",
      "Your future self is watching you right now through your memories.",
      "Never make a permanent decision based on temporary emotion.",
      "Work hard in silence, let your success be the noise.",
      "Be yourself — everyone else is already taken.",
      "It's okay to not have it all figured out yet.",
      "Rest if you must, but don't quit.",
      "Invest in yourself. It pays the best interest.",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "You don't need to be perfect to be amazing.",
      "Sometimes the smallest step in the right direction is the biggest step of your life.",
    ];
    await conn.sendMessage(from, { react: { text: "🌟", key: message.key } });
    const advice = advices[Math.floor(Math.random() * advices.length)];
    await conn.sendMessage(from, {
      text: `🌟 *POPKID Advice*\n\n💡 _"${advice}"_\n\n⚡ Stay winning!`
    }, { quoted: message });
  }
};

// ── .calc ─────────────────────────────────────────────────────────────────────
const calcCmd = {
  pattern: "calc",
  desc: "Simple calculator",
  category: "utility",
  react: "🧮",
  tags: ["utility"],
  filename: __filename,
  use: ".calc <expression>  e.g. .calc 5 * 8 + 2",
  execute: async (conn, message, m, { from, args, q, reply }) => {
    if (!q) return reply("❌ Provide a math expression.\n\n*Example:* .calc 5 * 8 + 2");
    try {
      // Safe eval — only allow math chars
      const safe = q.replace(/[^0-9+\-*/.() %]/g, "");
      if (!safe) return reply("❌ Invalid expression.");
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${safe})`)();
      if (isNaN(result) || !isFinite(result)) return reply("❌ Math error — check your expression.");
      await conn.sendMessage(from, { react: { text: "🧮", key: message.key } });
      await conn.sendMessage(from, {
        text: `🧮 *Calculator*\n\n📥 *Input:* \`${safe}\`\n📤 *Result:* *${result}*\n\n⚡ POPKID`
      }, { quoted: message });
    } catch (e) {
      reply("❌ Invalid expression. Please check and try again.");
    }
  }
};

// ── .toss ─────────────────────────────────────────────────────────────────────
const tossCmd = {
  pattern: "toss",
  desc: "Pick a random user from the group",
  category: "fun",
  react: "🎯",
  tags: ["fun"],
  filename: __filename,
  use: ".toss",
  execute: async (conn, message, m, { from, isGroup, reply, groupMetadata }) => {
    if (!isGroup) return reply("❌ This command can only be used in groups.");
    if (!groupMetadata) return reply("❌ Could not fetch group info.");
    const participants = groupMetadata.participants.map(p => p.id);
    if (participants.length < 2) return reply("❌ Not enough members in the group.");
    const picked = participants[Math.floor(Math.random() * participants.length)];
    await conn.sendMessage(from, { react: { text: "🎯", key: message.key } });
    await conn.sendMessage(from, {
      text: `🎯 *Random Pick!*\n\n🎉 @${picked.split("@")[0]} has been chosen!\n\n⚡ POPKID`,
      mentions: [picked]
    }, { quoted: message });
  }
};

// ── .number ──────────────────────────────────────────────────────────────────
const numberCmd = {
  pattern: "number",
  desc: "Generate a random number in a range",
  category: "utility",
  react: "🔢",
  tags: ["utility"],
  filename: __filename,
  use: ".number <min> <max>  e.g. .number 1 100",
  execute: async (conn, message, m, { from, args, reply }) => {
    const min = parseInt(args[0]);
    const max = parseInt(args[1]);
    if (isNaN(min) || isNaN(max) || min >= max) {
      return reply("❌ Usage: `.number <min> <max>`\nExample: `.number 1 100`");
    }
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    await conn.sendMessage(from, { react: { text: "🔢", key: message.key } });
    await conn.sendMessage(from, {
      text: `🔢 *Random Number*\n\n📊 Range: ${min} – ${max}\n🎯 Result: *${result}*\n\n⚡ POPKID`
    }, { quoted: message });
  }
};

module.exports = {
  quote: quoteCmd,
  joke: jokeCmd,
  fact: factCmd,
  coinflip: coinflipCmd,
  dice: diceCmd,
  wyr: wyrCmd,
  advice: adviceCmd,
  calc: calcCmd,
  toss: tossCmd,
  number: numberCmd,
};
