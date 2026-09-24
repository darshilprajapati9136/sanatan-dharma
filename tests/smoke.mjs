import assert from 'node:assert/strict';
const base = process.env.BASE_URL ?? 'http://localhost:3000';
const routes = [
  '',
  '/panchang',
  '/practise',
  '/japa',
  '/japa?mantra=hare-krishna',
  '/scriptures/gita',
  '/scriptures/gita/chapter-1',
  '/scriptures/gita/chapter-18',
  '/explore/mantras',
  '/learn',
  '/learn/foundations/dharma',
  '/learn/scriptures/bhagavad-gita',
  '/explore/festivals',
  '/explore/festivals?kind=vrat',
  '/explore/festivals/ekadashi',
  '/explore/festivals/diwali',
  '/explore/festivals/holi',
  '/search?q=karma',
  '/search?q=%E0%A4%95%E0%A4%B0%E0%A5%8D%E0%A4%AE',
  '/search?q=notfoundxyz',
  '/ask?q=What%20is%20karma',
  '/library',
  '/scriptures',
  '/login',
  '/signup',
  '/about',
  '/privacy',
  '/terms'
];
for (const locale of ['en', 'hi']) {
  for (const route of routes) {
    const res = await fetch(`${base}/${locale}${route}`);
    assert.equal(res.status, 200, `${locale}${route}`);
    const text = await res.text();
    assert.ok(text.includes(`<html lang="${locale}"`));
    assert.ok(
      !text.includes('MISSING_MESSAGE'),
      `${locale}${route}: translation error`
    );
  }
  const auth = await fetch(`${base}/${locale}/profile`, {redirect: 'manual'});
  assert.equal(auth.status, 307);
  assert.ok(auth.headers.get('location')?.includes(`/${locale}/login?next=`));
  const missing = await fetch(`${base}/${locale}/explore/festivals/unknown`);
  assert.ok([200, 404].includes(missing.status));
  const missingHtml = await missing.text();
  assert.ok(missingHtml.includes('404') && missingHtml.includes('noindex'), 'streamed not-found must include noindex and 404 content');
  console.log(
    `${locale}: ${routes.length} pages, protected profile redirect, festival 404 passed`
  );
}
const me = await fetch(`${base}/api/me`);
assert.equal(me.status, 200);
const account = await me.json();
assert.equal(account.data.user, null);
assert.equal(account.data.profile, null);
console.log('Unauthenticated account API exposes no user or profile');
