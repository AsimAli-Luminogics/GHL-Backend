// import commonUtil from '../../utils/common.util';
// import {Settings} from '../../../database/models/settings.model'
// export class Settings {
//   paymentsAuthorizations = {
//     failedAuthorizations: {
//       email: false,
//       sms: false,
//       smsTemplate: '',
//       emailTemplate: '',
//       sendTo: {
//         superAdmin: false,
//         admin: false,
//         doctor: false,
//         patient: false,
//       },
//     },
//     successfulAuthorizations: {
//       email: false,
//       sms: false,
//       smsTemplate: '',
//       emailTemplate: '',
//       sendTo: {
//         superAdmin: false,
//         admin: false,
//         doctor: false,
//         patient: false,
//       },
//     },
//     failedPayments: {
//       email: false,
//       sms: false,
//       smsTemplate: '',
//       emailTemplate: '',
//       sendTo: {
//         superAdmin: false,
//         admin: false,
//         doctor: false,
//         patient: false,
//       },
//     },
//     successPayments: {
//       email: false,
//       sms: false,
//       smsTemplate: '',
//       emailTemplate: '',
//       sendTo: {
//         admin: false,
//         manager: false,
//         negotiator: false,
//         debtor: false,
//         creditor: false,
//       },
//     },
//     upcomingPayments: {
//       email: false,
//       sms: false,
//       smsTemplate: '',
//       emailTemplate: '',
//       sendTo: {
//         admin: false,
//         manager: false,
//         negotiator: false,
//         debtor: false,
//         creditor: false,
//       },
//     },
//     retryInterval: {
//       failedAuthorization: {
//         unit: 'days',
//         value: 2,
//         maxRetry: 2,
//       },
//       failedPayment: {
//         unit: 'days',
//         value: 2,
//         maxRetry: 2,
//       },
//     },
//     authorizationInterval: {
//       custom: {
//         unit: 'hours',
//         value: 8,
//       },
//       daily: {
//         unit: 'hours',
//         value: 8,
//       },
//       weekly: {
//         unit: 'days',
//         value: 2,
//       },
//       fortnightly: {
//         unit: 'days',
//         value: 2,
//       },
//       monthly: {
//         unit: 'days',
//         value: 2,
//       },
//     },
//   };
//   notificationTemplates = Array<{
//     type: '';
//     name: '';
//     event: '';
//     templateId: '';
//     content: '';
//     subject: '';
//     from: '';
//   }>();
//   notificationConfiguration = Array<{
//     id: '';
//     label: '';
//     value: '';
//   }>();
//   createdAt = commonUtil.getCurrentDate();
//   updatedAt = commonUtil.getCurrentDate();
// }
//# sourceMappingURL=settings.repomodel.js.map