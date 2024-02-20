import Messaging from '@/services/Messaging';
import Auth from './Auth';

const messaging = new Messaging()
const auth = new Auth()

export { messaging, auth }