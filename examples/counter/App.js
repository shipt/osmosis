import {StoreProvider} from 'osmosis';
import {wrapCounter} from './store';
import Counter from './counter';

export default StoreProvider([wrapCounter], Counter);
