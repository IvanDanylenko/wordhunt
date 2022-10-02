import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  SingleFieldList,
  TextField,
} from '@wordhunt/admin-core';

export const WordList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="pinin" />
        <NumberField source="score" />
        <ArrayField source="translations">
          <SingleFieldList>
            <ChipField source="id" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="examples">
          <SingleFieldList>
            <ChipField source="id" />
          </SingleFieldList>
        </ArrayField>
        <DateField source="created_at" />
        <DateField source="updated_at" />
      </Datagrid>
    </List>
  );
};
