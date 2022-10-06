import { hydrate } from '../../core/lib'
import { getRootComponent } from './lib'

const component = getRootComponent()
hydrate(component)
