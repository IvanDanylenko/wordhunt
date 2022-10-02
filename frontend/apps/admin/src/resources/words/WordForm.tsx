import {
  ArrayInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useGetWordSmallestScore,
  useInput,
  validations,
} from '@wordhunt/admin-core';
import { useEffect } from 'react';

const WordScoreInput = () => {
  const { data } = useGetWordSmallestScore();

  const { field } = useInput({ source: 'score' });

  useEffect(() => {
    if (!field.value && data) {
      const newScore = data.smallest_score > 0 ? data.smallest_score - 1 : 0;
      field.onChange(newScore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <TextInput source="score" validate={validations.required} />;
};

export const WordForm = () => {
  return (
    <SimpleForm>
      <TextInput source="name" validate={validations.required} />
      <WordScoreInput />
      <ArrayInput source="translations" defaultValue={[{ name: '' }]}>
        <SimpleFormIterator>
          <TextInput source="word_transcription" />
          <TextInput source="name" />
          <TextInput source="score" defaultValue={0} validate={validations.required} />
          <TextInput source="part_of_speech" defaultValue="noun" />
          <TextInput source="description" />
          <TextInput source="tag" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="examples" defaultValue={[{ name: '' }]}>
        <SimpleFormIterator>
          <TextInput source="name" />
          <TextInput source="translation" />
          <TextInput source="score" defaultValue={0} validate={validations.required} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
};
