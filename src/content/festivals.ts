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
