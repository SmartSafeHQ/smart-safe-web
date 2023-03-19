export const authE = new Map<string, { code: string; message: string }>([
  [
    'NotAuthorizedException',
    {
      code: 'NotAuthorizedException',
      message: 'Incorrect User or expired session'
    }
  ],
  [
    'UserNotFoundException',
    {
      code: 'UserNotFoundException',
      message: 'User does not exists'
    }
  ],
  [
    'CodeMismatchException',
    {
      code: 'CodeMismatchException',
      message: 'Authentication code does not match'
    }
  ],
  [
    'EnableSoftwareTokenMFAException',
    {
      code: 'EnableSoftwareTokenMFAException',
      message: 'Authentication code does not match'
    }
  ],
  [
    'InvalidParameterException',
    {
      code: 'InvalidParameterException',
      message: 'Invalid infos format'
    }
  ],
  [
    'LimitExceededException',
    {
      code: 'LimitExceededException',
      message: 'Limit of this action is exceeded'
    }
  ],
  [
    'ResourceNotFoundException',
    {
      code: 'ResourceNotFoundException',
      message: 'The requested resource does not exist'
    }
  ]
])
