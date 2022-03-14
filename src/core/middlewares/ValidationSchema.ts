import * as jwt from 'jsonwebtoken';
import config from '../../../config/config';

export const schemaEmpty = {};

export const schemaGetProcedureType = {
  userId: {
    isLength: {
      errorMessage: 'El id del usuario es obligatorio.',
      options: { min: 1 }
    },
    isInt: {
      options: {
        min: 1,
        max: 999999
      }
    },
    errorMessage: 'Valor inválido.'
  },

  userTypeId: {
    isLength: {
      errorMessage: 'El tipo de usuario es obligatorio.',
      options: { min: 1 }
    },
    isInt: {
      options: {
        min: 1,
        max: 4
      }
    },
    errorMessage: 'Valor inválido.'
  }
};

export const schemaGetPersonalInformation = {
  userId: {
    custom: {
      options: (value: any, { req }: any) => {
        const jwtPayload = <any>jwt.verify(req.headers.authorization, config.jwtSecret, {
          algorithms: ['HS512']
        });
        if (jwtPayload.usuario.id != value) {
          return false;
        } else if (!value) {
          return false;
        }
        return true;
      },
      errorMessage: 'No posee permisos para el recurso.'
    },
    isLength: {
      errorMessage: 'El id del usuario es obligatorio.',
      options: { min: 1 }
    },
    isInt: {
      options: {
        min: 1,
        max: 999999
      }
    },
    errorMessage: 'Valor inválido.'
  }
};

export const schemaGetDeceasedInformation = {
  cuil: {
    isLength: {
      errorMessage: 'El cuil es obligatorio.',
      options: { min: 11, max: 11 }
    }
  }
};

export const schemaApplicantProcedureValidation = {
  applicantCuil: {
    isLength: {
      errorMessage: 'El cuil del solicitante es obligatorio.',
      options: { min: 11, max: 11 }
    }
  },
  deceasedCuil: {
    isLength: {
      errorMessage: 'El cuil del causante es obligatorio.',
      options: { min: 11, max: 11 }
    }
  }
};

export const schemaGetHealthInsurance = {
  procedureTypeId: {
    isInt: {
      errorMessage: 'Valor inválido.',
      options: { min: 30, max: 33 }
    }
  },
  internalNumber: {
    isInt: {
      errorMessage: 'El nro. interno es obligatorio.',
      options: { min: 1 }
    }
  }
};

export const schemaRegisterActivationBenefit = {
  /*  declaracion: {
    isBoolean: {
      errorMessage: 'Valor inválido.',
      options: { value = true }
    }
  },
  nroInterno: {
    isInt: {
      errorMessage: 'El nro. interno es obligatorio.',
      options: { min: 1 }
    }
  }*/
};

export const SchemaValidation = {
  schemaGetDeceasedInformation,
  schemaGetPersonalInformation,
  schemaGetProcedureType,
  schemaEmpty,
  schemaGetHealthInsurance,
  schemaApplicantProcedureValidation
};
