import Router from './index';

import { signup, signin, check } from '../controllers/users';
import { vaildateUser, schemas } from '../helpers/users';
import { passportJwt, passportLocal } from './index';

Router
    .route('/signup')
    .post(vaildateUser(schemas.authSchema), signup);

Router
    .route('/signin')
    .post(vaildateUser(schemas.authSchema), passportLocal, signin);

Router
    .route('/check')
    .get(passportJwt, check);

export default Router;