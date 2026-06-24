require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./Models/User');
const Post = require('./Models/Post');
const connectDB = require('./config/db');

const dummyPosts = [
  {
    title: "The Future of AI Coding Assistants",
    summary: "How autonomous agents and compiler-integrated LLMs are shifting the software engineering landscape.",
    content: "<p>Artificial Intelligence is no longer just autocomplete. Modern coding agents can read whole codebases, generate plans, write multi-file features, and self-correct compilation errors before submitting their work.</p><p>As developer productivity scales, the engineer's role transitions from writing raw boilerplate to design-level oversight, testing, and security assurance. Here's what to expect in the next generation of AI coding tools.</p>",
    cover: "uploads/tech.png"
  },
  {
    title: "Mastering CSS Layouts: Grid vs Flexbox",
    summary: "A practical guide to choosing the right layout engine for fluid, high-performance interfaces.",
    content: "<p>Choosing between Grid and Flexbox is one of the most common layout dilemmas. Flexbox is content-out (one-dimensional, dealing with rows OR columns), whereas Grid is layout-in (two-dimensional, defining both simultaneously).</p><p>By combining them—using Grid for outer page shells and Flexbox for inner components like nav links or badges—we can build layouts that scale smoothly to 120 FPS on all display form factors.</p>",
    cover: "uploads/tech.png"
  },
  {
    title: "Morning Rituals for a Calm Mind",
    summary: "Simple, screen-free morning routines to build focus and start your day with intentionality.",
    content: "<p>How you spend the first hour of your day sets the tone for the rest of it. Scrolling through news or emails immediately prompts a reactive state of mind.</p><p>By replacing screen time with a warm cup of coffee, simple breathing exercises, or writing in a journal, you ground your attention and build a reservoir of calmness that keeps you productive throughout the day.</p>",
    cover: "uploads/lifestyle.png"
  },
  {
    title: "The Simple Art of Slow Living",
    summary: "Practical advice on slowing down, minimizing digital distraction, and reclaiming your attention.",
    content: "<p>Slow living is not about doing everything at a snail's pace; it's about doing things at the right pace. It's an invitation to focus on what truly matters and let go of the artificial rush of modern notifications.</p><p>Reclaim your attention by scheduling screen-free blocks, taking walks without headphones, and spending quiet moments in reflection.</p>",
    cover: "uploads/lifestyle.png"
  },
  {
    title: "Exploring Hidden Valleys in Summer",
    summary: "Discovering lesser-known alpine trails, green meadows, and winding paths off the tourist grid.",
    content: "<p>There is something magical about walking trails where you don't meet another soul. Hidden alpine valleys offer pristine meadows, clear cold streams, and majestic heights without the crowd.</p><p>Pack light, bring a map, and tread lightly on these trails to experience nature in its truest, most untouched form.</p>",
    cover: "uploads/travel.png"
  },
  {
    title: "The Ultimate Guide to Minimalist Traveling",
    summary: "How to travel light, reduce baggage anxiety, and focus on the experience rather than the luggage.",
    content: "<p>Traveling with only a single carry-on backpack changes how you move. You bypass baggage claim lines, walk easily through train stations, and focus on the journey rather than managing items.</p><p>We break down essential packing lists, lightweight materials, and packing cell strategies that make one-bag travel comfortable for trips of any duration.</p>",
    cover: "uploads/travel.png"
  },
  {
    title: "The Perfect Sourdough Bread Recipe",
    summary: "Step-by-step guidance on starters, fermentation, shaping, and baking a crunchy golden loaf.",
    content: "<p>Baking sourdough is a sensory ritual. It requires patience, a feel for the dough, and an understanding of wild yeasts.</p><p>We cover starter maintenance, autolyse, stretch-and-folds, bulk fermentation, and how to steam your home oven to achieve a thick, crunchy crust and open, tender crumb.</p>",
    cover: "uploads/food.png"
  },
  {
    title: "Cozy Warm Soups for Rainy Evenings",
    summary: "A round-up of thick, nutrient-dense soups that are easy to prepare and deeply satisfying.",
    content: "<p>Nothing beats a hot bowl of soup on a rainy night. From creamy roasted butternut squash to rich lentil and vegetable broths, we share recipes that are comfort in a bowl.</p><p>Learn how to toast your spices beforehand, deglaze your pans, and simmer stock to draw out maximum flavor.</p>",
    cover: "uploads/food.png"
  },
  {
    title: "Finding Inspiration in Everyday Objects",
    summary: "How to train your artistic eye to notice light, shadows, and textures in the ordinary.",
    content: "<p>Inspiration doesn't require grand journeys. An artist's eye can find beauty in the way morning sun hits a coffee cup, the texture of old wood tables, or the color combinations of wildflowers.</p><p>We outline daily sketching exercises that help you capture light and shadow values in simple household scenes.</p>",
    cover: "uploads/art.png"
  },
  {
    title: "Color Theory for Beginners",
    summary: "Understanding primary relations, complementary harmonies, and psychological color choices in art.",
    content: "<p>Color has the power to convey mood instantly. Understanding the relationships between hues on the color wheel helps you select combinations that feel harmonious and deliberate.</p><p>We cover warm vs cool balances, monochromatic palettes, and how to mix saturated shades with neutrals to create depth in your drawings.</p>",
    cover: "uploads/art.png"
  }
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB.");

    let user = await User.findOne();
    if (!user) {
      console.log("No users found. Creating a dummy author...");
      user = await User.create({
        username: "editor",
        password: "password123"
      });
      console.log(`Dummy author created: ${user.username}`);
    } else {
      console.log(`Using existing user: ${user.username}`);
    }

    console.log("Clearing existing posts...");
    await Post.deleteMany({});

    console.log("Seeding dummy posts...");
    const postsWithAuthor = dummyPosts.map(p => ({
      ...p,
      author: user._id
    }));

    await Post.insertMany(postsWithAuthor);
    console.log("Successfully seeded 10 dummy blog posts!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
