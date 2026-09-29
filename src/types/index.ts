export interface Job {
  id: string;
  title: string;
  department: string;
  category: JobCategory;
  jobType: 'Full-time' | 'Contract' | 'Permanent' | 'Part-time' | 'Internship';
  advertisementNumber?: string;
  vacancies?: number;
  bps?: string;
  qualification?: string;
  experience?: string;
  ageLimit?: string;
  gender?: 'Male' | 'Female' | 'Both' | 'Transgender' | 'All';
  domicile?: string;
  province?: string;
  district?: string;
  location?: string;
  salary?: string;
  applicationFee?: string;
  lastDate: string; // YYYY-MM-DD format
  requiredDocuments?: string[];
  applicationMethod?: string;
  description: string;
  instructions?: string;
  officialSource?: string;
  officialApplyLink?: string;
  showOfficialApply: boolean;
  showWhatsAppApply: boolean;
  featured: boolean;
  published: boolean;
  advertisementImages?: string[];
  advertisementPdf?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobCategory =
  | 'Government Jobs'
  | 'Private Jobs'
  | 'Punjab Jobs'
  | 'Federal Jobs'
  | 'Army Jobs'
  | 'Police Jobs'
  | 'Education Jobs'
  | 'University Jobs'
  | 'Bank Jobs'
  | 'Internship'
  | 'Scholarships'
  | 'Admissions'
  | 'Important Announcements';

export type PostType =
  | 'Advertisements'
  | 'General Updates'
  | 'Announcements'
  | 'Scholarships'
  | 'Admissions'
  | 'Internships'
  | 'Government Schemes'
  | 'Important Dates'
  | 'Notices'
  | 'Offers / Promotions'
  | 'Other';

export interface ContentPost {
  id: string;
  title: string;
  postType: PostType;
  description: string;
  date: string;
  featuredImage?: string;
  multipleImages?: string[];
  pdf?: string;
  videoLink?: string;
  officialWebsiteLink?: string;
  showWhatsAppButton: boolean;
  featured: boolean;
  published: boolean;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceMainCategory =
  | 'Online Apply'
  | 'Vehicle'
  | 'Card & Document'
  | 'Government Document'
  | 'E-Stamp'
  | 'Computer & Printing'
  | 'CV / Resume'
  | 'Graphic Designing';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceMainCategory;
  description: string;
  iconName: string;
  isPopular: boolean;
  enabled: boolean;
  showWhatsAppButton: boolean;
  priceEstimate?: string;
  turnaroundTime?: string;
  requirements?: string[];
}

export type RequestStatus = 'Pending' | 'Processing' | 'Completed' | 'Delivered';

export interface CustomerRequest {
  id: string; // e.g. REQ-20260929-001
  customerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  serviceId?: string;
  serviceName: string;
  message: string;
  requiredDocuments?: string[];
  preferredContactMethod: 'WhatsApp' | 'Phone Call' | 'Either';
  status: RequestStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteSettings {
  brandName: string;
  serviceName: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappJobsChannelUrl: string;
  shopAddress: string;
  shopHours: string;
  email: string;
  aboutText: string;
  disclaimer: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}
