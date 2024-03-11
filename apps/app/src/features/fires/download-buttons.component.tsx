import { Button, Flex } from 'antd';
import download from 'downloadjs';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { spreadSearchParams } from './utils/spread-search-params.util';

export const DownloadButtons = () => {
  const [searchParams] = useSearchParams();
  const [downloadIsLoading, setDownloadIsLoading] = useState<boolean>(false);

  return (
    <div data-cy="download-buttons" style={{ marginBottom: '1rem' }}>
      <Flex gap={8} justify="end">
        <Button
          data-cy="download-current-page"
          onClick={() => {
            const basePath = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
            const args = spreadSearchParams(searchParams);

            const parts: string[] = [];

            for (const [key, value] of Object.entries(args)) {
              parts.push(`${key}=${value}`);
            }

            const url = `${basePath}/v1/fires/download${parts.length > 0 ? `?${parts.join('&')}` : ''}`;

            setDownloadIsLoading(true);
            fetch(url, { method: 'GET' })
              .then((response) => response.blob())
              .then((blob) => download(blob, 'fire-data-one-page.csv'))
              .finally(() => setDownloadIsLoading(false));
          }}
          loading={downloadIsLoading}
          type="primary"
        >
          Download Current Page
        </Button>
        <Button
          onClick={() => {
            const basePath = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
            const args = spreadSearchParams(searchParams);

            // Increase window so all rows are downloaded
            args.page = '1';
            args.page_size = '3000';

            const parts: string[] = [];

            for (const [key, value] of Object.entries(args)) {
              parts.push(`${key}=${value}`);
            }

            const url = `${basePath}/v1/fires/download${parts.length > 0 ? `?${parts.join('&')}` : ''}`;

            setDownloadIsLoading(true);
            fetch(url, { method: 'GET' })
              .then((response) => response.blob())
              .then((blob) => download(blob, 'fire-data-all-pages.csv'))
              .finally(() => setDownloadIsLoading(false));
          }}
          loading={downloadIsLoading}
        >
          Download All Pages
        </Button>
      </Flex>
    </div>
  );
};
