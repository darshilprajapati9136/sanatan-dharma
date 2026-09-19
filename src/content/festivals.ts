import type {LocalizedText} from './learn/types';
export interface FestivalGuide {
  slug: string;
  kind: 'festival' | 'vrat';
  title: LocalizedText;
  summary: LocalizedText;
  why: LocalizedText;
  practice: LocalizedText;
  related: string;
  source: {label: string; href: string};
}
export const festivalGuides: FestivalGuide[] = [
  {
    slug: 'diwali',
    kind: 'festival',
    title: {en: 'Diwali', hi: 'दीपावली'},
    summary: {
      en: 'A festival of light, celebrated through diverse regional and family traditions.',
      hi: 'प्रकाश का पर्व, जिसे विभिन्न क्षेत्रीय और पारिवारिक परंपराओं में मनाया जाता है।'
    },
    why: {
      en: 'Many Hindu traditions associate Diwali with renewal and the victory of light over darkness. The stories and forms of worship differ across communities.',
      hi: 'अनेक हिंदू परंपराओं में दीपावली नई शुरुआत और अंधकार पर प्रकाश की विजय से जुड़ी है। कथाएँ और उपासना के रूप समुदायों के अनुसार बदलते हैं।'
    },
    practice: {
      en: 'Learn the story your family or community associates with the festival. Share time with loved ones and consider an act of generosity. Ask a knowledgeable local practitioner about ritual details.',
      hi: 'अपने परिवार या समुदाय में प्रचलित पर्व की कथा जानें। प्रियजनों के साथ समय बिताएँ और उदारता का कोई कार्य करें। अनुष्ठान की विधि स्थानीय जानकार से सीखें।'
    },
    related: '/learn/festivals/diwali',
    source: {
      label: 'Diwali · existing editorial introduction',
      href: '/learn/festivals/diwali'
    }
  },
  {
    slug: 'holi',
    kind: 'festival',
    title: {en: 'Holi', hi: 'होली'},
    summary: {
      en: 'A spring festival of colour and community, with distinctive regional expressions.',
      hi: 'रंगों और सामुदायिक मिलन का वसंत पर्व, जिसके क्षेत्रीय रूप अलग-अलग हैं।'
    },
    why: {
      en: 'Traditions connect Holi with Prahlada and Holika, and with Krishna in Braj. These narratives give different communities their own ways of remembering and celebrating.',
      hi: 'होली की परंपराएँ प्रह्लाद और होलिका की कथा तथा ब्रज में कृष्ण से जुड़ी हैं। अलग-अलग समुदाय इन कथाओं को अपने तरीके से याद करते और मनाते हैं।'
    },
    practice: {
      en: 'Explore the stories before joining a local celebration. Respect others’ consent when playing with colours and follow local guidance for community events.',
      hi: 'स्थानीय उत्सव में भाग लेने से पहले उसकी कथाएँ जानें। रंग खेलने में दूसरों की सहमति का सम्मान करें और सामुदायिक आयोजन के निर्देश मानें।'
    },
    related: '/learn/festivals/holi',
    source: {
      label: 'Holi · existing editorial introduction',
      href: '/learn/festivals/holi'
    }
  },
  {
    slug: 'navratri',
    kind: 'festival',
    title: {en: 'Navratri', hi: 'नवरात्रि'},
    summary: {
      en: 'Nine nights honouring the Divine Feminine, observed with fasting, prayer, music and dance in different regions.',
      hi: 'देवी की उपासना के नौ दिन, जिन्हें विभिन्न क्षेत्रों में उपवास, प्रार्थना, संगीत और नृत्य के साथ मनाया जाता है।'
    },
    why: {
      en: 'Navratri centres on Shakti in her many forms, including Durga, Lakshmi and Saraswati. In eastern India the same season culminates in Durga Puja; in Gujarat it is known for garba and dandiya; in the south, golu displays and Saraswati worship are prominent.',
      hi: 'नवरात्रि में शक्ति के अनेक रूपों — दुर्गा, लक्ष्मी और सरस्वती — की उपासना होती है। पूर्वी भारत में यही समय दुर्गा पूजा के रूप में, गुजरात में गरबा-डांडिया के रूप में, और दक्षिण भारत में गोलू तथा सरस्वती पूजा के रूप में मनाया जाता है।'
    },
    practice: {
      en: 'Follow one simple daily observance, such as lighting a lamp or reading a Devi-related passage. Fasting rules differ widely; participate only in ways that suit your health and confirm local practice with your community.',
      hi: 'कोई एक सरल दैनिक नियम अपनाएँ, जैसे दीप जलाना या देवी से जुड़ा कोई पाठ पढ़ना। उपवास के नियम बहुत भिन्न हैं; स्वास्थ्य के अनुसार ही भाग लें और स्थानीय परंपरा अपने समुदाय से जानें।'
    },
    related: '/learn/practices/puja',
    source: {
      label: 'Drik Panchang · festival calendar (dates vary by year and tradition)',
      href: 'https://www.drikpanchang.com/'
    }
  },
  {
    slug: 'janmashtami',
    kind: 'festival',
    title: {en: 'Janmashtami', hi: 'जन्माष्टमी'},
    summary: {
      en: 'The birth of Krishna, observed with night-time prayer and community celebrations.',
      hi: 'कृष्ण जन्म की स्मृति, जिसे रात्रि प्रार्थना और सामुदायिक उत्सवों के साथ मनाया जाता है।'
    },
    why: {
      en: 'Krishna’s birth in Mathura is remembered through stories from the Bhagavata Purana and Harivamsha. Observance differs across communities: many households fast until midnight, while temple traditions centre on abhisheka and kirtan.',
      hi: 'मथुरा में कृष्ण जन्म की स्मृति भागवत पुराण और हरिवंश की कथाओं से जुड़ी है। पालन के रूप अलग हैं — कई घरों में मध्यरात्रि तक उपवास होता है, जबकि मंदिर परंपराओं में अभिषेक और कीर्तन प्रमुख हैं।'
    },
    practice: {
      en: 'Read or listen to a Krishna-related passage, such as a chapter of the Bhagavad Gita. If visiting a temple at night, follow local timings and guidance.',
      hi: 'कृष्ण से जुड़ा कोई पाठ पढ़ें या सुनें, जैसे भगवद्गीता का कोई अध्याय। रात्रि में मंदिर जाएँ तो स्थानीय समय और निर्देशों का पालन करें।'
    },
    related: '/learn/scriptures/bhagavad-gita',
    source: {
      label: 'Drik Panchang · festival calendar (dates vary by year and tradition)',
      href: 'https://www.drikpanchang.com/'
    }
  },
  {
    slug: 'maha-shivaratri',
    kind: 'festival',
    title: {en: 'Maha Shivaratri', hi: 'महाशिवरात्रि'},
    summary: {
      en: 'A night dedicated to Shiva, kept with vigil, prayer and offerings in temples and homes.',
      hi: 'शिव को समर्पित रात्रि, जिसे मंदिरों और घरों में जागरण, प्रार्थना और अर्पण के साथ मनाया जाता है।'
    },
    why: {
      en: 'Traditions associate this night with Shiva in several ways — including the wedding of Shiva and Parvati — and different communities emphasise different meanings. The common thread is night-time remembrance through vigil and prayer.',
      hi: 'इस रात्रि को परंपराएँ शिव से कई रूपों में जोड़ती हैं — जिनमें शिव-पार्वती विवाह भी शामिल है — और अलग-अलग समुदाय अलग अर्थों पर बल देते हैं। समान सूत्र है रात्रि जागरण और प्रार्थना के माध्यम से स्मरण।'
    },
    practice: {
      en: 'Keep a quiet evening of reflection or visit a Shiva temple if one is nearby. Fasting customs vary; participate as health allows and confirm details locally.',
      hi: 'शांत मनन की संध्या बिताएँ या पास हो तो शिव मंदिर जाएँ। उपवास की परंपराएँ भिन्न हैं; स्वास्थ्य के अनुसार भाग लें और विवरण स्थानीय रूप से जानें।'
    },
    related: '/learn/deities/shiva',
    source: {
      label: 'Drik Panchang · festival calendar (dates vary by year and tradition)',
      href: 'https://www.drikpanchang.com/'
    }
  },
  {
    slug: 'ganesh-chaturthi',
    kind: 'festival',
    title: {en: 'Ganesh Chaturthi', hi: 'गणेश चतुर्थी'},
    summary: {
      en: 'The arrival of Ganesha, celebrated in homes and neighbourhood pandals over ten days in many regions.',
      hi: 'गणेश आगमन का पर्व, जिसे कई क्षेत्रों में घरों और मोहल्लों के पंडालों में दस दिनों तक मनाया जाता है।'
    },
    why: {
      en: 'Ganesha is honoured as the remover of obstacles and the deity invoked first in new beginnings. Public celebrations grew prominently in Maharashtra, while household observance with daily prayer is widespread across India.',
      hi: 'गणेश विघ्नहर्ता और हर शुभारंभ में प्रथम पूज्य माने जाते हैं। सार्वजनिक उत्सव महाराष्ट्र में विशेष रूप से विकसित हुए, जबकि दैनिक प्रार्थना के साथ घरेलू पालन पूरे भारत में प्रचलित है।'
    },
    practice: {
      en: 'Offer daily prayer during the festival days and join a local celebration if one is held nearby. Many communities now choose clay idols and symbolic immersion; follow local environmental guidance for visarjan.',
      hi: 'पर्व के दिनों में दैनिक प्रार्थना करें और पास में आयोजन हो तो स्थानीय उत्सव में भाग लें। कई समुदाय अब मिट्टी की मूर्तियों और प्रतीकात्मक विसर्जन को चुनते हैं; विसर्जन के लिए स्थानीय पर्यावरण निर्देशों का पालन करें।'
    },
    related: '/learn/practices/puja',
    source: {
      label: 'Drik Panchang · festival calendar (dates vary by year and tradition)',
      href: 'https://www.drikpanchang.com/'
    }
  },
  {
    slug: 'makar-sankranti',
    kind: 'festival',
    title: {en: 'Makar Sankranti', hi: 'मकर संक्रांति'},
    summary: {
      en: 'A solar observance marking the sun’s entry into Makara, shared with harvest celebrations across regions.',
      hi: 'सूर्य के मकर राशि में प्रवेश का सौर पर्व, जो क्षेत्रों में फसल उत्सवों के साथ मनाया जाता है।'
    },
    why: {
      en: 'Unlike most Hindu festivals, Makar Sankranti follows the solar calendar. The same season is celebrated as Pongal in Tamil Nadu, Lohri in Punjab, and Uttarayan in Gujarat — each with its own harvest and community customs.',
      hi: 'अधिकांश हिंदू पर्वों से अलग, मकर संक्रांति सौर पंचांग का पालन करती है। यही समय तमिलनाडु में पोंगल, पंजाब में लोहड़ी और गुजरात में उत्तरायण के रूप में मनाया जाता है — प्रत्येक के अपने फसल और सामुदायिक रिवाज हैं।'
    },
    practice: {
      en: 'Acts of generosity, especially food donation, are traditionally associated with this day. Join local harvest or kite-flying events where they are held.',
      hi: 'इस दिन उदारता के कार्य, विशेषकर अन्नदान, परंपरा से जुड़े हैं। जहाँ स्थानीय फसल या पतंग उत्सव हों, उनमें भाग लें।'
    },
    related: '/learn/festivals',
    source: {
      label: 'Drik Panchang · festival calendar (dates vary by year and tradition)',
      href: 'https://www.drikpanchang.com/'
    }
  },
  {
    slug: 'pradosh',
    kind: 'vrat',
    title: {en: 'Pradosh', hi: 'प्रदोष'},
    summary: {
      en: 'A twice-monthly observance dedicated to Shiva on the thirteenth tithi of each fortnight.',
      hi: 'प्रत्येक पक्ष की त्रयोदशी तिथि को शिव को समर्पित, माह में दो बार आने वाला व्रत।'
    },
    why: {
      en: 'Pradosh falls on trayodashi of each lunar fortnight and is associated with twilight worship of Shiva. The weekday it falls on gives it a name — Shani Pradosh, for example — and some traditions attach special significance to these combinations.',
      hi: 'प्रदोष प्रत्येक चांद्र पक्ष की त्रयोदशी को पड़ता है और शिव की संध्या उपासना से जुड़ा है। जिस वार को पड़ता है, उसी से इसका नाम बनता है — जैसे शनि प्रदोष — और कुछ परंपराएँ इन संयोगों को विशेष महत्व देती हैं।'
    },
    practice: {
      en: 'Begin with evening prayer or quiet reflection. Fasting is not required to use this guide. Confirm the observance date with a trusted local calendar, as tithi boundaries shift.',
      hi: 'संध्या प्रार्थना या शांत मनन से शुरुआत करें। इस परिचय के लिए उपवास आवश्यक नहीं है। तिथि की सीमाएँ बदलती रहती हैं, इसलिए व्रत की तिथि विश्वसनीय स्थानीय पंचांग से जाँचें।'
    },
    related: '/learn/practices',
    source: {
      label: 'Drik Panchang · festival calendar (dates vary by year and tradition)',
      href: 'https://www.drikpanchang.com/'
    }
  },
  {
    slug: 'ekadashi',
    kind: 'vrat',
    title: {en: 'Ekadashi', hi: 'एकादशी'},
    summary: {
      en: 'An observance associated with the eleventh tithi of each lunar fortnight.',
      hi: 'प्रत्येक चांद्र पक्ष की ग्यारहवीं तिथि से जुड़ा व्रत।'
    },
    why: {
      en: 'Ekadashi offers a recurring occasion for devotion and reflection. Calendar rules and observance dates can differ between Smarta and Vaishnava traditions.',
      hi: 'एकादशी भक्ति और मनन का नियमित अवसर देती है। स्मार्त और वैष्णव परंपराओं में पंचांग के नियम और व्रत के दिन अलग हो सकते हैं।'
    },
    practice: {
      en: 'Begin with devotional reading or quiet reflection. Fasting is not required to use this guide. Confirm the observance and parana timings with a trusted local calendar and your tradition.',
      hi: 'भक्ति से संबंधित पाठ या शांत मनन से शुरुआत करें। इस परिचय का उपयोग करने के लिए उपवास आवश्यक नहीं है। व्रत और पारण का समय विश्वसनीय स्थानीय पंचांग तथा अपनी परंपरा से जाँचें।'
    },
    related: '/learn/practices',
    source: {
      label: 'Drik Panchang · Ekadashi calendar and tradition distinctions',
      href: 'https://www.drikpanchang.com/vrats/ekadashidates.html'
    }
  }
];
