import type {LearnTopic} from '../types';

/**
 * Scriptures topics. Orientation entries for beginners —
 * not translations or authoritative expositions. Status stays `draft`
 * until reviewed through an editorial process. Structural facts
 * (numbers of chapters, kandas, parvas and their traditional names)
 * follow the standard received divisions; no verse is quoted.
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
        heading: {en: 'What they contain', hi: 'इनमें क्या है'},
        body: {
          en: 'Vedic literature includes hymns (samhitas), ritual manuals (brahmanas), forest reflections (aranyakas) and philosophical inquiries (upanishads). Later articles can explore each layer in depth.',
          hi: 'वैदिक साहित्य में स्तुति-सूक्त (संहिता), कर्मकांड ग्रंथ (ब्राह्मण), वन-चिंतन (आरण्यक) और दार्शनिक अन्वेषण (उपनिषद्) शामिल हैं। आगे के लेखों में प्रत्येक स्तर को विस्तार से देखा जा सकता है।'
        }
      },
      {
        heading: {en: 'The four collections', hi: 'चार संहिताएँ'},
        body: {
          en: 'The Rigveda, the oldest, is a collection of over a thousand hymns to natural and divine powers. The Samaveda sets verses to melody for chanting, the Yajurveda gathers formulas for performing rituals, and the Atharvaveda covers everyday life — healing, household rites and protection.',
          hi: 'ऋग्वेद सबसे प्राचीन है — इसमें प्राकृतिक और दिव्य शक्तियों की एक हज़ार से अधिक स्तुतियाँ हैं। सामवेद में गायन के लिए स्वरबद्ध मंत्र हैं, यजुर्वेद में यज्ञ संपन्न करने के सूत्र हैं, और अथर्ववेद में दैनिक जीवन — चिकित्सा, गृह अनुष्ठान और रक्षा — से जुड़े विषय हैं।'
        }
      },
      {
        heading: {en: 'Why oral preservation matters', hi: 'मौखिक संरक्षण का महत्व'},
        body: {
          en: 'For centuries the Vedas were passed from teacher to student by memorization, using pronunciation and rhythm techniques designed to prevent any change. This living chain (guru-shishya parampara) is why the texts reached us in a remarkably stable form.',
          hi: 'सदियों तक वेद गुरु से शिष्य तक कंठस्थ परंपरा से पहुँचे — उच्चारण और लय की ऐसी विधियों के साथ जिनसे पाठ में कोई परिवर्तन न हो। इसी जीवंत परंपरा (गुरु-शिष्य परंपरा) के कारण ये ग्रंथ अत्यंत स्थिर रूप में हम तक पहुँचे हैं।'
        }
      },
      {
        heading: {en: 'Approaching them as a beginner', hi: 'नए पाठक कैसे पढ़ें'},
        body: {
          en: 'Nobody is expected to read the Vedas cover to cover. Beginners usually start with a good modern translation that has an introduction and notes, or with the Upanishads and the Gita, which carry Vedic ideas in a more accessible form. Take small passages slowly rather than rushing through.',
          hi: 'वेदों को आदि से अंत तक पढ़ने की अपेक्षा किसी से नहीं की जाती। नए पाठक प्रायः ऐसी आधुनिक अनुवाद पुस्तक से आरंभ करते हैं जिसमें भूमिका और टिप्पणियाँ हों, या उपनिषदों और गीता से, जो वैदिक विचारों को सुगम रूप में प्रस्तुत करते हैं। थोड़े अंश धीरे-धीरे पढ़ें, शीघ्रता न करें।'
        }
      }
    ],
    relatedSlugs: ['upanishads', 'mantra-japa'],
    difficulty: 'intermediate',
    readingTimeMinutes: 8,
    status: 'draft',
    diagram: {
      kind: 'sequence',
      title: {en: 'Four layers, from ritual to reflection', hi: 'चार स्तर — कर्मकांड से चिंतन तक'},
      steps: [
        {
          label: {en: 'Samhitas — the hymns', hi: 'संहिता — स्तुतियाँ'},
          detail: {
            en: 'The core collections: verses addressed to natural and divine powers.',
            hi: 'मूल संग्रह — प्राकृतिक और दिव्य शक्तियों को संबोधित मंत्र।'
          }
        },
        {
          label: {en: 'Brahmanas — the rituals', hi: 'ब्राह्मण — कर्मकांड'},
          detail: {
            en: 'Prose manuals explaining how to perform sacrifices correctly.',
            hi: 'यज्ञों को सही विधि से संपन्न करने की व्याख्या करने वाले गद्य ग्रंथ।'
          }
        },
        {
          label: {en: 'Aranyakas — forest reflections', hi: 'आरण्यक — वन-चिंतन'},
          detail: {
            en: 'Meditative texts for those who withdrew to the forest, turning ritual inward.',
            hi: 'वन में गए साधकों के लिए ध्यानपरक ग्रंथ, जो कर्मकांड को अंतर्मुख करते हैं।'
          }
        },
        {
          label: {en: 'Upanishads — the inquiries', hi: 'उपनिषद् — अन्वेषण'},
          detail: {
            en: 'Philosophical dialogues on the self and ultimate reality, closing the Vedic corpus.',
            hi: 'आत्मा और परम तत्व पर दार्शनिक संवाद, जो वैदिक संहिता का समापन करते हैं।'
          }
        }
      ]
    },
    sources: [
      {kind: 'scripture', label: {en: 'Rigveda, Samaveda, Yajurveda, Atharvaveda (primary texts)'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-20'
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
        heading: {en: 'Key ideas', hi: 'मुख्य विचार'},
        body: {
          en: 'Central themes include atman (the self), Brahman (ultimate reality) and their relationship — interpreted differently by later philosophical schools.',
          hi: 'केंद्रीय विषयों में आत्मा, ब्रह्म (परम तत्व) और उनका परस्पर संबंध शामिल हैं — जिनकी व्याख्या परवर्ती दार्शनिक मतों ने अलग-अलग की है।'
        }
      },
      {
        heading: {en: 'The principal Upanishads', hi: 'प्रमुख उपनिषद्'},
        body: {
          en: 'Tradition counts over a hundred Upanishads, but about ten to thirteen are regarded as principal (mukhya): Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya and Brihadaranyaka. The Chandogya and Brihadaranyaka are the longest and most wide-ranging.',
          hi: 'परंपरा में सौ से अधिक उपनिषद् गिने जाते हैं, किंतु लगभग दस से तेरह को प्रमुख (मुख्य) माना जाता है — ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छान्दोग्य और बृहदारण्यक। छान्दोग्य और बृहदारण्यक सबसे बड़े और व्यापक हैं।'
        }
      },
      {
        heading: {en: 'How they teach', hi: 'उनकी शिक्षण शैली'},
        body: {
          en: 'Upanishads rarely lecture; they inquire. A student asks — like Nachiketa questioning death in the Katha, or Shvetaketu learning from his father in the Chandogya — and the teacher answers with stories, analogies and paradoxes. The Chandogya teaching “Tat Tvam Asi” (That Thou Art) points to the identity of the self with ultimate reality.',
          hi: 'उपनिषद् उपदेश कम देते हैं, प्रश्न अधिक करते हैं। शिष्य पूछता है — जैसे कठ में नचिकेता मृत्यु के बारे में पूछता है, या छान्दोग्य में श्वेतकेतु अपने पिता से सीखता है — और गुरु कथाओं, दृष्टांतों और विरोधाभासों से उत्तर देता है। छान्दोग्य का “तत् त्वम् असि” (वह तू है) आत्मा और परम तत्व की एकता की ओर संकेत करता है।'
        }
      },
      {
        heading: {en: 'Where to start', hi: 'कहाँ से आरंभ करें'},
        body: {
          en: 'Start short: the Isha and Katha Upanishads are brief and self-contained. Read slowly with a commentary that explains context, and discuss with a teacher or study group when possible — these texts were composed for conversation, not speed-reading.',
          hi: 'छोटे से आरंभ करें — ईश और कठ उपनिषद् संक्षिप्त और अपने आप में पूर्ण हैं। संदर्भ समझाने वाली टीका के साथ धीरे-धीरे पढ़ें और संभव हो तो किसी शिक्षक या अध्ययन समूह से चर्चा करें — ये ग्रंथ संवाद के लिए रचे गए थे, शीघ्र पढ़ने के लिए नहीं।'
        }
      }
    ],
    relatedSlugs: ['vedas', 'atman', 'moksha', 'advaita-vedanta'],
    difficulty: 'intermediate',
    readingTimeMinutes: 8,
    status: 'draft',
    diagram: {
      kind: 'sequence',
      title: {en: 'A beginner’s path through the Upanishads', hi: 'उपनिषदों में प्रवेश का मार्ग'},
      steps: [
        {
          label: {en: 'Isha — begin short', hi: 'ईश — छोटे से आरंभ'},
          detail: {
            en: 'Eighteen verses on seeing the divine in all things; complete in one sitting.',
            hi: 'सब में दिव्यता देखने पर अठारह मंत्र; एक बैठक में पूर्ण।'
          }
        },
        {
          label: {en: 'Katha — learn through story', hi: 'कठ — कथा से सीखें'},
          detail: {
            en: 'Young Nachiketa questions death itself and learns what survives it.',
            hi: 'बालक नचिकेता स्वयं मृत्यु से प्रश्न करता है और जानता है कि क्या शेष रहता है।'
          }
        },
        {
          label: {en: 'Chandogya — sit with the teachings', hi: 'छान्दोग्य — शिक्षाओं के साथ ठहरें'},
          detail: {
            en: 'Longer dialogues, including a father teaching his son “Tat Tvam Asi”.',
            hi: 'दीर्घ संवाद, जिनमें पिता पुत्र को “तत् त्वम् असि” सिखाता है।'
          }
        },
        {
          label: {en: 'Brihadaranyaka — go deepest', hi: 'बृहदारण्यक — गहराई में जाएँ'},
          detail: {
            en: 'The longest Upanishad: profound debates on self, death and liberation.',
            hi: 'सबसे बड़ा उपनिषद् — आत्मा, मृत्यु और मुक्ति पर गंभीर शास्त्रार्थ।'
          }
        },
        {
          label: {en: 'Discuss — never alone', hi: 'चर्चा — कभी अकेले नहीं'},
          detail: {
            en: 'Take questions to a teacher or study circle; these texts were made for dialogue.',
            hi: 'प्रश्नों को शिक्षक या अध्ययन समूह में ले जाएँ; ये ग्रंथ संवाद के लिए बने हैं।'
          }
        }
      ]
    },
    sources: [
      {kind: 'scripture', label: {en: 'Principal Upanishads, e.g. Isha, Kena, Katha, Chandogya'}},
      {kind: 'commentary', label: {en: 'Classical commentaries on the principal Upanishads (traditional exegesis)'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-20'
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
        heading: {en: 'On this platform', hi: 'इस मंच पर'},
        body: {
          en: 'The Scriptures section hosts the chapter-and-verse reading experience for the Gita. This Learn topic is the beginner-friendly orientation around it.',
          hi: 'ग्रंथ अनुभाग में गीता के अध्याय और श्लोक पढ़ने की व्यवस्था है। यह पाठ नए पाठकों के लिए उसका प्रारंभिक परिचय है।'
        }
      },
      {
        heading: {en: 'Structure in brief', hi: 'संक्षिप्त संरचना'},
        body: {
          en: 'The Gita has eighteen chapters and about seven hundred verses. Commentators traditionally group them in threes: the first six focus on disciplined action, the middle six on devotion, and the last six on knowledge — three doors into the same teaching.',
          hi: 'गीता में अठारह अध्याय और लगभग सात सौ श्लोक हैं। टीकाकार इन्हें परंपरागत रूप से तीन भागों में बाँटते हैं — पहले छह में अनुशासित कर्म, बीच के छह में भक्ति और अंतिम छह में ज्ञान पर बल है — एक ही शिक्षा के तीन द्वार।'
        }
      },
      {
        heading: {en: 'Three paths, one goal', hi: 'तीन मार्ग, एक लक्ष्य'},
        body: {
          en: 'The Gita presents karma yoga (selfless action), bhakti yoga (devotion) and jnana yoga (knowledge) as complementary rather than competing. Different temperaments lean toward different paths, and the text honours all sincere seekers.',
          hi: 'गीता कर्मयोग (निष्काम कर्म), भक्तियोग (भक्ति) और ज्ञानयोग (ज्ञान) को परस्पर विरोधी नहीं, पूरक मानती है। भिन्न स्वभाव के लोग भिन्न मार्गों की ओर झुकते हैं, और ग्रंथ सभी सच्चे साधकों का सम्मान करता है।'
        }
      },
      {
        heading: {en: 'Why Arjuna’s dilemma matters', hi: 'अर्जुन का द्वंद्व क्यों महत्वपूर्ण है'},
        body: {
          en: 'Arjuna must fight people he loves for a cause he believes in — a stand-in for every hard choice between duty and feeling. The Gita’s answer is to act rightly without clinging to results: do your duty with full effort, and accept whatever outcome follows.',
          hi: 'अर्जुन को अपनों के विरुद्ध, अपने विश्वास के पक्ष में लड़ना है — यह कर्तव्य और भावना के बीच हर कठिन चुनाव का प्रतीक है। गीता का उत्तर है — फल की आसक्ति के बिना सही कर्म करो: पूर्ण निष्ठा से अपना कर्तव्य निभाओ और जो परिणाम आए उसे स्वीकार करो।'
        }
      }
    ],
    relatedSlugs: ['mahabharata', 'dharma', 'karma', 'bhakti', 'krishna', 'bhagavad-gita-roadmap'],
    difficulty: 'beginner',
    readingTimeMinutes: 7,
    status: 'draft',
    diagram: {
      kind: 'sequence',
      title: {en: 'The Gita’s arc in five movements', hi: 'गीता की यात्रा पाँच चरणों में'},
      steps: [
        {
          label: {en: 'The dilemma', hi: 'द्वंद्व'},
          detail: {
            en: 'Arjuna surveys both armies, despairs, and refuses to fight.',
            hi: 'अर्जुन दोनों सेनाओं को देखकर विषाद में डूबता है और युद्ध से इनकार करता है।'
          }
        },
        {
          label: {en: 'Disciplined action', hi: 'अनुशासित कर्म'},
          detail: {
            en: 'Krishna teaches selfless action: do your duty without clinging to results.',
            hi: 'कृष्ण निष्काम कर्म सिखाते हैं — फल की आसक्ति के बिना अपना कर्तव्य करो।'
          }
        },
        {
          label: {en: 'Devotion', hi: 'भक्ति'},
          detail: {
            en: 'The middle chapters open the path of love and surrender to the divine.',
            hi: 'बीच के अध्याय दिव्यता के प्रति प्रेम और समर्पण का मार्ग खोलते हैं।'
          }
        },
        {
          label: {en: 'Knowledge', hi: 'ज्ञान'},
          detail: {
            en: 'Discrimination between the transient and the eternal, the field and its knower.',
            hi: 'नश्वर और शाश्वत में, क्षेत्र और क्षेत्रज्ञ में विवेक।'
          }
        },
        {
          label: {en: 'Resolve', hi: 'संकल्प'},
          detail: {
            en: 'Arjuna’s confusion lifts; he takes up his bow with a steady mind.',
            hi: 'अर्जुन का मोह दूर होता है; वह स्थिर मन से अपना धनुष उठाता है।'
          }
        }
      ]
    },
    sources: [
      {kind: 'scripture', label: {en: 'Bhagavad Gita (primary text); verse readings in Scriptures'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-20'
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
      },
      {
        heading: {en: 'Seven kandas', hi: 'सात काण्ड'},
        body: {
          en: 'The epic is divided into seven books (kandas): Bala (childhood), Ayodhya (exile begins), Aranya (forest years), Kishkindha (alliance with the vanaras), Sundara (Hanuman’s leap to Lanka), Yuddha (the great battle) and Uttara (Rama’s later reign). Together they trace the full arc from birth to homecoming.',
          hi: 'महाकाव्य सात काण्डों में विभाजित है — बाल (बाल्यकाल), अयोध्या (वनवास का आरंभ), अरण्य (वन के वर्ष), किष्किंधा (वानरों से मैत्री), सुंदर (हनुमान की लंका यात्रा), युद्ध (महासमर) और उत्तर (राम का परवर्ती शासन)। ये मिलकर जन्म से घर वापसी तक की पूर्ण कथा रचते हैं।'
        }
      },
      {
        heading: {en: 'Ideals and characters', hi: 'आदर्श और पात्र'},
        body: {
          en: 'Rama is traditionally honoured as the ideal of principled conduct, Sita as steadfastness under trial, Lakshmana as devoted service and Hanuman as selfless devotion and strength. Readers often approach the epic as a mirror for their own duties and relationships.',
          hi: 'राम को परंपरागत रूप से मर्यादित आचरण का आदर्श, सीता को परीक्षा में दृढ़ता का, लक्ष्मण को निष्ठापूर्ण सेवा का और हनुमान को निष्काम भक्ति और बल का प्रतीक माना जाता है। पाठक प्रायः इस महाकाव्य को अपने कर्तव्यों और संबंधों का दर्पण मानकर पढ़ते हैं।'
        }
      },
      {
        heading: {en: 'Many Ramayanas', hi: 'अनेक रामायणें'},
        body: {
          en: 'Valmiki’s Sanskrit original inspired retellings in nearly every Indian language — notably Tulsidas’s Ramcharitmanas in Awadhi and Kamban’s Tamil version — as well as versions across Southeast Asia. Each retelling reflects the devotion of its own time and place.',
          hi: 'वाल्मीकि के संस्कृत मूल से लगभग हर भारतीय भाषा में रूपांतरण हुए — विशेष रूप से अवधी में तुलसीदास का रामचरितमानस और तमिल में कंबन का संस्करण — साथ ही दक्षिण-पूर्व एशिया में भी इसके रूप प्रचलित हैं। हर रूपांतरण अपने समय और स्थान की भक्ति को दर्शाता है।'
        }
      }
    ],
    relatedSlugs: ['mahabharata', 'dharma', 'rama', 'hanuman'],
    difficulty: 'beginner',
    readingTimeMinutes: 6,
    status: 'draft',
    diagram: {
      kind: 'sequence',
      title: {en: 'Journey through the seven kandas', hi: 'सात काण्डों की यात्रा'},
      steps: [
        {
          label: {en: 'Bala — Childhood', hi: 'बाल — बाल्यकाल'},
          detail: {
            en: 'Rama’s birth in Ayodhya, training under Vishvamitra, and marriage to Sita.',
            hi: 'अयोध्या में राम का जन्म, विश्वामित्र से शिक्षा और सीता से विवाह।'
          }
        },
        {
          label: {en: 'Ayodhya — Exile begins', hi: 'अयोध्या — वनवास का आरंभ'},
          detail: {
            en: 'Denied the throne, Rama accepts fourteen years of exile with Sita and Lakshmana.',
            hi: 'राज्य से वंचित राम सीता और लक्ष्मण के साथ चौदह वर्ष का वनवास स्वीकार करते हैं।'
          }
        },
        {
          label: {en: 'Aranya — Forest years', hi: 'अरण्य — वन के वर्ष'},
          detail: {
            en: 'Life in the forest, encounters with sages and demons, and Sita’s abduction by Ravana.',
            hi: 'वन में जीवन, ऋषियों और राक्षसों से भेंट, और रावण द्वारा सीता का हरण।'
          }
        },
        {
          label: {en: 'Kishkindha — The alliance', hi: 'किष्किंधा — मैत्री'},
          detail: {
            en: 'Rama befriends Sugriva and meets Hanuman; the search for Sita begins.',
            hi: 'राम सुग्रीव से मित्रता करते हैं और हनुमान से मिलते हैं; सीता की खोज आरंभ होती है।'
          }
        },
        {
          label: {en: 'Sundara — Hanuman’s leap', hi: 'सुंदर — हनुमान की छलांग'},
          href: '/learn/deities/hanuman',
          detail: {
            en: 'Hanuman leaps across the ocean to Lanka, finds Sita, and carries back hope.',
            hi: 'हनुमान समुद्र लाँघकर लंका पहुँचते हैं, सीता को खोजते हैं और आशा का संदेश लाते हैं।'
          }
        },
        {
          label: {en: 'Yuddha — The great battle', hi: 'युद्ध — महासमर'},
          detail: {
            en: 'The bridge to Lanka, the battle with Ravana’s forces, and Sita’s rescue.',
            hi: 'लंका तक सेतु, रावण की सेना से युद्ध और सीता की मुक्ति।'
          }
        },
        {
          label: {en: 'Uttara — Homecoming and reign', hi: 'उत्तर — वापसी और शासन'},
          detail: {
            en: 'Return to Ayodhya, Rama’s coronation, and the just rule remembered as Rama-rajya.',
            hi: 'अयोध्या वापसी, राम का राज्याभिषेक और राम-राज्य के रूप में स्मरण किया जाने वाला न्यायपूर्ण शासन।'
          }
        }
      ]
    },
    sources: [
      {kind: 'scripture', label: {en: 'Valmiki Ramayana (primary text)'}},
      {kind: 'traditional', label: {en: 'Traditional retellings, e.g. Tulsidas’s Ramcharitmanas'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-20'
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
      },
      {
        heading: {en: 'Eighteen parvas', hi: 'अठारह पर्व'},
        body: {
          en: 'The epic unfolds in eighteen books: Adi, Sabha, Vana, Virata, Udyoga, Bhishma, Drona, Karna, Shalya, Sauptika, Stri, Shanti, Anushasana, Ashvamedhika, Ashramavasika, Mausala, Mahaprasthanika and Svargarohana. The war itself occupies only six of them — most of the epic is story, dialogue and teaching.',
          hi: 'महाकाव्य अठारह पर्वों में फैला है — आदि, सभा, वन, विराट, उद्योग, भीष्म, द्रोण, कर्ण, शल्य, सौप्तिक, स्त्री, शांति, अनुशासन, आश्वमेधिक, आश्रमवासिक, मौसल, महाप्रस्थानिक और स्वर्गारोहण। युद्ध स्वयं केवल छह पर्वों में है — अधिकांश महाकाव्य कथा, संवाद और शिक्षा है।'
        }
      },
      {
        heading: {en: 'Stories within the story', hi: 'कथा में कथाएँ'},
        body: {
          en: 'Narrators pause the main plot for beloved tales like Nala and Damayanti or Savitri and Satyavan — each exploring love, loss and duty from a new angle. Reading these embedded stories is one of the epic’s great pleasures.',
          hi: 'मुख्य कथा के बीच सूत्रधार नल-दमयंती या सावित्री-सत्यवान जैसी प्रिय कथाएँ सुनाते हैं — हर कथा प्रेम, हानि और कर्तव्य को नए कोण से देखती है। इन अंतर्निहित कथाओं को पढ़ना महाकाव्य के महान सुखों में से एक है।'
        }
      },
      {
        heading: {en: 'The Shanti Parva and the Gita', hi: 'शांति पर्व और गीता'},
        body: {
          en: 'After the war, the dying Bhishma instructs Yudhishthira on duty and statecraft across the long Shanti Parva — the epic’s philosophical heart alongside the Gita, which appears earlier within the Bhishma Parva. Together they show the epic arguing with itself about what dharma demands.',
          hi: 'युद्ध के बाद शरशय्या पर पड़े भीष्म युधिष्ठिर को कर्तव्य और राजधर्म की शिक्षा देते हैं — यही दीर्घ शांति पर्व गीता के साथ महाकाव्य का दार्शनिक हृदय है; गीता इससे पहले भीष्म पर्व में आती है। ये दोनों दिखाते हैं कि महाकाव्य स्वयं धर्म के प्रश्न पर विचार-विमर्श करता है।'
        }
      }
    ],
    relatedSlugs: ['ramayana', 'bhagavad-gita', 'dharma', 'krishna'],
    difficulty: 'beginner',
    readingTimeMinutes: 7,
    status: 'draft',
    diagram: {
      kind: 'sequence',
      title: {en: 'The epic’s arc in six phases', hi: 'महाकाव्य की यात्रा छह चरणों में'},
      steps: [
        {
          label: {en: 'Origins and the wager', hi: 'उत्पत्ति और द्यूत'},
          detail: {
            en: 'Kings, rivalries and the fateful game of dice that costs the Pandavas everything.',
            hi: 'राजा, प्रतिद्वंद्विता और भाग्यनिर्णायक द्यूत जिसमें पांडव सब कुछ हार जाते हैं।'
          }
        },
        {
          label: {en: 'Exile', hi: 'वनवास'},
          detail: {
            en: 'Twelve years in the forest plus a year in disguise, gathering allies and wisdom.',
            hi: 'बारह वर्ष वन में और एक वर्ष अज्ञातवास में — मित्र और ज्ञान अर्जित करते हुए।'
          }
        },
        {
          label: {en: 'The effort for peace', hi: 'शांति का प्रयास'},
          detail: {
            en: 'Krishna’s mission to avoid war fails; both sides prepare for Kurukshetra.',
            hi: 'युद्ध टालने का कृष्ण का प्रयास विफल; दोनों पक्ष कुरुक्षेत्र के लिए तैयार होते हैं।'
          }
        },
        {
          label: {en: 'Eighteen days of war', hi: 'अठारह दिन का युद्ध'},
          href: '/learn/scriptures/bhagavad-gita',
          detail: {
            en: 'The great battle, the Gita’s teaching within it, and devastating losses on all sides.',
            hi: 'महासमर, उसके बीच गीता का उपदेश, और सभी पक्षों की भयंकर हानि।'
          }
        },
        {
          label: {en: 'Aftermath and teachings', hi: 'परिणाम और शिक्षाएँ'},
          detail: {
            en: 'Grief, Bhishma’s instructions on duty, and the slow work of rebuilding.',
            hi: 'शोक, कर्तव्य पर भीष्म की शिक्षाएँ और पुनर्निर्माण का धीमा कार्य।'
          }
        },
        {
          label: {en: 'Departures', hi: 'प्रस्थान'},
          detail: {
            en: 'The heroes renounce the world and journey out — the epic’s sombre close.',
            hi: 'नायक संसार त्यागकर महाप्रस्थान करते हैं — महाकाव्य का गंभीर समापन।'
          }
        }
      ]
    },
    sources: [
      {kind: 'scripture', label: {en: 'Mahabharata, traditionally attributed to Vyasa'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-20'
  },
  {
    slug: 'bhagavad-gita-roadmap',
    category: 'scriptures',
    title: {en: 'Bhagavad Gita Roadmap', hi: 'भगवद् गीता अध्ययन मार्ग'},
    summary: {
      en: 'A staged reading plan for the Gita’s eighteen chapters — what to read, in what order, and why.',
      hi: 'गीता के अठारह अध्यायों की चरणबद्ध अध्ययन योजना — क्या पढ़ें, किस क्रम में, और क्यों।'
    },
    sections: [
      {
        heading: {en: 'How to use this roadmap', hi: 'इस मार्गदर्शिका का उपयोग'},
        body: {
          en: 'Read the Gita in stages, not in one rush. Each stage below pairs a group of chapters with its central question. Read a stage in the Scriptures reader, pause for a day or two, then continue. Re-reading matters more than finishing fast.',
          hi: 'गीता को चरणों में पढ़ें, एक ही बार में समाप्त करने की शीघ्रता न करें। नीचे हर चरण में अध्यायों के समूह के साथ उसका केंद्रीय प्रश्न दिया गया है। ग्रंथ पाठक में एक चरण पढ़ें, एक-दो दिन ठहरें, फिर आगे बढ़ें। शीघ्र समाप्त करने से अधिक महत्वपूर्ण है पुनः पढ़ना।'
        }
      },
      {
        heading: {en: 'Stage 1: The dilemma (chapters 1–2)', hi: 'चरण 1: द्वंद्व (अध्याय 1–2)'},
        body: {
          en: 'Start where Arjuna starts: grief and confusion on the battlefield, then Krishna’s first response — the distinction between the body that perishes and the self that does not. If you read nothing else, read these two chapters carefully.',
          hi: 'वहीं से आरंभ करें जहाँ अर्जुन है — रणभूमि में शोक और मोह, फिर कृष्ण का प्रथम उत्तर — नश्वर शरीर और अविनाशी आत्मा का भेद। यदि और कुछ न पढ़ें तो भी इन दो अध्यायों को ध्यान से पढ़ें।'
        }
      },
      {
        heading: {en: 'Stage 2: Disciplined action (chapters 3–6)', hi: 'चरण 2: अनुशासित कर्म (अध्याय 3–6)'},
        body: {
          en: 'The path of karma yoga: acting with full effort while releasing attachment to results, steadied by meditation and self-control. Ask yourself at each chapter how it applies to one duty in your own life.',
          hi: 'कर्मयोग का मार्ग — पूर्ण निष्ठा से कर्म करते हुए फल की आसक्ति छोड़ना, ध्यान और आत्मसंयम से स्थिर रहना। हर अध्याय पर स्वयं से पूछें कि यह आपके जीवन के किसी एक कर्तव्य पर कैसे लागू होता है।'
        }
      },
      {
        heading: {en: 'Stage 3: Devotion (chapters 7–12)', hi: 'चरण 3: भक्ति (अध्याय 7–12)'},
        body: {
          en: 'The middle six chapters open bhakti yoga: knowing the divine through love, surrender and remembrance. Read slowly here — these chapters are meant to be contemplated, not just understood.',
          hi: 'बीच के छह अध्याय भक्तियोग खोलते हैं — प्रेम, समर्पण और स्मरण से दिव्यता को जानना। यहाँ धीरे पढ़ें — ये अध्याय केवल समझने के लिए नहीं, मनन के लिए हैं।'
        }
      },
      {
        heading: {en: 'Stage 4: Knowledge and discernment (chapters 13–18)', hi: 'चरण 4: ज्ञान और विवेक (अध्याय 13–18)'},
        body: {
          en: 'The final stretch sharpens discernment: the field and its knower, the three qualities of nature, and the closing call to surrender and act. Finish with chapter 18, then return to chapter 2 — you will read it differently now.',
          hi: 'अंतिम भाग विवेक को तीक्ष्ण करता है — क्षेत्र और क्षेत्रज्ञ, प्रकृति के तीन गुण, और समर्पणपूर्वक कर्म का अंतिम आह्वान। अध्याय 18 से समापन करें, फिर अध्याय 2 पर लौटें — अब आप उसे अलग दृष्टि से पढ़ेंगे।'
        }
      },
      {
        heading: {en: 'After the roadmap', hi: 'मार्ग के बाद'},
        body: {
          en: 'One pass is only the beginning. Re-read favourite chapters, discuss them with a teacher or study circle, and only then explore a classical commentary. Note which verses puzzle you — your questions are the real curriculum.',
          hi: 'एक बार पढ़ना केवल आरंभ है। प्रिय अध्यायों को दोहराएँ, शिक्षक या अध्ययन समूह से चर्चा करें, और तभी किसी शास्त्रीय टीका की ओर बढ़ें। जो श्लोक आपको उलझाएँ उन्हें लिख लें — आपके प्रश्न ही वास्तविक पाठ्यक्रम हैं।'
        }
      }
    ],
    diagram: {
      kind: 'sequence',
      title: {en: 'Your reading journey', hi: 'आपकी अध्ययन यात्रा'},
      steps: [
        {
          label: {en: 'Start with the dilemma', hi: 'द्वंद्व से आरंभ'},
          href: '/learn/foundations/dharma',
          detail: {
            en: 'Chapters 1–2: feel the weight of Arjuna’s question.',
            hi: 'अध्याय 1–2: अर्जुन के प्रश्न की गंभीरता को अनुभव करें।'
          }
        },
        {
          label: {en: 'Learn selfless action', hi: 'निष्काम कर्म सीखें'},
          href: '/learn/foundations/karma',
          detail: {
            en: 'Chapters 3–6: act fully, release the fruits.',
            hi: 'अध्याय 3–6: पूर्ण कर्म करें, फल छोड़ दें।'
          }
        },
        {
          label: {en: 'Open the heart', hi: 'हृदय खोलें'},
          href: '/learn/practices/bhakti',
          detail: {
            en: 'Chapters 7–12: devotion and remembrance.',
            hi: 'अध्याय 7–12: भक्ति और स्मरण।'
          }
        },
        {
          label: {en: 'Sharpen discernment', hi: 'विवेक तीक्ष्ण करें'},
          href: '/learn/foundations/atman',
          detail: {
            en: 'Chapters 13–18: knowledge that frees.',
            hi: 'अध्याय 13–18: मुक्त करने वाला ज्ञान।'
          }
        },
        {
          label: {en: 'Re-read and discuss', hi: 'दोहराएँ और चर्चा करें'},
          href: '/learn/scriptures/bhagavad-gita',
          detail: {
            en: 'Return to chapter 2, then seek a teacher or circle.',
            hi: 'अध्याय 2 पर लौटें, फिर शिक्षक या समूह खोजें।'
          }
        }
      ]
    },
    relatedSlugs: ['bhagavad-gita', 'mahabharata', 'dharma', 'karma', 'bhakti'],
    difficulty: 'beginner',
    readingTimeMinutes: 7,
    status: 'draft',
    sources: [
      {kind: 'scripture', label: {en: 'Bhagavad Gita (primary text); verse readings in Scriptures'}},
      {kind: 'editorial', label: {en: 'Editorial summary written for beginners', hi: 'नए पाठकों के लिए संपादकीय सार'}}
    ],
    sourceNotes: 'Sample text; needs review by a knowledgeable editor before being marked reviewed.',
    updatedAt: '2026-09-20'
  }
];
