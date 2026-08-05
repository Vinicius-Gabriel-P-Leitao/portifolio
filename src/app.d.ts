declare global {
	namespace App {
		interface Platform {
			env: {
				GITHUB_TOKEN: string;
				RESEND_TOKEN: string;
				RESEND_FROM_ADDRESS: string;
				RESEND_TO_ADDRESS: string;
			};
		}
	}
}

declare module '*.glsl' {
	const content: string;
	export default content;
}

declare module '*.glsl?raw' {
	const content: string;
	export default content;
}

export {};
