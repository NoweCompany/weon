import Messaging from '@/services/Messaging';
import Token from './Token';

const messagingService = new Messaging()

const token = new Token(messagingService)

export { token }