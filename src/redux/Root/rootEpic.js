import React from 'react'
import { combineEpics } from 'redux-observable'
import {highlightsEpic} from '../Epics/highlightsEpic'


export const rootEpic = combineEpics(
  highlightsEpic
);
