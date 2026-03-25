export interface Remedy {
  keywords: string[];
  condition: string;
  remedies: string[];
  lifestyle: string[];
  caution?: string;
}

export const remediesDatabase: Remedy[] = [
  {
    keywords: ["headache", "head pain", "migraine", "head ache"],
    condition: "Headache / Migraine",
    remedies: [
      "**Peppermint oil** — Apply diluted to temples and forehead for cooling relief",
      "**Ginger tea** — Brew fresh ginger root; anti-inflammatory properties help reduce pain",
      "**Feverfew** — Take as a supplement to prevent recurring migraines",
      "**Magnesium-rich foods** — Spinach, almonds, avocado to address deficiency-related headaches",
    ],
    lifestyle: ["Stay hydrated (8+ glasses of water daily)", "Practice deep breathing exercises", "Reduce screen time and take breaks every 30 minutes"],
    caution: "Seek medical attention for sudden severe headaches or those accompanied by vision changes.",
  },
  {
    keywords: ["cold", "flu", "cough", "sore throat", "congestion", "runny nose", "sneezing"],
    condition: "Cold & Flu",
    remedies: [
      "**Elderberry syrup** — Powerful antiviral; take at first sign of symptoms",
      "**Honey & lemon** — Soothe sore throat with warm water, honey, and fresh lemon",
      "**Eucalyptus steam** — Inhale steam with eucalyptus oil to clear congestion",
      "**Echinacea tea** — Boost immune response, especially effective early on",
      "**Garlic** — Raw or lightly cooked; natural antimicrobial and immune booster",
    ],
    lifestyle: ["Rest as much as possible", "Drink warm fluids throughout the day", "Use a humidifier to keep airways moist"],
  },
  {
    keywords: ["stress", "anxiety", "nervous", "worried", "tension", "panic", "overwhelmed"],
    condition: "Stress & Anxiety",
    remedies: [
      "**Ashwagandha** — Adaptogenic herb that lowers cortisol levels",
      "**Lavender essential oil** — Diffuse or apply to wrists for calming effect",
      "**Chamomile tea** — Gentle nervine; drink 2-3 cups daily",
      "**Passionflower** — Natural anxiolytic, available as tea or tincture",
      "**Lemon balm** — Calming herb, pairs well with chamomile",
    ],
    lifestyle: ["Practice 10 minutes of daily meditation", "Take nature walks (forest bathing)", "Limit caffeine and sugar intake", "Try journaling before bed"],
  },
  {
    keywords: ["sleep", "insomnia", "can't sleep", "sleepless", "restless"],
    condition: "Sleep Issues / Insomnia",
    remedies: [
      "**Valerian root** — Take 30-60 minutes before bed as tea or capsule",
      "**Magnesium glycinate** — 200-400mg before bed for muscle relaxation",
      "**Tart cherry juice** — Natural source of melatonin",
      "**Lavender pillow spray** — Promotes relaxation at bedtime",
    ],
    lifestyle: ["Maintain consistent sleep/wake times", "Avoid screens 1 hour before bed", "Keep bedroom cool (65-68°F)", "Try a warm Epsom salt bath before bed"],
  },
  {
    keywords: ["digestion", "stomach", "bloating", "gas", "indigestion", "nausea", "gut", "constipation", "diarrhea", "ibs"],
    condition: "Digestive Issues",
    remedies: [
      "**Ginger** — Fresh ginger tea or chew crystallized ginger for nausea",
      "**Peppermint tea** — Relaxes digestive muscles, reduces bloating",
      "**Fennel seeds** — Chew after meals or brew as tea for gas relief",
      "**Aloe vera juice** — Soothes the digestive tract lining",
      "**Probiotics** — Fermented foods like kimchi, sauerkraut, kefir",
    ],
    lifestyle: ["Eat slowly and chew thoroughly", "Avoid eating within 3 hours of bedtime", "Stay hydrated between meals (not during)", "Include fiber-rich foods gradually"],
  },
  {
    keywords: ["skin", "acne", "eczema", "rash", "dry skin", "psoriasis", "pimple"],
    condition: "Skin Conditions",
    remedies: [
      "**Tea tree oil** — Dilute and apply topically for acne (antibacterial)",
      "**Aloe vera gel** — Soothe inflammation and moisturize naturally",
      "**Turmeric paste** — Anti-inflammatory; mix with honey for a face mask",
      "**Calendula cream** — Gentle healing for eczema and irritated skin",
      "**Evening primrose oil** — Take orally for chronic skin conditions",
    ],
    lifestyle: ["Drink adequate water for skin hydration", "Eat omega-3 rich foods (flaxseed, walnuts)", "Avoid harsh chemical cleansers", "Get 15 minutes of morning sunlight"],
  },
  {
    keywords: ["energy", "fatigue", "tired", "exhausted", "low energy", "lethargy"],
    condition: "Low Energy & Fatigue",
    remedies: [
      "**Maca root** — Adaptogen that boosts energy without caffeine jitters",
      "**Green tea** — Balanced energy with L-theanine for focus",
      "**Spirulina** — Nutrient-dense superfood; add to smoothies",
      "**B-vitamin complex** — Especially B12 for energy metabolism",
      "**Iron-rich foods** — Lentils, spinach, dark chocolate (rule out deficiency)",
    ],
    lifestyle: ["Exercise for 20-30 minutes daily", "Prioritize 7-8 hours of sleep", "Eat balanced meals at regular intervals", "Spend time outdoors in natural light"],
  },
  {
    keywords: ["joint", "arthritis", "knee", "back pain", "inflammation", "muscle pain", "body pain"],
    condition: "Joint & Muscle Pain",
    remedies: [
      "**Turmeric (curcumin)** — Potent anti-inflammatory; take with black pepper for absorption",
      "**Boswellia** — Herbal extract that reduces joint inflammation",
      "**Epsom salt soak** — Magnesium absorption through skin eases muscle tension",
      "**Arnica gel** — Apply topically for bruises and muscle soreness",
      "**Omega-3 fatty acids** — Fish oil or flaxseed oil daily",
    ],
    lifestyle: ["Gentle stretching or yoga daily", "Maintain healthy body weight", "Apply heat for stiffness, cold for acute pain", "Anti-inflammatory diet (reduce processed foods)"],
  },
  {
    keywords: ["immunity", "immune", "sick often", "weak immune", "prevention", "health boost"],
    condition: "Immune Support",
    remedies: [
      "**Vitamin C** — Citrus, bell peppers, or supplement (1000mg daily)",
      "**Zinc** — Pumpkin seeds, legumes, or supplement for immune cell function",
      "**Medicinal mushrooms** — Reishi, chaga, lion's mane for immune modulation",
      "**Astragalus** — Traditional immune-strengthening herb",
      "**Raw honey** — Antimicrobial and soothing; add to warm beverages",
    ],
    lifestyle: ["Get 7-9 hours of quality sleep", "Manage stress levels actively", "Exercise moderately and regularly", "Eat a rainbow of fruits and vegetables"],
  },
  {
    keywords: ["weight", "obesity", "overweight", "weight loss", "metabolism", "fat"],
    condition: "Weight Management",
    remedies: [
      "**Green tea extract** — Boosts metabolism naturally",
      "**Apple cider vinegar** — 1 tbsp in water before meals aids digestion",
      "**Cinnamon** — Helps regulate blood sugar levels",
      "**Garcinia cambogia** — May reduce appetite (use with caution)",
      "**Fiber supplements** — Psyllium husk for satiety",
    ],
    lifestyle: ["Practice mindful eating", "Move your body for 30+ minutes daily", "Prioritize whole, unprocessed foods", "Stay hydrated — thirst is often mistaken for hunger"],
    caution: "Consult a healthcare provider before starting any weight management regimen.",
  },
];

export function findRemedies(query: string): Remedy | null {
  const lower = query.toLowerCase();
  return remediesDatabase.find((r) => r.keywords.some((k) => lower.includes(k))) || null;
}

export function generateResponse(query: string): string {
  const remedy = findRemedies(query);

  if (!remedy) {
    return `I appreciate your question! While I don't have a specific remedy for that in my current knowledge base, here are some **general naturopathy principles** that may help:

- 🌿 **Eat whole, unprocessed foods** rich in nutrients
- 💧 **Stay well-hydrated** with clean water and herbal teas
- 🧘 **Manage stress** through meditation, yoga, or deep breathing
- 😴 **Prioritize quality sleep** (7-9 hours)
- 🌞 **Get natural sunlight** and fresh air daily

Could you describe your symptoms in more detail? I can help with conditions like headaches, colds, stress, sleep issues, digestion, skin problems, joint pain, and more.`;
  }

  let response = `## 🌿 Natural Remedies for ${remedy.condition}\n\n`;
  response += `### Recommended Remedies\n`;
  remedy.remedies.forEach((r) => {
    response += `- ${r}\n`;
  });
  response += `\n### Lifestyle Tips\n`;
  remedy.lifestyle.forEach((l) => {
    response += `- ${l}\n`;
  });
  if (remedy.caution) {
    response += `\n> ⚠️ **Caution:** ${remedy.caution}`;
  }
  response += `\n\n---\n*This is general naturopathic guidance. Always consult a qualified healthcare practitioner for persistent or serious conditions.*`;
  return response;
}

export const suggestedQuestions = [
  "I have a headache",
  "Help with stress & anxiety",
  "Natural sleep remedies",
  "Boost my immunity",
  "Digestive issues",
  "Skin care tips",
];
