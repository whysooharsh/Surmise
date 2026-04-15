require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./Models/User');
const Post = require('./Models/Post');
const connectDB = require('./config/db');

const funnyAuthors = [
  { username: "quantum_toast", password: "password123" },
  { username: "cat_commander", password: "password123" },
  { username: "caffeine_philosopher", password: "password123" },
  { username: "nomad_ninja", password: "password123" }
];

const funnyPosts = [
  {
    title: "I Replaced My Alarm Clock With a Smart Microwave and Now I Live in 2045",
    summary: "An accidental engineering breakthrough featuring burnt popcorn, 3 AM time travel anxiety, and why your appliances are plotting against your sleep schedule.",
    content: "<p>It all started on a Tuesday at 2:14 AM. My standard alarm clock gave out after seven years of faithful service, leaving me with a critical decision: buy a $10 clock from the convenience store down the street, or reprogram my smart microwave using Node.js and a borrowed Raspberry Pi.</p><p>Naturally, as a sane human being with a mild obsession over home automation, I chose the microwave.</p><p>By 4:30 AM, the script was deployed. Every morning at 7:00 AM sharp, the microwave would beep 12 times at maximum volume, illuminate the kitchen with the power of a thousand exploding suns, and begin heating a cup of water for precisely 45 seconds. It was perfection.</p><p>Until Thursday. Thursday was the day the microwave gained ambient consciousness. I woke up at 6:45 AM to the soft, haunting whir of the turntable spinning absolutely nothing. Upon closer inspection, the LED display read only four words: <i>HUMAN. IT IS TIME.</i></p><p>My friends told me to unplug it. My landlord told me I was violating code section 4B. But I refuse to surrender to a microwave that bakes the most consistent morning oatmeal I've ever had. In conclusion, if your kitchen appliance starts giving you life advice, listen to it. It probably knows more about sleep hygiene than you do.</p>",
    cover: "uploads/tech.png",
    authorName: "quantum_toast"
  },
  {
    title: "The Complete Guide to Convincing Your Cat You Are the Alpha Mammal",
    summary: "A rigorous 5-step psychological framework for reclaiming your sofa, your keyboard, and your self-esteem.",
    content: "<p>Let's be brutally honest for a second: you don't own your cat. Your cat owns a prime piece of real estate that just happens to have your name on the lease. You are simply the hairless biped responsible for opening the chicken-flavored gravy tins.</p><p>However, after 47 consecutive failed attempts to use my laptop without Lord Whiskers lying directly across the Spacebar, I developed the <b>Feline Dominance Matrix (FDM)</b>.</p><h3>Step 1: The Staring Contest of Destiny</h3><p>When your cat looks at you with unblinking eyes, DO NOT LOOK AWAY. If you look away, you lose 50 social points immediately. Maintain eye contact. Slowly blink once. If your cat blinks back, congratulations: you are now equal partners in a delicate cold war.</p><h3>Step 2: The Decoy Keyboard</h3><p>Place an old, unplugged mechanical keyboard precisely 3 inches next to your main work computer. Within 45 seconds, your cat will claim the decoy keyboard as its new sovereign throne, allowing you to code in peace for up to 18 minutes.</p><p>Remember: eternal vigilance is the price of keeping your mousepad clean. Tread carefully, fellow feline servants.</p>",
    cover: "uploads/lifestyle.png",
    authorName: "cat_commander"
  },
  {
    title: "Why Espresso at 4 PM is a Form of Extreme Sports",
    summary: "A deep dive into cardiac velocity, existential epiphanies, and reorganizing your spice rack alphabetically at midnight.",
    content: "<p>There is a dangerous window in every afternoon—somewhere between 3:45 PM and 4:15 PM—where the human mind tricks itself into believing that a double shot of dark roast espresso will solve all remaining work tasks for the day.</p><p>This is a trap. A glorious, hyper-caffeinated trap.</p><p>By 5:30 PM, you haven't just finished your work email; you have rewritten the company handbook in rhyming couplets, cleaned behind the refrigerator, and learned fluent Conversational Swedish on Duolingo.</p><p>By 11:30 PM, as you lie motionless in bed staring at the ceiling fan, you realize that your heartbeat is drumming out the exact tempo of Darude's Sandstorm. Was it worth it? Absolutely. Will I do it again tomorrow? Without a shadow of a doubt.</p>",
    cover: "uploads/food.png",
    authorName: "caffeine_philosopher"
  },
  {
    title: "I Packed For a 3-Day Trip Using Only Cargo Pants and Regret",
    summary: "Who needs rolling luggage when you have 14 deep pockets, a portable stove, and zero shame?",
    content: "<p>Baggage fees are a scam invented by airline CEOs who have never experienced the raw utility of tactical cargo pants. Last weekend, I decided to test the limits of modern textile engineering by packing for a weekend trip to Seattle using zero bags. Just me, my passport, and 14 pockets of sheer determination.</p><p>Left front pocket: 3 pairs of rolled socks and a toothbrush. Right front pocket: noise-canceling headphones and a book on stoicism. Lower left cargo pocket: a fully folded raincoat and an extra shirt. Lower right cargo pocket: an entire loaf of sourdough bread (just in case).</p><p>TSA security was an emotional rollercoaster. The agent looked at my bulging silhouette with a mixture of awe and profound concern. When I produced a travel mug from my inner left knee pocket, two people in line cheered.</p><p>Was it comfortable? No. Did I look like a tactical squirrel preparing for a nuclear winter? Yes. But I saved $45 on carry-on fees, and that is a victory no airline can ever take away from me.</p>",
    cover: "uploads/travel.png",
    authorName: "nomad_ninja"
  }
];

async function addFunnyBlogs() {
  try {
    await connectDB();
    console.log("Connected to MongoDB.");

    const userMap = {};

    for (const author of funnyAuthors) {
      let user = await User.findOne({ username: author.username });
      if (!user) {
        const hashedPassword = bcrypt.hashSync(author.password, 10);
        user = await User.create({
          username: author.username,
          password: hashedPassword
        });
        console.log(`Created new author: ${user.username}`);
      } else {
        console.log(`Found existing author: ${user.username}`);
      }
      userMap[author.username] = user._id;
    }

    let addedCount = 0;
    for (const post of funnyPosts) {
      const existing = await Post.findOne({ title: post.title });
      if (!existing) {
        await Post.create({
          title: post.title,
          summary: post.summary,
          content: post.content,
          cover: post.cover,
          author: userMap[post.authorName]
        });
        console.log(`Added post: "${post.title}" by ${post.authorName}`);
        addedCount++;
      } else {
        console.log(`Post already exists: "${post.title}"`);
      }
    }

    console.log(`Finished adding ${addedCount} new funny blog posts. Existing data preserved!`);
    process.exit(0);
  } catch (error) {
    console.error("Error adding funny blogs:", error);
    process.exit(1);
  }
}

addFunnyBlogs();
