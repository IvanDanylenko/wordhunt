import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  List,
  NumberField,
  SingleFieldList,
  TextField,
} from '@wordhunt/admin-core';

export const WordList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <NumberField source="score" />
        <ArrayField source="translations">
          <SingleFieldList linkType={false}>
            <TextField source="name" sx={{ maxWidth: 200 }} />
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="examples">
          <SingleFieldList linkType={false}>
            <TextField source="name" sx={{ maxWidth: 100 }} />
          </SingleFieldList>
        </ArrayField>
        <DateField source="created_at" />
        <DateField source="updated_at" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
