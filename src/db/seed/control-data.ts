export const roleSeeds = [
  {name: 'visitor', description: 'Can read public content, search, and use limited AI features.'},
  {name: 'user', description: 'Registered user who can bookmark content and track progress.'},
  {name: 'editor', description: 'Can create content and submit drafts for review.'},
  {name: 'reviewer', description: 'Can review content and approve verification.'},
  {name: 'admin', description: 'Can manage users, content, sources, and platform settings.'}
] as const;

export const licenseSeeds = [
  {
    name: 'Public Domain',
    short_name: 'PD',
    url: null,
    allowsRedistribution: true,
    allowsModification: true,
    allowsCommercialUse: true,
    notes: 'No copyright restrictions.'
  },
  {
    name: 'Creative Commons Attribution',
    short_name: 'CC BY',
    url: 'https://creativecommons.org/licenses/by/4.0/',
    allowsRedistribution: true,
    allowsModification: true,
    allowsCommercialUse: true,
    notes: 'Attribution required.'
  },
  {
    name: 'Creative Commons Attribution-ShareAlike',
    short_name: 'CC BY-SA',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/',
    allowsRedistribution: true,
    allowsModification: true,
    allowsCommercialUse: true,
    notes: 'Derivative works must share alike.'
  },
  {
    name: 'Custom Permission',
    short_name: 'Custom',
    url: null,
    allowsRedistribution: false,
    allowsModification: false,
    allowsCommercialUse: false,
    notes: 'Written permission from the rights holder required.'
  },
  {
    name: 'All Rights Reserved',
    short_name: 'ARR',
    url: null,
    allowsRedistribution: false,
    allowsModification: false,
    allowsCommercialUse: false,
    notes: 'Standard copyright; no reuse without permission.'
  }
] as const;

export const appSettingSeeds = [
  {key: 'maintenance_mode', value: 'false', description: 'When true, the platform shows a maintenance notice.'},
  {key: 'default_locale', value: 'en', description: 'Default interface language for new visitors.'},
  {key: 'anonymous_ai_daily_limit', value: '10', description: 'Daily AI questions allowed for anonymous users.'},
  {key: 'registered_ai_daily_limit', value: '50', description: 'Daily AI questions allowed for registered users.'}
] as const;