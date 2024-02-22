import Messaging from '@/services/Messaging';
import Auth from '@/services/Auth';

import Token from './Token';
import Collection from './Collection'
import Field from './Fields'
import Value from './Values';

const messagingService = new Messaging()
const auth = new Auth()

const token = new Token(messagingService)
const collection = new Collection(messagingService, auth)
const field = new Field(messagingService, auth)
const value = new Value(messagingService, auth)

export { token, collection, field, value }