import { api_endpoint } from '@/src/constants';
import { GraphQLClient, gql } from 'graphql-request';

type LandingPageResponse = {
  landingPages: {
    contactImage: {
      url: string;
    }[];
    doggiesImage: {
      url: string;
    }[];
    menuImage: {
      url: string;
    };
    welcomeText: {
      html: string;
    }[];
  }[];
};
type MenuItem = {
  name: string;
  type: string;
  nazwa: string;
  price: number;
  vegan: boolean;
  alergeny: string | null;
  allergenes: string | null;
  składniki: string;
  ingridients: string;
};

type MenuResponse = {
  menus: {
    items: MenuItem[];
  }[];
};

const graphQLClient = new GraphQLClient(api_endpoint);

export const landingPageSection = async (): Promise<LandingPageResponse> => {
  const query = gql`
    query LandingPage {
      landingPages {
        contactImage {
          url
        }
        doggiesImage {
          url
        }
        menuImage {
          url
        }
        welcomeText {
          html
        }
      }
    }
  `;

  try {
    const response = await graphQLClient.request<LandingPageResponse>(query);
    return response;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
};

export const menuSection = async (): Promise<MenuResponse> => {
  const query = gql`
    query MyQuery {
      menus {
        items
      }
    }
  `;

  try {
    const response = await graphQLClient.request<MenuResponse>(query);
    return response;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
};
