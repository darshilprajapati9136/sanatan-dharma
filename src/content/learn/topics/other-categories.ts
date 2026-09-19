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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Hindu philosophy is traditionally grouped into six orthodox schools (shad-darshana) that accept the authority of the Vedas. Each school has its own methods and emphases, and later Vedanta sub-schools — Advaita, Vishishtadvaita, Dvaita — differ on key questions.'
        }
      }
    ],
    relatedSlugs: ['atman', 'moksha'],
    difficulty: 'intermediate',
    readingTimeMinutes: 4,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Advaita teaches the non-difference of atman and Brahman. Other Vedanta schools read the same texts differently — future versions of this topic should present those readings side by side.'
        }
      }
    ],
    relatedSlugs: ['six-schools', 'atman'],
    difficulty: 'advanced',
    readingTimeMinutes: 4,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Vishnu is worshipped as the preserver and protector of cosmic order. Vaishnava traditions hold him as the supreme being, while other traditions honor him within a broader pantheon.'
        }
      }
    ],
    relatedSlugs: ['shiva', 'ramayana', 'bhagavad-gita', 'krishna'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Shiva is associated with meditation, asceticism and the cyclical renewal of the cosmos. Shaiva traditions hold him as supreme; symbolism such as the lingam, damru and third eye carries layered meanings explored in later articles.'
        }
      }
    ],
    relatedSlugs: ['vishnu'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Puja typically involves offerings such as flowers, incense, light and food before a consecrated image or symbol, accompanied by prayers or mantras. Forms vary widely by region, tradition and occasion.'
        }
      }
    ],
    relatedSlugs: ['mantra-japa', 'diwali'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Japa is the repeated recitation of a mantra, often counted on a mala of 108 beads. Traditions describe different modes — audible, whispered and mental — with distinct roles in practice.'
        }
      }
    ],
    relatedSlugs: ['puja', 'meditation-basics'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Diwali is observed with lamps, prayers, gatherings and festive foods. Associated stories differ by region — including Rama’s return to Ayodhya, Lakshmi worship and other traditions — and all deserve representation as content grows.',
          hi: 'दीपावली पर दीप, प्रार्थना, मिलन और विशेष भोजन की परंपराएँ हैं। संबंधित कथाएँ क्षेत्र के अनुसार अलग हैं — जैसे राम की अयोध्या वापसी, लक्ष्मी पूजा और अन्य परंपराएँ।'
        }
      }
    ],
    relatedSlugs: ['holi', 'puja'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Holi welcomes spring with colors, music and community gatherings. Traditions link it with stories of Prahlada and Holika, and with Krishna’s playful pastimes in Braj.',
          hi: 'होली रंगों, संगीत और सामुदायिक मिलन से वसंत का स्वागत करती है। इसकी परंपराएँ प्रह्लाद और होलिका की कथा तथा ब्रज में कृष्ण की लीलाओं से जुड़ी हैं।'
        }
      }
    ],
    relatedSlugs: ['diwali'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'The word yoga comes from a root meaning “to join”. Classical texts describe yoga as the stilling of the movements of the mind, with physical postures (asana) as one limb among eight in Patanjali’s system.'
        }
      }
    ],
    relatedSlugs: ['patanjali-eight-limbs', 'meditation-basics', 'mantra-japa'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
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
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Beginners are usually advised to start with short sessions, a steady posture and attention on the breath or a mantra. Traditions differ on technique — future articles can compare approaches without ranking them.',
          hi: 'नए साधकों को प्रायः छोटे सत्रों, सहज स्थिर आसन और श्वास या मंत्र पर ध्यान से शुरू करने की सलाह दी जाती है। तकनीकें परंपरा के अनुसार अलग हैं; किसी एक को सभी के लिए श्रेष्ठ नहीं माना जाता।'
        }
      }
    ],
    relatedSlugs: ['yoga-overview', 'mantra-japa'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Temples are traditionally understood as dwelling places of the deity, designed according to architectural treatises. Daily rituals, festivals and pilgrimages structure communal religious life around them.'
        }
      }
    ],
    relatedSlugs: ['pilgrimage-sites', 'puja'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
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
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Pilgrimage (tirtha-yatra) journeys to sacred rivers, mountains and temples are an ancient practice. Well-known circuits include the Char Dham, while countless regional sites matter deeply to local traditions.'
        }
      }
    ],
    relatedSlugs: ['temple-traditions'],
    difficulty: 'beginner',
    readingTimeMinutes: 2,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
    updatedAt: '2026-09-12'
  },
  // ---- More Deities ----
  {
    slug: 'devi',
    category: 'deities',
    title: {en: 'Devi', hi: 'देवी'},
    summary: {
      en: 'The Divine Feminine in her many forms, from Durga and Lakshmi to Saraswati and Kali.',
      hi: 'दुर्गा और लक्ष्मी से सरस्वती और काली तक — अनेक रूपों में दिव्य स्त्रीशक्ति।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Devi, meaning goddess, is worshipped as the supreme reality in Shakta traditions and honoured across nearly all Hindu traditions. She appears in many forms — gentle as Lakshmi and Saraswati, fierce as Durga and Kali — each revealing a different face of the same power, Shakti.',
          hi: 'देवी अर्थात् स्त्री-दिव्यता; शाक्त परंपराओं में परम तत्व के रूप में पूजित और लगभग सभी हिंदू परंपराओं में सम्मानित। उनके अनेक रूप हैं — लक्ष्मी और सरस्वती के सौम्य रूप, दुर्गा और काली के उग्र रूप — प्रत्येक उसी शक्ति का अलग मुख प्रकट करता है।'
        }
      },
      {
        heading: {en: 'Many forms, one power', hi: 'अनेक रूप, एक शक्ति'},
        body: {
          en: 'Navratri honours nine forms over nine nights; Durga Puja celebrates the victory over Mahisha; Diwali nights often centre on Lakshmi; spring learning rites invoke Saraswati. Regional calendars and stories differ, and each community’s telling deserves respect.',
          hi: 'नवरात्रि में नौ रातों तक नौ रूपों की उपासना होती है; दुर्गा पूजा में महिषासुर पर विजय का उत्सव है; दीपावली की रातों में प्रायः लक्ष्मी केंद्र में हैं; वसंत में विद्या-आरंभ सरस्वती के आह्वान से होता है। क्षेत्रीय पंचांग और कथाएँ अलग हैं, और प्रत्येक समुदाय की परंपरा सम्मान की पात्र है।'
        }
      }
    ],
    relatedSlugs: ['vishnu', 'shiva', 'puja'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
    updatedAt: '2026-09-19'
  },
  {
    slug: 'krishna',
    category: 'deities',
    title: {en: 'Krishna', hi: 'कृष्ण'},
    summary: {
      en: 'The cowherd prince of Mathura and Vrindavan, teacher of the Bhagavad Gita.',
      hi: 'मथुरा-वृंदावन के नंदनंदन, भगवद्गीता के उपदेशक।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Krishna is loved across traditions — as the child of Vrindavan, the friend and charioteer of Arjuna, and the teacher whose Gita discourse addresses duty, devotion and liberation. Vaishnava traditions hold him as supreme; the Bhagavata Purana gathers his stories most fully.',
          hi: 'कृष्ण समस्त परंपराओं में प्रिय हैं — वृंदावन के बालक, अर्जुन के सखा-सारथि और कर्तव्य-भक्ति-मोक्ष का उपदेश देने वाले आचार्य के रूप में। वैष्णव परंपराएँ उन्हें परम मानती हैं; भागवत पुराण में उनकी कथाएँ सबसे विस्तार से मिलती हैं।'
        }
      },
      {
        heading: {en: 'Stories and teachings', hi: 'कथाएँ और उपदेश'},
        body: {
          en: 'Janmashtami remembers his midnight birth in Mathura. His Vrindavan pastimes (lila) fill song and dance traditions, while the Bhagavad Gita — his dialogue with Arjuna — is studied as philosophy, devotion and practical guidance together.',
          hi: 'जन्माष्टमी मथुरा में उनके मध्यरात्रि जन्म की स्मृति है। वृंदावन की लीलाएँ गीत-नृत्य परंपराओं में बसी हैं, जबकि भगवद्गीता — अर्जुन के साथ उनका संवाद — दर्शन, भक्ति और व्यावहारिक मार्गदर्शन के रूप में पढ़ी जाती है।'
        }
      }
    ],
    relatedSlugs: ['vishnu', 'bhagavad-gita'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
    updatedAt: '2026-09-19'
  },
  {
    slug: 'rama',
    category: 'deities',
    title: {en: 'Rama', hi: 'राम'},
    summary: {
      en: 'The prince of Ayodhya whose story in the Ramayana exemplifies duty, honour and compassion.',
      hi: 'अयोध्या के राजकुमार, जिनकी कथा रामायण में कर्तव्य, मर्यादा और करुणा का आदर्श प्रस्तुत करती है।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Rama, prince of Ayodhya, is honoured as an avatar of Vishnu and as Maryada Purushottam — the embodiment of righteous conduct. His exile, the abduction of Sita, the alliance with Hanuman and Sugriva, and the battle with Ravana are told in Valmiki’s Ramayana and retold across Asia in many languages.',
          hi: 'अयोध्या के राजकुमार राम विष्णु के अवतार और मर्यादा पुरुषोत्तम के रूप में पूजित हैं — धर्मपूर्ण आचरण के मूर्त रूप। उनका वनवास, सीता का हरण, हनुमान-सुग्रीव से मैत्री और रावण से युद्ध वाल्मीकि रामायण में वर्णित है और एशिया भर में अनेक भाषाओं में पुनः कहा गया है।'
        }
      },
      {
        heading: {en: 'Worship and festivals', hi: 'उपासना और पर्व'},
        body: {
          en: 'Rama Navami marks his birth; Dussehra recalls the victory over Ravana; Diwali homecomings are linked to his return to Ayodhya in many traditions. Tulsidas’s Ramcharitmanas carries his story to millions of households in the Hindi-speaking regions.',
          hi: 'रामनवमी उनके जन्म की स्मृति है; दशहरा रावण पर विजय का पर्व है; अनेक परंपराओं में दीपावली उनके अयोध्या आगमन से जुड़ी है। तुलसीदास का रामचरितमानस हिंदी क्षेत्रों के लाखों घरों तक उनकी कथा पहुँचाता है।'
        }
      }
    ],
    relatedSlugs: ['ramayana', 'hanuman', 'krishna'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
    updatedAt: '2026-09-19'
  },
  {
    slug: 'hanuman',
    category: 'deities',
    title: {en: 'Hanuman', hi: 'हनुमान'},
    summary: {
      en: 'The devoted servant of Rama, honoured for strength, humility and selfless service.',
      hi: 'राम के अनन्य सेवक, बल, विनम्रता और निस्वार्थ सेवा के लिए पूजित।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Hanuman — also called Bajrangbali, Maruti and Pavanputra — plays the central helping role in the Ramayana: leaping to Lanka, carrying the message of Rama, and bearing the mountain of herbs. He is loved as the meeting point of immense strength and complete humility.',
          hi: 'हनुमान — बजरंगबली, मारुति और पवनपुत्र के नामों से भी जाने जाते हैं — रामायण में केंद्रीय सहायक की भूमिका निभाते हैं: लंका तक छलांग, राम का संदेश पहुँचाना और संजीवनी पर्वत उठा लाना। अपार बल और पूर्ण विनम्रता के संगम के रूप में वे प्रिय हैं।'
        }
      },
      {
        heading: {en: 'Devotion today', hi: 'आज की भक्ति'},
        body: {
          en: 'Tuesdays and Saturdays are widely associated with his worship; the Hanuman Chalisa of Tulsidas is among the most recited hymns in India. Wrestlers, travellers and students alike seek his example of disciplined service.',
          hi: 'मंगलवार और शनिवार व्यापक रूप से उनकी उपासना से जुड़े हैं; तुलसीदास का हनुमान चालीसा भारत में सर्वाधिक पाठ किए जाने वाले स्तोत्रों में है। पहलवान, यात्री और विद्यार्थी — सभी उनकी अनुशासित सेवा का आदर्श अपनाते हैं।'
        }
      }
    ],
    relatedSlugs: ['rama', 'ramayana', 'bhakti'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
    updatedAt: '2026-09-19'
  },
  {
    slug: 'ganesha',
    category: 'deities',
    title: {en: 'Ganesha', hi: 'गणेश'},
    summary: {
      en: 'The elephant-headed remover of obstacles, invoked first in worship and new beginnings.',
      hi: 'विघ्नहर्ता गजानन, उपासना और हर नई शुरुआत में सबसे पहले स्मरण किए जाने वाले देव।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Ganesha — son of Shiva and Parvati — is traditionally invoked before any rite, journey or undertaking. His elephant head, large ears and mouse vehicle each carry symbolic readings in different traditions: listening deeply, holding discernment, and keeping desire small.',
          hi: 'गणेश — शिव-पार्वती के पुत्र — किसी भी अनुष्ठान, यात्रा या कार्य से पहले स्मरण किए जाते हैं। विभिन्न परंपराओं में उनके गजमस्तक, बड़े कान और मूषक वाहन के प्रतीकात्मक अर्थ हैं: गहराई से सुनना, विवेक रखना और इच्छा को संयमित करना।'
        }
      },
      {
        heading: {en: 'Ganesh Chaturthi', hi: 'गणेश चतुर्थी'},
        body: {
          en: 'The ten-day Ganesh Chaturthi festival brings community idols, daily prayer and immersion processions, most famously in Maharashtra. Household observances are simpler: a short daily prayer and an offering of modak or fruit.',
          hi: 'दस दिवसीय गणेश चतुर्थी में सामुदायिक मूर्तियाँ, दैनिक प्रार्थना और विसर्जन शोभायात्राएँ होती हैं — महाराष्ट्र में विशेष प्रसिद्धि के साथ। घरेलू उपासना सरल होती है: संक्षिप्त दैनिक प्रार्थना और मोदक या फल का भोग।'
        }
      }
    ],
    relatedSlugs: ['shiva', 'puja', 'devi'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
    updatedAt: '2026-09-19'
  },
  // ---- More Practices ----
  {
    slug: 'bhakti',
    category: 'practices',
    title: {en: 'Bhakti', hi: 'भक्ति'},
    summary: {
      en: 'The path of loving devotion, sung by saints across regions and languages.',
      hi: 'प्रेमपूर्ण समर्पण का मार्ग, जिसे क्षेत्रों और भाषाओं के संतों ने गाया।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Bhakti is devotion directed toward a chosen deity or the divine in any form — through song (kirtan, bhajan), remembrance, service and surrender. The medieval bhakti movements carried this path across India in Tamil, Hindi, Marathi, Bengali and many other languages.',
          hi: 'भक्ति इष्टदेव या किसी भी रूप में दिव्यता के प्रति समर्पण है — कीर्तन-भजन, स्मरण, सेवा और शरणागति के माध्यम से। मध्यकालीन भक्ति आंदोलनों ने तमिल, हिंदी, मराठी, बंगाली समेत अनेक भाषाओं में यह मार्ग पूरे भारत में फैलाया।'
        }
      },
      {
        heading: {en: 'How it is practised', hi: 'अभ्यास के रूप'},
        body: {
          en: 'Common expressions include congregational singing, daily remembrance (smarana), pilgrimage, and selfless service. Bhakti accommodates many temperaments: it can be quiet and personal, or communal and musical.',
          hi: 'सामूहिक गायन, दैनिक स्मरण, तीर्थयात्रा और निस्वार्थ सेवा इसके सामान्य रूप हैं। भक्ति अनेक स्वभावों को समेटती है — यह शांत और व्यक्तिगत भी हो सकती है, सामुदायिक और संगीतमय भी।'
        }
      }
    ],
    relatedSlugs: ['puja', 'mantra-japa', 'karma'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
    updatedAt: '2026-09-19'
  },
  {
    slug: 'dana-seva',
    category: 'practices',
    title: {en: 'Dana and Seva', hi: 'दान और सेवा'},
    summary: {
      en: 'Giving and selfless service as everyday spiritual practice.',
      hi: 'दान और निस्वार्थ सेवा — दैनिक आध्यात्मिक अभ्यास के रूप में।'
    },
    sections: [
      {
        heading: {en: 'Overview', hi: 'परिचय'},
        body: {
          en: 'Dana (giving) and seva (selfless service) appear across Hindu teachings as the householder’s natural offering: food given to guests and the needy (annadana), knowledge shared freely (vidyadana), and time spent serving temples, pilgrims and community kitchens.',
          hi: 'हिंदू शिक्षाओं में दान और सेवा गृहस्थ का स्वाभाविक अर्पण हैं: अतिथि और जरूरतमंद को अन्न (अन्नदान), ज्ञान का मुक्त वितरण (विद्यादान), और मंदिरों, तीर्थयात्रियों व सामुदायिक भंडारों में समय का समर्पण।'
        }
      },
      {
        heading: {en: 'A beginner’s start', hi: 'शुरुआत कैसे करें'},
        body: {
          en: 'Begin small and regular: a fixed weekly food donation, volunteering an hour at a local kitchen or cleanup, or teaching someone a skill you hold. The Gita’s counsel is to give with respect, at the right place and time, expecting nothing back.',
          hi: 'छोटी और नियमित शुरुआत करें: साप्ताहिक अन्नदान, स्थानीय भंडारे या सफाई में एक घंटे का स्वयंसेवा, या किसी को अपना कौशल सिखाना। गीता का उपदेश है — सम्मानपूर्वक, उचित स्थान-काल में, प्रतिफल की आशा बिना दान करें।'
        }
      }
    ],
    relatedSlugs: ['karma', 'bhakti', 'puja'],
    difficulty: 'beginner',
    readingTimeMinutes: 3,
    status: 'draft',
    sources: [{kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}],
    updatedAt: '2026-09-19'
  }
];
