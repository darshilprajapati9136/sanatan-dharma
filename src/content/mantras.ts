export type MantraCategory =
  | 'vedic'
  | 'guru'
  | 'shiva'
  | 'vishnu'
  | 'devi'
  | 'ganesha'
  | 'peace';

export interface Mantra {
  id: string;
  devanagari: string;
  transliteration: string;
  meaning: {en: string; hi: string};
  deity: {en: string; hi: string};
  category: MantraCategory;
  source: {en: string; hi: string};
  suggestedCounts: number[];
}

export const mantraCategories: Record<
  MantraCategory,
  {en: string; hi: string}
> = {
  vedic: {en: 'Vedic', hi: 'वैदिक'},
  guru: {en: 'Guru', hi: 'गुरु'},
  shiva: {en: 'Shiva', hi: 'शिव'},
  vishnu: {en: 'Vishnu · Rama · Krishna', hi: 'विष्णु · राम · कृष्ण'},
  devi: {en: 'Devi', hi: 'देवी'},
  ganesha: {en: 'Ganesha', hi: 'गणेश'},
  peace: {en: 'Peace & Wellbeing', hi: 'शांति एवं कल्याण'}
};

export const mantras: Mantra[] = [
  {
    id: 'gayatri',
    devanagari: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    transliteration: 'Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat',
    meaning: {
      en: 'We meditate on the radiant light of Savitur, the Sun — may it inspire our wisdom.',
      hi: 'हम सविता देव के तेज का ध्यान करते हैं — वह हमारी बुद्धि को प्रेरित करे।'
    },
    deity: {en: 'Savitur (Sun)', hi: 'सविता (सूर्य)'},
    category: 'vedic',
    source: {en: 'Rig Veda 3.62.10', hi: 'ऋग्वेद 3.62.10'},
    suggestedCounts: [11, 108, 1008]
  },
  {
    id: 'mahamrityunjaya',
    devanagari: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥',
    transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Mamritat',
    meaning: {
      en: 'We worship the three-eyed Shiva who nourishes all — free us from death and grant immortality.',
      hi: 'हम त्रिनेत्र शिव की उपासना करते हैं जो सबका पोषण करते हैं — मृत्यु से मुक्त कर अमृत प्रदान करें।'
    },
    deity: {en: 'Shiva', hi: 'शिव'},
    category: 'shiva',
    source: {en: 'Rig Veda 7.59.12', hi: 'ऋग्वेद 7.59.12'},
    suggestedCounts: [11, 108]
  },
  {
    id: 'om-namah-shivaya',
    devanagari: 'ॐ नमः शिवाय ॥',
    transliteration: 'Om Namah Shivaya',
    meaning: {
      en: 'Salutations to Shiva, the auspicious inner Self.',
      hi: 'कल्याणकारी अंतरात्मा शिव को नमस्कार।'
    },
    deity: {en: 'Shiva', hi: 'शिव'},
    category: 'shiva',
    source: {en: 'Panchakshara mantra · Yajur Veda tradition', hi: 'पंचाक्षर मंत्र · यजुर्वेद परंपरा'},
    suggestedCounts: [21, 108, 1008]
  },
  {
    id: 'hare-krishna',
    devanagari: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥',
    transliteration: 'Hare Krishna Hare Krishna, Krishna Krishna Hare Hare, Hare Rama Hare Rama, Rama Rama Hare Hare',
    meaning: {
      en: 'Calling on the divine names of Krishna and Rama with devotion.',
      hi: 'भक्ति भाव से कृष्ण और राम के दिव्य नामों का स्मरण।'
    },
    deity: {en: 'Krishna · Rama', hi: 'कृष्ण · राम'},
    category: 'vishnu',
    source: {en: 'Kali Santarana Upanishad', hi: 'कलिसंतरण उपनिषद्'},
    suggestedCounts: [108, 1008]
  },
  {
    id: 'om-namo-narayana',
    devanagari: 'ॐ नमो नारायणाय ॥',
    transliteration: 'Om Namo Narayanaya',
    meaning: {
      en: 'Salutations to Narayana, the refuge of all beings.',
      hi: 'समस्त प्राणियों के आश्रय नारायण को नमस्कार।'
    },
    deity: {en: 'Vishnu · Narayana', hi: 'विष्णु · नारायण'},
    category: 'vishnu',
    source: {en: 'Ashtakshara mantra · Vaishnava tradition', hi: 'अष्टाक्षर मंत्र · वैष्णव परंपरा'},
    suggestedCounts: [21, 108]
  },
  {
    id: 'sita-ram',
    devanagari: '॥ सीता राम ॥',
    transliteration: 'Sita Ram',
    meaning: {
      en: 'The beloved name of Sita and Rama — simple naam japa for daily remembrance.',
      hi: 'सीता और राम का प्रिय नाम — नित्य स्मरण के लिए सरल नाम जप।'
    },
    deity: {en: 'Sita · Rama', hi: 'सीता · राम'},
    category: 'vishnu',
    source: {en: 'Bhakti naam japa tradition', hi: 'भक्ति नाम-जप परंपरा'},
    suggestedCounts: [108, 1008]
  },
  {
    id: 'ram-ram',
    devanagari: '॥ श्री राम जय राम जय जय राम ॥',
    transliteration: 'Shri Ram Jai Ram Jai Jai Ram',
    meaning: {
      en: 'Victory to Rama — a joyful 13-syllable naam mantra widely chanted daily.',
      hi: 'राम की जय — नित्य जप में प्रचलित आनंदमय तेरह अक्षरों का नाम मंत्र।'
    },
    deity: {en: 'Rama', hi: 'राम'},
    category: 'vishnu',
    source: {en: 'Bhakti tradition · Ram naam japa', hi: 'भक्ति परंपरा · राम नाम जप'},
    suggestedCounts: [108, 1008]
  },
  {
    id: 'om-namo-bhagavate',
    devanagari: 'ॐ नमो भगवते वासुदेवाय ॥',
    transliteration: 'Om Namo Bhagavate Vasudevaya',
    meaning: {
      en: 'Salutations to Bhagavan Vasudeva, the all-pervading Lord.',
      hi: 'सर्वव्यापी भगवान वासुदेव को नमस्कार।'
    },
    deity: {en: 'Krishna · Vasudeva', hi: 'कृष्ण · वासुदेव'},
    category: 'vishnu',
    source: {en: 'Vishnu Purana · Bhagavata tradition', hi: 'विष्णु पुराण · भागवत परंपरा'},
    suggestedCounts: [11, 108]
  },
  {
    id: 'gayatri-devi',
    devanagari: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥',
    transliteration: 'Om Aim Hreem Kleem Chamundayai Vichche',
    meaning: {
      en: 'Seed-syllable salutation to Goddess Chamunda, the fierce protective Mother.',
      hi: 'रक्षा करने वाली उग्र माता चामुण्डा को बीजाक्षर नमस्कार।'
    },
    deity: {en: 'Durga · Chamunda', hi: 'दुर्गा · चामुण्डा'},
    category: 'devi',
    source: {en: 'Devi Mahatmya tradition', hi: 'देवी माहात्म्य परंपरा'},
    suggestedCounts: [11, 108]
  },
  {
    id: 'saraswati',
    devanagari: 'ॐ ऐं सरस्वत्यै नमः ॥',
    transliteration: 'Om Aim Sarasvatyai Namah',
    meaning: {
      en: 'Salutations to Saraswati, goddess of knowledge, music and speech.',
      hi: 'विद्या, संगीत और वाणी की देवी सरस्वती को नमस्कार।'
    },
    deity: {en: 'Saraswati', hi: 'सरस्वती'},
    category: 'devi',
    source: {en: 'Shakta tradition', hi: 'शाक्त परंपरा'},
    suggestedCounts: [11, 108]
  },
  {
    id: 'lakshmi',
    devanagari: 'ॐ श्रीं महालक्ष्म्यै नमः ॥',
    transliteration: 'Om Shreem Mahalakshmyai Namah',
    meaning: {
      en: 'Salutations to Mahalakshmi, bestower of abundance and grace.',
      hi: 'समृद्धि और कृपा देने वाली महालक्ष्मी को नमस्कार।'
    },
    deity: {en: 'Lakshmi', hi: 'लक्ष्मी'},
    category: 'devi',
    source: {en: 'Shri Sukta tradition', hi: 'श्री सूक्त परंपरा'},
    suggestedCounts: [11, 108]
  },
  {
    id: 'ganesha',
    devanagari: 'ॐ गं गणपतये नमः ॥',
    transliteration: 'Om Gam Ganapataye Namah',
    meaning: {
      en: 'Salutations to Ganapati, remover of obstacles and lord of beginnings.',
      hi: 'विघ्नहर्ता, शुभारंभ के स्वामी गणपति को नमस्कार।'
    },
    deity: {en: 'Ganesha', hi: 'गणेश'},
    category: 'ganesha',
    source: {en: 'Ganapati Atharvashirsha tradition', hi: 'गणपति अथर्वशीर्ष परंपरा'},
    suggestedCounts: [11, 108]
  },
  {
    id: 'guru-mantra',
    devanagari: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः । गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः ॥',
    transliteration: 'Gurur Brahma Gurur Vishnu, Gurur Devo Maheshwarah, Guruh Sakshat Param Brahma, Tasmai Shri Gurave Namah',
    meaning: {
      en: 'The Guru is Brahma, Vishnu and Maheshwara — indeed the supreme Brahman itself.',
      hi: 'गुरु ही ब्रह्मा, विष्णु और महेश्वर हैं — साक्षात् परब्रह्म हैं।'
    },
    deity: {en: 'Guru', hi: 'गुरु'},
    category: 'guru',
    source: {en: 'Guru Gita tradition', hi: 'गुरु गीता परंपरा'},
    suggestedCounts: [11, 108]
  },
  {
    id: 'shanti-path',
    devanagari: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय । ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'Om Asato Ma Sadgamaya, Tamaso Ma Jyotirgamaya, Mrityor Ma Amritam Gamaya, Om Shantih Shantih Shantih',
    meaning: {
      en: 'Lead me from untruth to truth, darkness to light, death to immortality. Peace, peace, peace.',
      hi: 'असत्य से सत्य, अंधकार से प्रकाश, मृत्यु से अमृत की ओर ले चलो। शांति, शांति, शांति।'
    },
    deity: {en: 'Universal prayer', hi: 'सार्वभौम प्रार्थना'},
    category: 'peace',
    source: {en: 'Brihadaranyaka Upanishad 1.3.28', hi: 'बृहदारण्यक उपनिषद् 1.3.28'},
    suggestedCounts: [3, 11]
  },
  {
    id: 'pavamana-lokah',
    devanagari: 'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत् ॥',
    transliteration: 'Om Sarve Bhavantu Sukhinah, Sarve Santu Niramayah, Sarve Bhadrani Pashyantu, Ma Kashchid Dukhabhag Bhavet',
    meaning: {
      en: 'May all be happy, healthy and blessed — may none suffer sorrow.',
      hi: 'सभी सुखी, निरोग और कल्याणमय हों — कोई दुःखी न हो।'
    },
    deity: {en: 'Universal prayer', hi: 'सार्वभौम प्रार्थना'},
    category: 'peace',
    source: {en: 'Traditional shanti mantra', hi: 'पारंपरिक शांति मंत्र'},
    suggestedCounts: [3, 11]
  }
];

export function getMantra(id: string): Mantra | undefined {
  return mantras.find((m) => m.id === id);
}
