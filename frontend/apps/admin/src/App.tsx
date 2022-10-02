import { Admin, providersCreator, queryClient, RESOURCE, Resource } from '@wordhunt/admin-core';
import { BrowserRouter } from 'react-router-dom';
import words from './resources/words';

const providers = providersCreator();

export const App = () => {
  return (
    <BrowserRouter>
      <Admin {...providers} queryClient={queryClient} requireAuth>
        <Resource name={RESOURCE.WORDS} {...words} />
      </Admin>
    </BrowserRouter>
  );
};
