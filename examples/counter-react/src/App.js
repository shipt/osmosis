import Osmosis from '@shipt/osmosis';
import { wrapCounter } from './store';
import Counter from './counter';

export default Osmosis.StoreProvider([wrapCounter], Counter);
