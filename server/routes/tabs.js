import express from 'express';
import Router from '../routes';

import { submitTab, getAllTabs, getTabById, deleteTab, updateTab } from '../controllers/tabs';
import { vaildateTab, schemas } from '../helpers/tabs';
import { passportJwt } from './index';

Router
    .route('/tab')
    .post(vaildateTab(schemas.tabSchema), passportJwt, submitTab);

Router
    .route('/tabs')
    .get(passportJwt, getAllTabs);

Router
    .route('/tab/:id')
    .get(passportJwt, getTabById);

Router
    .route('/tab/:id')
    .delete(deleteTab);

export default Router;