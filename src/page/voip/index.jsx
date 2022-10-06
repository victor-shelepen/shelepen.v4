import { hydrate } from '../../lib'
import { getRootComponent } from './lib'

const component = getRootComponent()
hydrate(component)
