import {createHttpSchema, t} from 'http-schemas';
import {createHttpClient} from 'http-schemas/client';

const baseURL = 'http://10.7.14.10' //import.meta.env.GEKKOIN_REACT_AUTH_URL

export default createHttpClient(createHttpSchema({

    'GET /api/v1/promo-code/:code': {
        responseBody: t.object({
            status: t.brandedString('ok')
        }),
    }

}), {baseURL});
