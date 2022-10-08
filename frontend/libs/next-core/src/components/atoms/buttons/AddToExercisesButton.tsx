import { useAddToExercisesMutation, useTranslate } from '../../../hooks';
import { Button } from './Button';

export const AddToExercisesButton = () => {
  const { t } = useTranslate();

  const { mutate, isLoading } = useAddToExercisesMutation();

  return (
    <Button onClick={() => mutate()} loading={isLoading}>
      {t('action.add_to_exercises')}
    </Button>
  );
};
