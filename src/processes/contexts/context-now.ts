import {now} from '@/shared/lib/date-helper';
import {contextFactory} from './context-factory';

export const ContextNow = contextFactory(now())

