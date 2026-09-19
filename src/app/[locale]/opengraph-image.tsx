import {ImageResponse} from 'next/og';

export const runtime = 'edge';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function OgImage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const hi = locale === 'hi';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#2c130d',
          color: '#f5e4c2'
        }}
      >
        <div style={{fontSize: 40, letterSpacing: 6, opacity: 0.85}}>
          {hi ? 'सनातन धर्म' : 'SANATAN DHARMA'}
        </div>
        <div style={{fontSize: 72, marginTop: 16, lineHeight: 1.15}}>
          {hi ? 'प्रतिदिन का साथी' : 'Your daily companion'}
        </div>
        <div style={{fontSize: 30, marginTop: 24, opacity: 0.75}}>
          {hi ? 'समझें · अभ्यास करें · सीखें' : 'Understand · Practise · Learn'}
        </div>
      </div>
    ),
    {...size}
  );
}
