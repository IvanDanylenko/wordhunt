import { useSaveStatusesMutation, useTranslate } from '../../../hooks';
import { Button } from './Button';

export const SaveStatusesButton = () => {
  const { t } = useTranslate();

  const { mutate, isLoading } = useSaveStatusesMutation();

  return (
    <Button onClick={() => mutate()} loading={isLoading}>
      {t('action.save_statuses')}
    </Button>
  );
};
