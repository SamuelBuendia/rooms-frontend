// Spain
export const locale = {
  lang: 'es',
  data: {
    TRANSLATOR: {
      SELECT: 'Elige tu idioma',
    },
    AUTH: {
      GENERAL: {
        OR: 'O',
        SUBMIT_BUTTON: 'Enviar',
        NO_ACCOUNT: 'No tienes una cuenta?',
        SIGNUP_BUTTON: 'Regístrate',
        FORGOT_BUTTON: 'Se te olvidó tu contraseña',
        SIGN_IN: 'Iniciar',
        SIGN_OUT: 'Salir',
        BACK_BUTTON: 'Espalda',
        PRIVACY: 'Intimidad',
        LEGAL: 'Legal',
        TERMS: 'Términos',
        CONTACT: 'Contacto',
      },
      LOGIN: {
        TITLE: 'Crear una cuenta',
        BUTTON: 'Registrarse',
      },
      FORGOT: {
        TITLE: 'Contraseña olvidada?',
        DESC: 'Ingrese su correo electrónico para restablecer su contraseña',
        SUCCESS: 'Your account has been successfully reset.'
      },
      REGISTER: {
        TITLE: 'Sign Up',
        DESC: 'Enter your details to create your account',
        SUCCESS: 'Your account has been successfuly registered.'
      },
      INPUT: {
        EMAIL: 'Email',
        FULLNAME: 'Fullname',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm Password',
        USERNAME: 'Usuario'
      },
      VALIDATION: {
        INVALID: '{{name}} is not valid',
        REQUIRED: '{{name}} is required',
        MIN_LENGTH: '{{name}} minimum length is {{min}}',
        AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
        NOT_FOUND: 'The requested {{name}} is not found',
        INVALID_LOGIN: 'Datos de login incorrectos',
        REQUIRED_FIELD: 'Required field',
        MIN_LENGTH_FIELD: 'Minimum field length:',
        MAX_LENGTH_FIELD: 'Maximum field length:',
        INVALID_FIELD: 'Field is not valid',
        USERNAME: 'Correo electrónico',
        PASSWORD: 'Contraseña'
      }
    },
    DASHBOARD: {
      DASHBOARD: 'Tablero',
    },
    USER: {
      USER: 'Usuario',
      USERS: 'Usuarios',
      ID: 'Id',
      USERNAME: 'Username',
      EMAIL: 'Email',
      DATE_JOINED: 'Fecha Registro',
      IS_ACTIVATE: 'Activo?' ,
      STATUS: 'Status' ,
      PASSWORD: 'Contraseña',
      FIRST_NAME: 'Nombre',
      LAST_NAME: 'Apellido',
      PERMISSIONS: 'Permisos',
      GROUPS: 'Grupos',
      IS_STAFF: 'Staff?',
      IS_SUPERUSER: 'Super Usuario?',
    },
    FUNCTIONARY: {
      FUNCTIONARY: 'Funcionario',
      FUNCTIONARYS: 'Funcionarios',
      ID: 'Id',
      NAME: 'Nombre',
      LAST_NAME: 'Apellido',
      IDENTIFICATION_NUMBER: 'Numero Documento',
      PHONE: 'Celular',
      MOBILE: 'Teléfono',
      ADDRESS: 'Dirección',
      INSTITUTIONAL_EMAIL: 'Email Institucional',
      PERSONAL_EMAIL: 'Email Personal',
      BIRTH_DATE: 'Fecha Nacimiento',
      PROFESSION: 'Profesión',
      ACTIVE: 'Activo',
      USER: 'Usuario',
    },
    SPACE: {
      SPACE: 'Espacio',
      SPACES: 'Espacios',
      ID: 'Id',
      NAME: 'Nombre Espacio',
      NUMBER_ROOM: 'Número Espacio',
      DESCRIPTION: 'Descripción',
      ACTIVE: 'Activo',
      FUNCTIONARY: 'Encargado',
      FUNCTIONARYS: 'Estudiantes',
      ROOMS: 'Salas'
    },
    ROOM: {
      ROOM: 'Sala',
      ROOMS: 'Salas',
      ID: 'Id',
      NAME: 'Nombre Sala',
      NUMBER_ROOM: 'Número Sala',
      DESCRIPTION: 'Descripción',
      ACTIVE: 'Activo',
      FUNCTIONARY: 'Encargado',
      SPACE: 'Espacio',
      FOLDERS: 'Carpetas',
    },
    FOLDER: {
      FOLDER: 'Carpeta',
      FOLDERS: 'Carpetas',
      ID: 'Id',
      NAME: 'Nombre Carpeta',
      EXPIRATION_DATE: 'Fecha Vencimiento',
      GUIDE_FILE: 'Adjunto Guía',
      DESCRIPTION: 'Descripción',
      ACTIVE: 'Activo',
      FUNCTIONARY: 'Encargado',
      ROOM: 'Sala',
    },
    EVIDENCE: {
      EVIDENCE: 'Evidencia',
      EVIDENCES: 'Evidencias',
      ID: 'Id',
      OBSERVATION: 'Observación / Escrito',
      EVIDENCE_LINK: 'Link Evidencia',
      QUALIFICATION: 'Calificación',
      RE_EXPIRATION_DATE: 'Plazo Máximo',
      EVIDENCE_FILE: 'Archivo Evidencia',
      ACTIVE: '¿Activo?',
      FUNCTIONARY: 'Estudiante',
      FOLDER: 'Carpeta',
    },
    PERMISSION: {
      PERMISSION: 'Permiso',
      PERMISSIONS: 'Permisos',
      ID: 'Id',
      NAME: 'Nombre',
      CONTENT_TYPE: 'Tipo Contenido',
      CODENAME: 'Nombre Clave',
    },
    CONTENT_TYPE: {
      CONTENT_TYPE: 'Tipo Contenido Permiso',
      CONTENT_TYPES: 'Tipos Contenido Permisos',
      ID: 'Id',
      APP_LABEL: 'Etiqueta de la Aplicación',
      MODEL: 'Modelo',
    },
    GROUP: {
      GROUP: 'Grupo',
      GROUPS: 'Grupos',
      ID: 'Id',
      NAME: 'Nombre',
      PERMISSIONS: 'Permisos'
    },
    COMMON: {
      ID: 'ID',
      SELECTED_RECORDS_COUNT: 'Selected records count: ',
      ALL: 'Todo',
      SUSPENDED: 'Suspendido',
      ACTIVE: 'Activo',
      ACTIVES: 'Activos',
      INACTIVES: 'Inactivos',
      FILTER: 'Filtro',
      FILTERS: 'Filtros',
      BY_STATUS: 'by Status',
      BY_TYPE: 'by Type',
      BUSINESS: 'Business',
      INDIVIDUAL: 'Individual',
      SEARCH: 'Buscar',
      IN: 'en',
      IN_ALL_FIELDS: 'in all fields',
      NEW: 'Nuevo',
      NEWS: 'Nuevos',
      TOTAL: 'Total',
      TRANSFER: 'Transferir',
      EDIT: 'Editar',
      DELETE: 'Eliminar',
      ACTION: 'Acción',
      NO_ITEMS_FOUND: 'Registros no encontrados',
      BACK: 'Volver',
      RESET: 'Resetear',
      BASIC_INFO: 'Información Básica',
      LIST: 'Listado',
      CANCEL: 'Cancelar',
      SAVE: 'Guardar',
      SAVE_AND_EXIT: 'Guardar y Salir',
      SAVE_AND_NEW: 'Guardar y Nuevo',
      EXPORT: 'Exportar',
      CONFIRMATION: 'Confirmación',
      VERIFICATION: 'Verificación',
      MESSAGE_CONFIRM_DELETE: '¿Estás seguro que deseas eliminar?',
      MESSAGE_VERIFICATION_VOUCHER: '¿Estás seguro de verificar este comprobante?',
      MESSAGE_FACTURE_VOUCHER_AND_PACKINGS: '¿Estás seguro de facturar este comprobante y sus envases?',
      ENTER: 'Ingrese',
      PLEASE_ENTER: 'Por favor ingrese',
      IS_REQUIRED: 'es Requerido',
      WAS_ENTERED_CORRECT: 'ingresado correctamente',
      SHOULD_HAVE_LEAST: 'debería tener mínimo',
      SHOULD_HAVE_MAXIMUM: 'debería tener máximo',
      SHOWING: 'Mostrando',
      SHOW: 'Mostar',
      ASSIGNED_TO_ME: 'Asignados a mí',
      FROM: 'de',
      TO: 'a',
      OF: 'de',
      RECORDS: 'Registros',
      TODAY: 'Hoy',
      WELCOME_TO: 'Bienvenido a',
      CHOOSE: 'Eligir',
      HI: 'Hola',
      CREATED_AT: 'Creado en',
      YES: 'Si',
      NO: 'No',
      ASIGN: 'Asignar',
      ADMINISTRATION: 'Administración',
      TESTING: 'Prueba',
      UPLOAD: 'Subir',
      ADD_ALL: 'AGREGAR TODOS',
      ADD_SELECTED: 'AGREGAR SELECCIONADOS',
      ADD: 'Agregar'
    },
  }
};


