import Auth from '@/services/Auth';

import Token from './Token';
import Collection from './Collection'
import Field from './Fields'
import Value from './Values';
import Download from './download';
import Upload from './Upload';

const auth = new Auth()

const token = new Token()
const collection = new Collection(auth)
const field = new Field(auth)
const value = new Value(auth)
const download = new Download(auth)
const upload = new Upload(auth)

export { token, collection, field, value, download, upload }