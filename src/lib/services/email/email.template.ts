import type { EmailPayload } from '$lib/services/email.service';

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function buildEmailHtml(payload: EmailPayload): string {
	const name = escapeHtml(payload.name);
	const email = escapeHtml(payload.email);
	const message = escapeHtml(payload.message);
	const time = escapeHtml(payload.time);

	return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nova mensagem de ${name}</title>
  </head>

  <body style="margin:0;padding:0;background-color:#18181b;font-family:system-ui,-apple-system,Arial,sans-serif;">
    <!-- Preview text (hidden) -->
    <span style="display:none;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
      Nova mensagem enviada pelo formulário de contato de ${name}
    </span>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#18181b;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table
            role="presentation"
            width="560"
            cellpadding="0"
            cellspacing="0"
            style="max-width:560px;width:100%;background-color:#27272a;border-radius:8px;overflow:hidden;"
          >
            <!-- Header -->
            <tr>
              <td style="background-color:#18181b;padding:24px 32px;">
                <p
                  style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#71717a;"
                >
                  Nova mensagem recebida
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <!-- Sender -->
                <p style="margin:0 0 4px 0;font-size:22px;font-weight:700;color:#e4e4e7;">${name}</p>

                <p style="margin:0 0 16px 0;font-size:14px;color:#71717a;">${email}</p>

                <p style="margin:0 0 24px 0;font-size:12px;color:#a1a1aa;">${time}</p>

                <hr style="border:none;border-top:1px solid #3f3f46;margin:0 0 24px 0;" />

                <!-- Message -->
                <p style="margin:0;font-size:15px;line-height:1.6;color:#e4e4e7;white-space:pre-line;">${message}</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 32px 24px;border-top:1px solid #3f3f46;">
                <p style="margin:0;font-size:12px;color:#71717a;">Enviado via formulário de contato — ${time}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
