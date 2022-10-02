import { useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { fetchClient, tokenManager } from '../../../providers';
import { Link, SubmitButton, TextInput } from '../../atoms';
import { Form } from './Form';
import { useTranslate } from '../../../hooks';

const registerSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(8).required(),
  })
  .required();

type RegisterSchema = yup.InferType<typeof registerSchema>;

export const RegisterForm = () => {
  const router = useRouter();

  const { t } = useTranslate();

  const handleSubmitForm = useCallback(
    async (values: RegisterSchema) => {
      const {
        data: { access_token, refresh_token },
      } = await fetchClient.post('/register', values);

      tokenManager.setTokenAndRefreshToken(access_token, refresh_token);
      router.push('/');
    },
    [router],
  );

  return (
    <Form validationSchema={registerSchema} onSubmit={handleSubmitForm}>
      <Grid container alignItems="center" flexDirection="column">
        <Typography variant="h2" component="h1" mb={3}>
          {t('credentials.register')}
        </Typography>

        <Grid item container flexDirection="column" gap={0.5} mb={3}>
          <Typography variant="body2" fontWeight={600}>
            {t('credentials.name')}
          </Typography>
          <TextInput name="name" placeholder={t('credentials.name')} />
        </Grid>

        <Grid item container flexDirection="column" gap={0.5} mb={3}>
          <Typography variant="body2" fontWeight={600}>
            {t('credentials.email')}
          </Typography>
          <TextInput name="email" type="email" placeholder={t('credentials.email')} />
        </Grid>

        <Grid item container flexDirection="column" gap={0.5}>
          <Typography variant="body2" fontWeight={600}>
            {t('credentials.password')}
          </Typography>
          <TextInput name="password" type="password" placeholder={t('credentials.password')} />
        </Grid>

        <Grid container justifyContent="flex-end" my={3}>
          <Link
            href="/login"
            aria-label={t('credentials.login')}
            variant="body2"
            fontWeight={600}
            underline="none"
          >
            {t('credentials.login')}
          </Link>
        </Grid>

        <SubmitButton aria-label={t('credentials.register')} fullWidth>
          {t('credentials.register')}
        </SubmitButton>
      </Grid>
    </Form>
  );
};
