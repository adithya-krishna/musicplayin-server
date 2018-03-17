import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

import { Tab } from '../models/tabs';
import { wrapResponse } from '../controllers/users';

export const submitTab = async (req, res, next) => {
    const { tabInfo, text, lyric, chords } = req.valid.body;

    const newTab = new Tab({ tabInfo, text, lyric, chords });
    await newTab.save();
    const createdTab = pick(newTab, ['id', 'tabInfo', 'text', 'lyric', 'chords', 'createdAt', 'updatedAt']);
    const response = { msg: `Tab created` };
    return res
        .json(wrapResponse(createdTab, response));
}

export const getAllTabs = async (req, res, next) => {
    const allTabs = await Tab.find().limit(10);
    return res
        .json(allTabs);
}

export const getTabById = async (req, res, next) => {
    const { id } = req.params;
    const currentTab = await Tab.findById(id);
    return res
        .json(currentTab);
}

export const deleteTab = async (req, res, next) => {
    const { id } = req.params;
    const currentTab = await Tab.findByIdAndUpdate(id, { isDeleted: true });
    return res
        .json(currentTab);
}

export default {
    submitTab,
    getAllTabs,
    getTabById,
    deleteTab
}