import { useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useTranslate } from '../../../hooks';
import { fetchClient, tokenManager } from '../../../providers';
import { Link, SubmitButton, TextInput } from '../../atoms';
import { Form } from './Form';

const loginSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(8).required(),
  })
  .required();

type LoginSchema = yup.InferType<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();

  const { t } = useTranslate();

  const handleSubmitForm = useCallback(
    async (values: LoginSchema) => {
      const {
        data: { access_token, refresh_token },
      } = await fetchClient.post('/login', values);

      tokenManager.setTokenAndRefreshToken(access_token, refresh_token);
      router.push('/');
    },
    [router],
  );

  return (
    <Form validationSchema={loginSchema} onSubmit={handleSubmitForm}>
      <Grid container alignItems="center" flexDirection="column">
        <Typography variant="h2" component="h1" mb={3}>
          {t('credentials.login')}
        </Typography>

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
            href="/forgot-password"
            aria-label={t('credentials.forgot_password')}
            variant="body2"
            fontWeight={600}
            underline="none"
          >
            {t('credentials.forgot_password')}
          </Link>
        </Grid>

        <SubmitButton aria-label={t('credentials.sign_in')} fullWidth>
          {t('credentials.sign_in')}
        </SubmitButton>
      </Grid>
    </Form>
  );
};
