import type { LinkItemProps } from '~/components/organisms/LinksBlock/components/LinkItemBlock';

const text = {
  errorGeneral: 'An error occurred while saving. Please try again.',
};

type Args = {
  links: Array<LinkItemProps>;
};

type ReturnType = {
  error: string | null;
  data: {
    links: Array<LinkItemProps>;
  };
};

const saveLinks = async ({ links }: Args): Promise<ReturnType> => {
  let error = null;
  let data: ReturnType['data'] | null = { links: [] };

  const formattedLinks: Array<LinkItemProps> = links.map(link => ({
    id: link.id,
    type: link.type,
    url: link.url,
  }));

  try {
    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ links: formattedLinks }),
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

export default saveLinks;
