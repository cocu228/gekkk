import {now} from '../utils/date-utils';
import {contextFactory} from './context-factory';

export const NowContext = contextFactory(now())

