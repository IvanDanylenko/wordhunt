import { FC } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Typography, Tab } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslate } from '../../hooks';
import { ScannerList } from '../organisms';

const TABS = {
  LIST: 'list',
  KNOWN: 'known',
  UNKNOWN: 'unknown',
  CLEAR: 'clear',
};

export const ScannerTemplate: FC = () => {
  const { t } = useTranslate();
  const router = useRouter();

  const handleChangeTab = (e: unknown, newValue: string) => {
    router.push(newValue, newValue, { shallow: true });
  };

  return (
    <Grid item container sm={9} flexDirection={{ sm: 'column' }}>
      <TabContext value={(router.query.scannerPage as string) || TABS.LIST}>
        <TabList
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChangeTab}
          sx={{
            mt: { xs: 3, sm: 0 },
            '.firstLetter:first-letter': { textTransform: 'uppercase' },
            '.MuiButtonBase-root': {
              transition: 'color 0.3s',
              color: 'text.primary',
              ':hover': { color: 'primary.main' },
            },
          }}
        >
          <Tab
            aria-label={t('scanner.list')}
            label={
              <Typography
                className="firstLetter"
                textTransform="lowercase"
                variant="body1"
                fontWeight={600}
              >
                {t('scanner.list')}
              </Typography>
            }
            value={TABS.LIST}
          />
          <Tab
            aria-label={t('scanner.known')}
            label={
              <Typography
                className="firstLetter"
                textTransform="lowercase"
                variant="body1"
                fontWeight={600}
              >
                {t('scanner.known')}
              </Typography>
            }
            value={TABS.KNOWN}
          />
          <Tab
            aria-label={t('scanner.unknown')}
            label={
              <Typography
                className="firstLetter"
                textTransform="lowercase"
                variant="body1"
                fontWeight={600}
              >
                {t('scanner.unknown')}
              </Typography>
            }
            value={TABS.UNKNOWN}
          />
          <Tab
            aria-label={t('scanner.clear')}
            label={
              <Typography
                className="firstLetter"
                textTransform="lowercase"
                variant="body1"
                fontWeight={600}
              >
                {t('scanner.clear')}
              </Typography>
            }
            value={TABS.CLEAR}
          />
        </TabList>
        <TabPanel value={TABS.LIST} sx={{ width: 1, pt: { sm: 3 } }}>
          <ScannerList />
        </TabPanel>

        <TabPanel value={TABS.KNOWN} sx={{ width: 1, pt: { sm: 3 } }}>
          123
        </TabPanel>

        <TabPanel value={TABS.UNKNOWN} sx={{ width: 1, pt: { sm: 3 } }}>
          44
        </TabPanel>
        <TabPanel value={TABS.CLEAR} sx={{ width: 1, pt: { sm: 3 } }}>
          55
        </TabPanel>
      </TabContext>
    </Grid>
  );
};
