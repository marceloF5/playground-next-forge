import {
  captureException,
  startSpan,
  withServerActionInstrumentation,
} from '@sentry/nextjs';

export const GET = async (request: Request): Promise<Response> => {
  return await withServerActionInstrumentation(
    'TEST API',
    { recordResponse: true },
    async () => {
      return await startSpan({ name: 'test-api-transaction' }, async () => {
        try {
          // Pega a URL da requisição e extrai os query params
          const { searchParams } = new URL(request.url);
          const shouldError = searchParams.get('error');

          // Se tiver o parâmetro error, dispara um erro
          if (shouldError) {
            throw new Error('Erro forçado via query parameter');
          }

          // Simulando um delay de 5 segundos
          await new Promise((resolve) => setTimeout(resolve, 5000));

          return new Response('Test completed', { status: 201 });
        } catch (error) {
          captureException(error);
          return new Response('Internal Server Error', { status: 500 });
        }
      });
    }
  );
};
