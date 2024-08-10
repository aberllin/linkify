import type { LinkItemProps } from '~/components/organisms/LinksBlock/components/LinkItemBlock';

const text = {
  errorGeneral:
    'Something went wrong fetching your links. Please refresh the page.',
};

type ReturnType = {
  error: string | null;
  data: {
    links: Array<LinkItemProps>;
  };
};

const getLinks = async (): Promise<ReturnType> => {
  let error = null;
  let data: ReturnType['data'] | null = { links: [] };

  try {
    const response = await fetch('/api/links', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      error = text.errorGeneral;
    } else {
      const responseData = await response.json();

      const convertedLinks: Array<LinkItemProps> = responseData.map(
        (link: LinkItemProps) => ({
          id: link.id,
          type: link.type,
          url: link.url,
        }),
      );

      data = {
        links: convertedLinks,
      };
    }
  } catch (e) {
    // Ideally send it to some bug reporter
    error = text.errorGeneral;
  }

  return { error, data };
};

export default getLinks;
