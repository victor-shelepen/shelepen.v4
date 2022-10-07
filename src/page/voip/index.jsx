import { inject } from '../../core/lib'
import { getRootComponent } from './lib'

const component = getRootComponent()
inject(component)
