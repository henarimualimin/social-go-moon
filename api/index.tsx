import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { pinata } from 'frog/hubs';
import { neynar } from 'frog/middlewares';
import { serveStatic } from 'frog/serve-static';
import { handle } from 'frog/vercel';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// };

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  })
);

app.frame('/', (c) => {
  const { status, frameData } = c;

  console.log('frameData:', frameData);

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#800080', // Latar belakang hitam
          display: 'flex',  // Menambahkan display: flex
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            backgroundColor: '#800080', // Latar belakang ungu
            borderRadius: '10px',
            color: '#FFFFFF', // Teks putih
            fontSize: 56,
            padding: '20px',
            fontWeight: 'bolder', // Teks lebih tebal
            whiteSpace: 'pre-wrap',
            display: 'flex',  // Menambahkan display: flex di sini
            flexDirection: 'column',  // Untuk memastikan anak-anak berada dalam kolom
            alignItems: 'center', // Menyusun teks dan emotikon secara vertikal di tengah
          }}
        >
          <div
            style={{
              fontSize: '244px', 
            }}
          >
            ✌️
          </div>
          {status === 'response' ? `Claim $SOCIAL` : ' SOCIAL To $1 '}
        </div>
      </div>
    ),
    intents: [
      // Tombol Claim $SOCIAL langsung mengarah ke halaman compose
      <Button.Link
        href="https://warpcast.com/~/compose?text=✌️ $SOCIAL To 1 ✌️$%20Via @0xhen&embeds[]=https://social-go-moon.vercel.app/api"
      >
        Cast It
      </Button.Link>,
    ],
  });
});


devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
