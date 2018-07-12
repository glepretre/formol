export default {
  // General
  yes: 'Oui',
  no: 'Non',
  submit: 'Envoyer',
  cancel: 'Annuler',
  required: 'Veuillez renseigner ce champ',
  // CalendarField
  calendar: {
    dateFormat: 'DD/MM/YYYY',
    datePattern: /^([0-2][0-9]|30|31)\/(0[0-9]|10|11|12)\/[0-9]{4}$/,
    dateError: 'La date doit être au format jj/mm/aaaa',
    locale: 'fr',
  },
  file: {
    rejected: 'Veuillez sélectionner un fichier valide.',
    rejectedMultiple: 'Certains de vos fichiers ne sont pas valides.',
    noFile: 'Aucun fichier',
  },
  html: {
    placeholder: 'Entrez votre texte ici...',
  },
  passwordStrength: {
    weak: 'très peu sécurisé',
    okay: 'peu sécurisé',
    good: 'correct',
    strong: 'sécurisé',
    stronger: 'très sécurisé',
    tooshort: 'trop court',
    error: 'Veuillez entrer un mot de passe plus sécurisé.',
  },
  money: {
    unit: '€',
    precision: 2,
  },
}
