export const authE = new Map<string, { code: string; message: string }>([
  [
    'NotAuthorizedException',
    {
      code: 'NotAuthorizedException',
      message: 'Usuário incorreto ou sessão expirada'
    }
  ],
  [
    'UserNotFoundException',
    { code: 'UserNotFoundException', message: 'O usuário não existe' }
  ],
  [
    'CodeMismatchException',
    {
      code: 'CodeMismatchException',
      message: 'Código de autenticação incorreto'
    }
  ],
  [
    'EnableSoftwareTokenMFAException',
    {
      code: 'EnableSoftwareTokenMFAException',
      message: 'Código de autenticação incorreto'
    }
  ],
  [
    'InvalidParameterException',
    {
      code: 'InvalidParameterException',
      message: 'Formato das informações inválido'
    }
  ],
  [
    'LimitExceededException',
    {
      code: 'LimitExceededException',
      message: 'Limite desta ação foi excedido'
    }
  ],
  [
    'ResourceNotFoundException',
    {
      code: 'ResourceNotFoundException',
      message: 'O recurso solicitado não existe'
    }
  ]
])
