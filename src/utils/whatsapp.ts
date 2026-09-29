export const WHATSAPP_RAW_NUMBER = '0305-6359218';
export const WHATSAPP_COUNTRY_CODE = '923056359218';
export const WHATSAPP_JOBS_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbAGWzOBA1exoZYSxa3I';
export const WHATSAPP_JOBS_CHANNEL_BUTTON_TEXT = '📢 Join WhatsApp Jobs Channel';

/**
 * Creates a direct WhatsApp click-to-chat URL with proper URL encoding
 */
export function createWhatsAppUrl(message: string, phoneNumber: string = WHATSAPP_COUNTRY_CODE): string {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}

/**
 * Message template for job application guidance
 */
export function getJobApplyMessage(jobTitle: string, department?: string): string {
  const deptPart = department ? ` (${department})` : '';
  return `Assalam-o-Alaikum, I want to apply for the following job through LAJPAL - JOBS UPDATES AND ONLINE APPLY SERVICES.

Job: ${jobTitle}${deptPart}

Please guide me about the application process.`;
}

/**
 * Message template for service assistance
 */
export function getServiceInquiryMessage(serviceName: string): string {
  return `Assalam-o-Alaikum, I want assistance with "${serviceName}" at LAJPAL - JOBS UPDATES AND ONLINE APPLY SERVICES.

Please guide me on documents required and procedure.`;
}

/**
 * Message template for customer service request follow-up
 */
export function getRequestFollowUpMessage(requestId: string, customerName: string, serviceName: string): string {
  return `Assalam-o-Alaikum, I have submitted a service request on LAJPAL website.

Request ID: ${requestId}
Name: ${customerName}
Service: ${serviceName}

Please confirm and proceed.`;
}

/**
 * Message template for sharing a job via WhatsApp
 */
export function getJobShareMessage(jobTitle: string, lastDate: string, jobUrl: string): string {
  return `🔥 *${jobTitle}*
📅 Last Date to Apply: ${lastDate}

Apply & Details:
${jobUrl}

Shared from LAJPAL - JOBS UPDATES AND ONLINE APPLY SERVICES
Join our WhatsApp Jobs Channel for instant job alerts:
${WHATSAPP_JOBS_CHANNEL_URL}`;
}

/**
 * General contact inquiry message
 */
export function getGeneralContactMessage(): string {
  return `Assalam-o-Alaikum, I am contacting you from the LAJPAL - JOBS UPDATES AND ONLINE APPLY SERVICES website.

Please assist me.`;
}
