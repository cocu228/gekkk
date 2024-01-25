import {defineConfig} from 'orval';

export default defineConfig({
	gek: {
		input: {
			target: 'https://api-dev.gekkoin.com/gek/swagger/v1/swagger.json',
		},
		output: {
			client: 'axios-functions',
			tsconfig: './tsconfig.json',
			schemas: './src/shared/(orval)api/gek/model',
			target: './src/shared/(orval)api/gek/index.ts',
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
					path: './src/shared/lib/(orval)axios.ts',
				},
			}
		}
	},
	gate: {
		input: {
			target: './gate-swagger.json',
		},
		output: {
			client: 'axios-functions',
			tsconfig: './tsconfig.json',
			schemas: './src/shared/(orval)api/auth/model',
			target: './src/shared/(orval)api/auth/index.ts',
			override: {
				transformer: (outputSchema) => {
					const methodName = outputSchema.operationName
						.replace(/(get|post|put|delete|patch)/i, 'api')
						.replace(/(Auth)/i, '')
						.replace('V1', '');
					
					return ({
						...outputSchema,
						operationName: methodName
					})
				},
				mutator: {
					path: './src/shared/lib/(orval)axios.ts',
				},
			}
		}
	},
});
