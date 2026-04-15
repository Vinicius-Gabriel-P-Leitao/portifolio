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

export {};
