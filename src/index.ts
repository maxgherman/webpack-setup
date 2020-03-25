import 'core-js/stable'
import 'regenerator-runtime/runtime'

/* eslint-disable @typescript-eslint/ban-ts-ignore */
//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept()
}
/* eslint-enable @typescript-eslint/ban-ts-ignore */

import { render } from '@app'

render()
