import {defineConfig} from 'orval';

export default defineConfig({
	gek: {
		input: {
			target: 'https://api-dev.gekkoin.com/gek/swagger/v1/swagger.json',
		},
		output: {
			client: 'axios-functions',
			tsconfig: './tsconfig.json',
			schemas: './src/shared/api/(gen)new/model',
			target: './src/shared/api/(gen)new/newApi.ts',
			override: {
				transformer: (outputSchema) => {
					const methodName = outputSchema.operationName
						.replace(/(get|post|put|delete|patch)/i, 'api')
						.replace(/(Wallet|Invest|Market|Referral)/i, '')
						.replace('GekV1', '');
					
					return ({
						...outputSchema,
						operationName: methodName
					})
				},
				mutator: {
					path: './src/shared/lib/(cs)axios-new.ts',
				},
			}
		}
	},
});
