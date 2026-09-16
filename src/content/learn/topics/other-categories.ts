import type {LearnTopic} from '../types';

/**
 * Starter topics for the remaining six categories (2–3 each).
 * Deliberately brief placeholders demonstrating the architecture;
 * all marked `draft`.
 */
export const otherTopics: LearnTopic[] = [
  // ---- Philosophy ----
  {
    slug: 'six-schools',
    category: 'philosophy',
    title: {en: 'Six Schools of Thought', hi: 'षड्दर्शन'},
    summary: {
      en: 'An orientation to Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa and Vedanta.',
      hi: 'न्याय, वैशेषिक, सांख्य, योग, मीमांसा और वेदांत का परिचय।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Hindu philosophy is traditionally grouped into six orthodox schools (shad-darshana) that accept the authority of the Vedas. Each school has its own methods and emphases, and later Vedanta sub-schools — Advaita, Vishishtadvaita, Dvaita — differ on key questions.'
        }
      }
    ],
    relatedSlugs: ['atman', 'moksha'],
    difficulty: 'intermediate',
    readingTimeMinutes: 4,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  {
    slug: 'advaita-vedanta',
    category: 'philosophy',
    title: {en: 'Advaita Vedanta', hi: 'अद्वैत वेदांत'},
    summary: {
      en: 'The non-dualist school associated with Adi Shankaracharya.',
      hi: 'आदि शंकराचार्य से जुड़ा अद्वैतवादी दर्शन।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Advaita teaches the non-difference of atman and Brahman. Other Vedanta schools read the same texts differently — future versions of this topic should present those readings side by side.'
        }
      }
    ],
    relatedSlugs: ['six-schools', 'atman'],
    difficulty: 'advanced',
    readingTimeMinutes: 4,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  // ---- Deities ----
  {
    slug: 'vishnu',
    category: 'deities',
    title: {en: 'Vishnu', hi: 'विष्णु'},
    summary: {
      en: 'The preserver in the Hindu trinity, known through avatars such as Rama and Krishna.',
      hi: 'हिन्दू त्रिमूर्ति में पालनकर्ता, राम और कृष्ण जैसे अवतारों के माध्यम से पूजित।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Vishnu is worshipped as the preserver and protector of cosmic order. Vaishnava traditions hold him as the supreme being, while other traditions honor him within a broader pantheon.'
        }
      }
    ],
    relatedSlugs: ['shiva', 'ramayana', 'bhagavad-gita'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  {
    slug: 'shiva',
    category: 'deities',
    title: {en: 'Shiva', hi: 'शिव'},
    summary: {
      en: 'The transformer in the Hindu trinity, central to Shaiva traditions.',
      hi: 'हिन्दू त्रिमूर्ति में संहार-परिवर्तन के देवता, शैव परंपराओं के केंद्र।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Shiva is associated with meditation, asceticism and the cyclical renewal of the cosmos. Shaiva traditions hold him as supreme; symbolism such as the lingam, damru and third eye carries layered meanings explored in later articles.'
        }
      }
    ],
    relatedSlugs: ['vishnu'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  // ---- Practices ----
  {
    slug: 'puja',
    category: 'practices',
    title: {en: 'Puja', hi: 'पूजा'},
    summary: {
      en: 'Devotional worship offered at home shrines and temples.',
      hi: 'घर के मंदिरों और देवालयों में की जाने वाली भक्तिपूर्ण उपासना।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Puja typically involves offerings such as flowers, incense, light and food before a consecrated image or symbol, accompanied by prayers or mantras. Forms vary widely by region, tradition and occasion.'
        }
      }
    ],
    relatedSlugs: ['mantra-japa', 'diwali'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  {
    slug: 'mantra-japa',
    category: 'practices',
    title: {en: 'Mantra & Japa', hi: 'मंत्र एवं जप'},
    summary: {
      en: 'The repetition of sacred sounds as a contemplative practice.',
      hi: 'चिंतन-मनन की साधना के रूप में पवित्र ध्वनियों का जप।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Japa is the repeated recitation of a mantra, often counted on a mala of 108 beads. Traditions describe different modes — audible, whispered and mental — with distinct roles in practice.'
        }
      }
    ],
    relatedSlugs: ['puja', 'meditation-basics'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  // ---- Festivals ----
  {
    slug: 'diwali',
    category: 'festivals',
    title: {en: 'Diwali', hi: 'दीपावली'},
    summary: {
      en: 'The festival of lights, celebrating the victory of light over darkness.',
      hi: 'प्रकाश का पर्व, अंधकार पर प्रकाश की विजय का उत्सव।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Diwali is observed with lamps, prayers, gatherings and festive foods. Associated stories differ by region — including Rama’s return to Ayodhya, Lakshmi worship and other traditions — and all deserve representation as content grows.'
        }
      }
    ],
    relatedSlugs: ['holi', 'puja'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  {
    slug: 'holi',
    category: 'festivals',
    title: {en: 'Holi', hi: 'होली'},
    summary: {
      en: 'The spring festival of colors, marking renewal and togetherness.',
      hi: 'रंगों का वसंत पर्व, नवीकरण और मेल-मिलाप का प्रतीक।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Holi welcomes spring with colors, music and community gatherings. Traditions link it with stories of Prahlada and Holika, and with Krishna’s playful pastimes in Braj.'
        }
      }
    ],
    relatedSlugs: ['diwali'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  // ---- Yoga & Meditation ----
  {
    slug: 'yoga-overview',
    category: 'yoga-meditation',
    title: {en: 'What Is Yoga?', hi: 'योग क्या है?'},
    summary: {
      en: 'Yoga as a spiritual discipline for union, beyond physical postures.',
      hi: 'शारीरिक आसनों से परे, आत्मा के मिलन की आध्यात्मिक साधना के रूप में योग।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'The word yoga comes from a root meaning “to join”. Classical texts describe yoga as the stilling of the movements of the mind, with physical postures (asana) as one limb among eight in Patanjali’s system.'
        }
      }
    ],
    relatedSlugs: ['patanjali-eight-limbs', 'meditation-basics', 'mantra-japa'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  {
    slug: 'patanjali-eight-limbs',
    category: 'yoga-meditation',
    title: {en: 'Patanjali’s Eight Limbs', hi: 'पतंजलि के अष्टांग'},
    summary: {
      en: 'The eightfold framework of the Yoga Sutras, from ethics to absorption.',
      hi: 'योगसूत्रों की अष्टांग व्यवस्था — यम-नियम से समाधि तक।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Patanjali’s Yoga Sutras outline eight limbs: ethical restraints (yama), observances (niyama), posture (asana), breath regulation (pranayama), sense withdrawal (pratyahara), concentration (dharana), meditation (dhyana) and absorption (samadhi).'
        }
      }
    ],
    relatedSlugs: ['yoga-overview', 'meditation-basics'],
    difficulty: 'intermediate',
    readingTimeMinutes: 4,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Patanjali’s Yoga Sutras (primary text)'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    updatedAt: '2026-09-12'
  },
  {
    slug: 'meditation-basics',
    category: 'yoga-meditation',
    title: {en: 'Meditation Basics', hi: 'ध्यान के मूल सिद्धांत'},
    summary: {
      en: 'A gentle starting point for sitting, breathing and observing the mind.',
      hi: 'बैठने, श्वास लेने और मन का निरीक्षण करने की सरल शुरुआत।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Beginners are usually advised to start with short sessions, a steady posture and attention on the breath or a mantra. Traditions differ on technique — future articles can compare approaches without ranking them.'
        }
      }
    ],
    relatedSlugs: ['yoga-overview', 'mantra-japa'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  // ---- Temples & Traditions ----
  {
    slug: 'temple-traditions',
    category: 'temples-traditions',
    title: {en: 'Temple Traditions', hi: 'मंदिर परंपराएँ'},
    summary: {
      en: 'How Hindu temples are built, consecrated and experienced.',
      hi: 'हिन्दू मंदिरों का निर्माण, प्रतिष्ठा और दर्शन-परंपरा।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Temples are traditionally understood as dwelling places of the deity, designed according to architectural treatises. Daily rituals, festivals and pilgrimages structure communal religious life around them.'
        }
      }
    ],
    relatedSlugs: ['pilgrimage-sites', 'puja'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  },
  {
    slug: 'pilgrimage-sites',
    category: 'temples-traditions',
    title: {en: 'Pilgrimage Sites', hi: 'तीर्थस्थल'},
    summary: {
      en: 'An orientation to tirtha-yatra and major pilgrimage circuits.',
      hi: 'तीर्थ-यात्रा और प्रमुख तीर्थ-परिपथों का परिचय।'
    },
    sections: [
      {
        heading: {en: 'Overview'},
        body: {
          en: 'Pilgrimage (tirtha-yatra) journeys to sacred rivers, mountains and temples are an ancient practice. Well-known circuits include the Char Dham, while countless regional sites matter deeply to local traditions.'
        }
      }
    ],
    relatedSlugs: ['temple-traditions'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    updatedAt: '2026-09-12'
  }
];
