export interface FacebookUser {
    name: string;
    picture?: {
      data: {
        url: string;
        width: number;
        height: number;
      };
    };
    accessToken: string;
  }
  
  export interface FacebookPage {
    id: string;
    name: string;
    access_token: string;
    category: string;
  }
  
  export interface InsightValue {
    value: number;
    end_time: string;
  }
  
  export interface InsightData {
    name: string;
    period: string;
    values: InsightValue[];
    title: string;
    description: string;
  }
  
  export interface DateRange {
    since: Date;
    until: Date;
  }
  