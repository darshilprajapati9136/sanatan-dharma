export interface GitaChapterMeta {
  n: number;
  slug: string;
  title: {en: string; hi: string};
  summary: {en: string; hi: string};
  verses: number;
  available: boolean;
}

export interface GitaVerse {
  n: number;
  speaker: 'dhritarashtra' | 'sanjaya' | 'arjuna' | 'krishna';
  sa: string;
  tr: string;
  en: string;
  hi: string;
}

export const gitaMeta = {
  title: {en: 'Bhagavad Gita', hi: 'भगवद् गीता'},
  description: {
    en: 'The song of the Lord — Krishna’s counsel to Arjuna on the field of Kurukshetra. 18 chapters, 700 verses.',
    hi: 'भगवान का गीत — कुरुक्षेत्र में अर्जुन को श्रीकृष्ण का उपदेश। 18 अध्याय, 700 श्लोक।'
  },
  source: {
    en: 'Mahabharata, Bhishma Parva · Sanskrit text in the public domain; translations here are simple original renderings.',
    hi: 'महाभारत, भीष्म पर्व · संस्कृत पाठ सार्वजनिक; अनुवाद सरल मौलिक भावार्थ हैं।'
  }
};

export const gitaChapters: GitaChapterMeta[] = [
  {n: 1, slug: 'chapter-1', title: {en: 'Arjuna Vishada Yoga', hi: 'अर्जुन विषाद योग'}, summary: {en: 'Arjuna’s grief — both armies gather, and Arjuna sinks down, unwilling to fight his own kin.', hi: 'अर्जुन का विषाद — दोनों सेनाएँ जुटीं, अपने बंधुओं से युद्ध से विमुख अर्जुन शोक में डूबे।'}, verses: 47, available: true},
  {n: 2, slug: 'chapter-2', title: {en: 'Sankhya Yoga', hi: 'सांख्य योग'}, summary: {en: 'The eternal Self, steady wisdom, and the call to act without attachment.', hi: 'अविनाशी आत्मा, स्थितप्रज्ञा और अनासक्त कर्म का उपदेश।'}, verses: 72, available: true},
  {n: 3, slug: 'chapter-3', title: {en: 'Karma Yoga', hi: 'कर्म योग'}, summary: {en: 'The yoga of selfless action — do your duty, free from selfish desire.', hi: 'निष्काम कर्म का योग — फलासक्ति छोड़ कर्तव्य पालन।'}, verses: 43, available: true},
  {n: 4, slug: 'chapter-4', title: {en: 'Jnana Karma Sannyasa Yoga', hi: 'ज्ञान कर्म संन्यास योग'}, summary: {en: 'Knowledge, divine birth, and how action dissolves in wisdom.', hi: 'ज्ञान, दिव्य जन्म और ज्ञान में कर्म का विलय।'}, verses: 42, available: true},
  {n: 5, slug: 'chapter-5', title: {en: 'Karma Sannyasa Yoga', hi: 'कर्म संन्यास योग'}, summary: {en: 'Renunciation and action reconciled — both lead the sincere seeker onward.', hi: 'संन्यास और कर्म का समन्वय — दोनों निष्ठावान साधक को आगे ले जाते हैं।'}, verses: 29, available: true},
  {n: 6, slug: 'chapter-6', title: {en: 'Dhyana Yoga', hi: 'ध्यान योग'}, summary: {en: 'Meditation, mastery of the restless mind, and the true yogi.', hi: 'ध्यान, चंचल मन पर विजय और सच्चा योगी।'}, verses: 47, available: true},
  {n: 7, slug: 'chapter-7', title: {en: 'Jnana Vijnana Yoga', hi: 'ज्ञान विज्ञान योग'}, summary: {en: 'Knowledge and realisation — the Lord as the thread holding all existence.', hi: 'ज्ञान और विज्ञान — समस्त सत्ता को धारण करने वाला सूत्र।'}, verses: 30, available: true},
  {n: 8, slug: 'chapter-8', title: {en: 'Akshara Brahma Yoga', hi: 'अक्षर ब्रह्म योग'}, summary: {en: 'The imperishable Absolute, the cosmic cycles, and remembrance at the final hour.', hi: 'अक्षर ब्रह्म, सृष्टि-चक्र और अंतिम क्षण में स्मरण।'}, verses: 28, available: true},
  {n: 9, slug: 'chapter-9', title: {en: 'Raja Vidya Raja Guhya Yoga', hi: 'राज विद्या राज गुह्य योग'}, summary: {en: 'The royal knowledge — devotion that carries the devotee across.', hi: 'राजविद्या — भक्त को पार लगाने वाली भक्ति।'}, verses: 34, available: true},
  {n: 10, slug: 'chapter-10', title: {en: 'Vibhuti Yoga', hi: 'विभूति योग'}, summary: {en: 'The Lord’s glories — the divine shining through the finest of all things.', hi: 'भगवान की विभूतियाँ — श्रेष्ठतम वस्तुओं में दिव्य प्रकाश।'}, verses: 42, available: true},
  {n: 11, slug: 'chapter-11', title: {en: 'Vishvarupa Darshana Yoga', hi: 'विश्वरूप दर्शन योग'}, summary: {en: 'The vision of the cosmic form — awe, wonder, and surrender.', hi: 'विश्वरूप दर्शन — विस्मय, आश्चर्य और समर्पण।'}, verses: 55, available: true},
  {n: 12, slug: 'chapter-12', title: {en: 'Bhakti Yoga', hi: 'भक्ति योग'}, summary: {en: 'The yoga of devotion — who is dearest to the Lord.', hi: 'भक्ति योग — भगवान को कौन प्रिय है।'}, verses: 20, available: true},
  {n: 13, slug: 'chapter-13', title: {en: 'Kshetra Kshetrajna Vibhaga Yoga', hi: 'क्षेत्र क्षेत्रज्ञ विभाग योग'}, summary: {en: 'The field and its knower — body, Self, and true discernment.', hi: 'क्षेत्र और क्षेत्रज्ञ — शरीर, आत्मा और सच्चा विवेक।'}, verses: 34, available: true},
  {n: 14, slug: 'chapter-14', title: {en: 'Gunatraya Vibhaga Yoga', hi: 'गुणत्रय विभाग योग'}, summary: {en: 'The three gunas — sattva, rajas, tamas — and rising beyond them.', hi: 'तीन गुण — सत्त्व, रज, तम — और उनसे ऊपर उठना।'}, verses: 27, available: true},
  {n: 15, slug: 'chapter-15', title: {en: 'Purushottama Yoga', hi: 'पुरुषोत्तम योग'}, summary: {en: 'The supreme Person — the imperishable beyond tree, root and branch.', hi: 'पुरुषोत्तम — वृक्ष, मूल और शाखा से परे अविनाशी।'}, verses: 20, available: true},
  {n: 16, slug: 'chapter-16', title: {en: 'Daivasura Sampad Vibhaga Yoga', hi: 'दैवासुर संपद् विभाग योग'}, summary: {en: 'Divine and demonic qualities — the two paths a life can take.', hi: 'दैवी और आसुरी संपदा — जीवन के दो मार्ग।'}, verses: 24, available: true},
  {n: 17, slug: 'chapter-17', title: {en: 'Shraddhatraya Vibhaga Yoga', hi: 'श्रद्धात्रय विभाग योग'}, summary: {en: 'Three kinds of faith — in food, worship, charity, and the word Om Tat Sat.', hi: 'तीन प्रकार की श्रद्धा — आहार, पूजा, दान और ॐ तत् सत् में।'}, verses: 28, available: true},
  {n: 18, slug: 'chapter-18', title: {en: 'Moksha Sannyasa Yoga', hi: 'मोक्ष संन्यास योग'}, summary: {en: 'Liberation and surrender — the Gita’s closing call to let go and act.', hi: 'मोक्ष और शरणागति — छोड़ने और कर्म करने का अंतिम आह्वान।'}, verses: 78, available: true}
];

export const speakerLabel: Record<GitaVerse['speaker'], {en: string; hi: string}> = {
  dhritarashtra: {en: 'Dhritarashtra said', hi: 'धृतराष्ट्र बोले'},
  sanjaya: {en: 'Sanjaya said', hi: 'संजय बोले'},
  arjuna: {en: 'Arjuna said', hi: 'अर्जुन बोले'},
  krishna: {en: 'Krishna said', hi: 'श्रीकृष्ण बोले'}
};

export interface GitaChapterDetail {
  n: number;
  title: {en: string; hi: string};
  summary: {en: string; hi: string};
}
