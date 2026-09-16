import type {LearnTopic} from '../types';

/**
 * Scriptures sample topics. Brief orientation entries only —
 * not translations or authoritative expositions.
 */
export const scripturesTopics: LearnTopic[] = [
  {
    slug: 'vedas',
    category: 'scriptures',
    title: {en: 'Vedas', hi: 'वेद'},
    summary: {
      en: 'The oldest layer of Hindu scripture: four collections of hymns, rituals and reflections.',
      hi: 'हिन्दू धर्मग्रंथों की प्राचीनतम परत — स्तुतियों, कर्मकांडों और चिंतन के चार संग्रह।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'The four Vedas are Rigveda, Samaveda, Yajurveda and Atharvaveda. They were preserved through precise oral transmission and are traditionally regarded as revealed knowledge (shruti).',
          hi: 'चार वेद हैं — ऋग्वेद, सामवेद, यजुर्वेद और अथर्ववेद। इनका संरक्षण शुद्ध मौखिक परंपरा से हुआ और इन्हें परंपरागत रूप से श्रुति (प्रकट ज्ञान) माना जाता है।'
        }
      },
      {
        heading: {en: 'What they contain'},
        body: {
          en: 'Vedic literature includes hymns (samhitas), ritual manuals (brahmanas), forest reflections (aranyakas) and philosophical inquiries (upanishads). Later articles can explore each layer in depth.'
        }
      }
    ],
    relatedSlugs: ['upanishads'],
    difficulty: 'intermediate',
    readingTimeMinutes: 4,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Rigveda, Samaveda, Yajurveda, Atharvaveda (primary texts)'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-12'
  },
  {
    slug: 'upanishads',
    category: 'scriptures',
    title: {en: 'Upanishads', hi: 'उपनिषद्'},
    summary: {
      en: 'Philosophical texts exploring the self, ultimate reality and liberation.',
      hi: 'आत्मा, परम सत्य और मुक्ति पर चिंतन करने वाले दार्शनिक ग्रंथ।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'The Upanishads form the concluding portion of Vedic literature (Vedanta). They explore questions about consciousness, reality and freedom through dialogues between teachers and students.',
          hi: 'उपनिषद् वैदिक साहित्य के अंतिम भाग (वेदांत) हैं। इनमें गुरु-शिष्य संवादों के माध्यम से चेतना, सत्य और मुक्ति जैसे प्रश्नों पर विचार किया गया है।'
        }
      },
      {
        heading: {en: 'Key ideas'},
        body: {
          en: 'Central themes include atman (the self), Brahman (ultimate reality) and their relationship — interpreted differently by later philosophical schools.'
        }
      }
    ],
    relatedSlugs: ['vedas', 'atman', 'moksha'],
    difficulty: 'intermediate',
    readingTimeMinutes: 4,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Principal Upanishads, e.g. Isha, Kena, Katha, Chandogya'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-12'
  },
  {
    slug: 'bhagavad-gita',
    category: 'scriptures',
    title: {en: 'Bhagavad Gita', hi: 'भगवद् गीता'},
    summary: {
      en: 'A dialogue on duty, action and devotion, set within the Mahabharata.',
      hi: 'महाभारत के अंतर्गत कर्तव्य, कर्म और भक्ति पर आधारित संवाद।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'The Bhagavad Gita is a conversation between Krishna and Arjuna on the battlefield of Kurukshetra. It addresses duty in times of moral conflict and outlines the paths of knowledge, action and devotion.',
          hi: 'भगवद् गीता कुरुक्षेत्र के रणक्षेत्र में कृष्ण और अर्जुन के बीच संवाद है। इसमें नैतिक द्वंद्व के समय कर्तव्य तथा ज्ञान, कर्म और भक्ति के मार्गों पर विचार किया गया है।'
        }
      },
      {
        heading: {en: 'On this platform'},
        body: {
          en: 'The Scriptures section hosts the chapter-and-verse reading experience for the Gita. This Learn topic is the beginner-friendly orientation around it.'
        }
      }
    ],
    relatedSlugs: ['mahabharata', 'dharma', 'karma'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Bhagavad Gita (primary text); verse readings in Scriptures'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-12'
  },
  {
    slug: 'ramayana',
    category: 'scriptures',
    title: {en: 'Ramayana', hi: 'रामायण'},
    summary: {
      en: 'The epic journey of Rama, traditionally attributed to Valmiki.',
      hi: 'महर्षि वाल्मीकि द्वारा रचित राम की जीवन-यात्रा का महाकाव्य।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'The Ramayana narrates the life of Prince Rama — his exile, the abduction of Sita, and the battle with Ravana. It is traditionally counted among the itihasas and has inspired countless retellings across Asia.',
          hi: 'रामायण में राजकुमार राम के जीवन का वर्णन है — वनवास, सीता का हरण और रावण से युद्ध। इसे परंपरागत रूप से इतिहास ग्रंथों में गिना जाता है और समूचे एशिया में इसके असंख्य रूपांतरण हुए हैं।'
        }
      }
    ],
    relatedSlugs: ['mahabharata', 'dharma'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Valmiki Ramayana (primary text)'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-12'
  },
  {
    slug: 'mahabharata',
    category: 'scriptures',
    title: {en: 'Mahabharata', hi: 'महाभारत'},
    summary: {
      en: 'The great epic of the Bharata dynasty, traditionally attributed to Vyasa.',
      hi: 'महर्षि व्यास द्वारा रचित भरतवंश का महान महाकाव्य।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'The Mahabharata tells of the conflict between the Pandavas and Kauravas, culminating in the Kurukshetra war. It contains the Bhagavad Gita and is traditionally described as an encyclopedia of dharma.',
          hi: 'महाभारत में पांडवों और कौरवों के संघर्ष तथा कुरुक्षेत्र युद्ध का वर्णन है। इसमें भगवद् गीता निहित है और इसे परंपरागत रूप से धर्म का विश्वकोश कहा जाता है।'
        }
      }
    ],
    relatedSlugs: ['ramayana', 'bhagavad-gita', 'dharma'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Mahabharata, traditionally attributed to Vyasa'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-12'
  }
];
