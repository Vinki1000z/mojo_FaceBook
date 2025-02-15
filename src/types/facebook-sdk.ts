// src/types/facebook-sdk.ts
export interface FacebookPictureData {
    data: {
      url: string;
      width: number;
      height: number;
    };
  }
  
  export interface FacebookUserInfo {
    id: string;
    name: string;
    picture: FacebookPictureData;
  }
  
  export interface FacebookAuthResponse {
    accessToken: string;
    expiresIn: number;
    reauthorize_required_in?: number;
    signedRequest: string;
    userID: string;
  }
  
  export interface FacebookLoginStatusResponse {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse: FacebookAuthResponse | null;
  }