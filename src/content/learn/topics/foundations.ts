import type {LearnTopic} from '../types';

/**
 * Foundations sample topics. Short, neutral introductions only —
 * not authoritative religious instruction. Status stays `draft`
 * until reviewed through an editorial process.
 */
export const foundationsTopics: LearnTopic[] = [
  {
    slug: 'dharma',
    category: 'foundations',
    title: {en: 'Dharma', hi: 'धर्म'},
    summary: {
      en: 'The idea of living in alignment with one’s duties, values and the order that sustains life.',
      hi: 'अपने कर्तव्यों, मूल्यों और जीवन को धारण करने वाली व्यवस्था के अनुरूप जीने का विचार।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Dharma is a central concept in Sanatan Dharma. It is often described as the set of duties, ethics and principles that uphold individuals, families and society.',
          hi: 'धर्म सनातन धर्म की केंद्रीय अवधारणा है। इसे प्रायः उन कर्तव्यों, नैतिकता और सिद्धांतों के रूप में देखा जाता है जो व्यक्ति, परिवार और समाज को धारण करते हैं।'
        }
      },
      {
        heading: {en: 'Key ideas'},
        body: {
          en: 'Traditions commonly distinguish personal duties (such as honesty and compassion) from role-based duties (such as those of a student, householder or teacher). Different texts and teachers explain these duties differently.'
        }
      },
      {
        heading: {en: 'Practical relevance'},
        body: {
          en: 'Many learners use the idea of dharma as a reflective tool: asking what is fair, kind and responsible in a given situation before acting.'
        }
      }
    ],
    relatedSlugs: ['karma', 'moksha', 'samsara'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Bhagavad Gita — discussions of duty (svadharma)'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-12'
  },
  {
    slug: 'karma',
    category: 'foundations',
    title: {en: 'Karma', hi: 'कर्म'},
    summary: {
      en: 'The principle that actions have consequences which shape one’s present and future experience.',
      hi: 'यह सिद्धांत कि कर्मों के परिणाम होते हैं जो वर्तमान और भविष्य के अनुभव को आकार देते हैं।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Karma literally means “action”. In Sanatan Dharma it refers to the idea that intentional actions — through body, speech and mind — produce results that the doer eventually experiences.',
          hi: 'कर्म का शाब्दिक अर्थ है “क्रिया”। सनातन धर्म में यह विचार है कि तन, वाणी और मन से किए गए संकल्पित कार्यों के परिणाम कर्ता को कभी न कभी प्राप्त होते हैं।'
        }
      },
      {
        heading: {en: 'Key ideas'},
        body: {
          en: 'Texts describe different aspects of karma, such as accumulated past actions, actions currently bearing fruit, and new actions being created now. Interpretations vary across philosophical schools.'
        }
      },
      {
        heading: {en: 'Practical relevance'},
        body: {
          en: 'The teaching is commonly applied as encouragement toward mindful, responsible action rather than speculation about specific past events.'
        }
      }
    ],
    relatedSlugs: ['dharma', 'samsara', 'atman'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Bhagavad Gita — teachings on selfless action (karma yoga)'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-12'
  },
  {
    slug: 'atman',
    category: 'foundations',
    title: {en: 'Atman', hi: 'आत्मा'},
    summary: {
      en: 'The concept of the inner self or consciousness, distinct from the body and mind.',
      hi: 'अंतःस्वरूप या चेतना की अवधारणा, जो शरीर और मन से भिन्न मानी जाती है।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Atman is commonly translated as “self” or “soul”. Many traditions describe it as the unchanging awareness behind changing thoughts, feelings and bodily states.',
          hi: 'आत्मा को प्रायः “स्व” या चेतना के रूप में समझा जाता है। अनेक परंपराओं में इसे बदलते विचारों, भावों और शारीरिक अवस्थाओं के पीछे स्थित अपरिवर्तनीय बोध माना गया है।'
        }
      },
      {
        heading: {en: 'Different viewpoints'},
        body: {
          en: 'Schools of thought differ on the nature of atman and its relationship with ultimate reality (Brahman). Advaita traditions emphasize non-difference, while other schools preserve a distinction. The topic page should present these differences side by side as content grows.'
        }
      },
      {
        heading: {en: 'Practical relevance'},
        body: {
          en: 'Practices such as self-inquiry and meditation are traditionally associated with understanding this teaching through direct reflection.'
        }
      }
    ],
    relatedSlugs: ['moksha', 'dharma'],
    difficulty: 'intermediate',
    readingTimeMinutes: 4,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Upanishads — inquiries into the nature of the self'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; Vedanta viewpoints need careful multi-tradition review.',
    updatedAt: '2026-09-12'
  },
  {
    slug: 'samsara',
    category: 'foundations',
    title: {en: 'Samsara', hi: 'संसार'},
    summary: {
      en: 'The cycle of birth, death and rebirth through which beings are said to pass.',
      hi: 'जन्म, मृत्यु और पुनर्जन्म का चक्र जिससे प्राणियों के गुज़रने की बात कही जाती है।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Samsara describes existence as a continuing cycle: beings are born, live, die and are born again. Liberation from this cycle is called moksha.',
          hi: 'संसार अस्तित्व को एक निरंतर चक्र के रूप में देखता है — प्राणी जन्म लेते हैं, जीते हैं, मृत्यु को प्राप्त होते हैं और पुनः जन्म लेते हैं। इस चक्र से मुक्ति को मोक्ष कहा जाता है।'
        }
      },
      {
        heading: {en: 'Key ideas'},
        body: {
          en: 'The cycle is traditionally linked with karma: actions shape the conditions of future experience. Different traditions describe the mechanics of this process differently.'
        }
      }
    ],
    relatedSlugs: ['karma', 'moksha'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-12'
  },
  {
    slug: 'moksha',
    category: 'foundations',
    title: {en: 'Moksha', hi: 'मोक्ष'},
    summary: {
      en: 'Liberation from the cycle of rebirth; described as the highest aim of life.',
      hi: 'पुनर्जन्म के चक्र से मुक्ति; इसे जीवन का परम लक्ष्य कहा जाता है।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Moksha means release or liberation. It is traditionally counted among the four aims of life and described as freedom from samsara, the cycle of rebirth.',
          hi: 'मोक्ष का अर्थ है मुक्ति। इसे परंपरागत रूप से जीवन के चार पुरुषार्थों में गिना जाता है और संसार — पुनर्जन्म के चक्र — से छुटकारा माना जाता है।'
        }
      },
      {
        heading: {en: 'Different paths'},
        body: {
          en: 'Traditions describe several paths toward liberation, commonly grouped as the paths of knowledge, devotion, selfless action and meditation. Each path is emphasized differently by different teachers and lineages.'
        }
      }
    ],
    relatedSlugs: ['dharma', 'karma', 'atman', 'samsara'],
    difficulty: 'intermediate',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Upanishads and Bhagavad Gita — teachings on liberation'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; path descriptions need multi-tradition review.',
    updatedAt: '2026-09-12'
  }
];
