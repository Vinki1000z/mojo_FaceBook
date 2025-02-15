import { useEffect } from 'react';
import type { FacebookUser } from '../types/facebook';

declare global {
  interface Window {
    FB: fb.FacebookStatic;
    fbAsyncInit: () => void;
  }
}

interface FacebookLoginProps {
  onLogin: (user: FacebookUser) => void;
}

export default function FacebookLogin({ onLogin }: FacebookLoginProps) {
  useEffect(() => {
    if (window.FB) return; // Prevent multiple injections

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
    };

    (function (d: Document, s: string, id: string) {
      if (d.getElementById(id)) return;
      const fjs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleLogin = () => {
    if (!window.FB) {
      console.error('Facebook SDK not loaded yet.');
      return;
    }

    window.FB.login(function (response: fb.StatusResponse) {
        if (response.authResponse) {
          window.FB.api('/me', { fields: 'name,picture' }, function (userInfo: any) {
            onLogin({
              ...userInfo,
              accessToken: response.authResponse.accessToken,
            });
          });
        }
      }, { scope: 'read_insights,pages_show_list,pages_read_engagement,pages_read_user_content' });
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
    >
      Login with Facebook
    </button>
  );
}
