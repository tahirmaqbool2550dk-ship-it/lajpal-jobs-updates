import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  MessageSquare,
  FileCheck,
  Printer,
  Car,
  CreditCard,
  Palette,
  FileSignature,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/services/ServiceCard';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { ServiceMainCategory } from '../types';

interface CategoryConfig {
  name: string;
  category: ServiceMainCategory;
  headline: string;
  description: string;
  icon: React.ElementType;
  guidelines: string[];
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  'online-apply': {
    name: 'Online Apply Services',
    category: 'Online Apply',
    headline: 'Error-Free Government & Private Job Submissions',
    description:
      'We provide end-to-end assistance for FPSC, PPSC, NTS, PTS, Army, Police, and University admission portals. We resize images, generate fee vouchers, and verify educational eligibility before final submission.',
    icon: FileCheck,
    guidelines: [
      'Original CNIC and attested degree marks required',
      'Accurate photo cropping to meet 20KB-50KB portal limits',
      'Instant challan generation and online fee payment assistance',
      'Downloadable application receipt with applicant roll slip',
    ],
  },
  vehicle: {
    name: 'Vehicle Services',
    category: 'Vehicle',
    headline: 'Punjab Motor Vehicle Online Services',
    description:
      'Fast online assistance for token tax verification, learner driving license creation, permanent license guidance, and excise smart card issues.',
    icon: Car,
    guidelines: [
      'Instant Learner Driving Licence printout within 10 minutes',
      'Vehicle Token Tax payment with official e-Pay Punjab receipt',
      'E-Registration smart card download and PVC plastic print',
      'Lost vehicle registration duplicate card assistance',
    ],
  },
  documents: {
    name: 'Card & Document Services',
    category: 'Card & Document',
    headline: 'PVC Smart Cards, Laminations & Document Processing',
    description:
      'High-grade waterproof PVC identification cards for students, company staff, visitors, and clubs. Plus heavy-duty heat lamination and scanning.',
    icon: CreditCard,
    guidelines: [
      'Single or batch PVC smart card printing with vibrant colors',
      'Student and employee identity card format customization',
      'High-resolution 600 DPI document archiving to PDF',
      'Heavy micron lamination preventing moisture damage',
    ],
  },
  'e-stamp': {
    name: 'E-Stamp Services',
    category: 'E-Stamp',
    headline: 'Punjab E-Stamping, Legal Affidavits & Agreements',
    description:
      'Preparation of 32-A Challan on official Punjab e-Stamping portal, legal rental agreements, loan contracts, vehicle sale deeds, and sworn court affidavits.',
    icon: FileSignature,
    guidelines: [
      'Accurate stamp duty calculation according to Punjab schedule',
      'Generation of 32-A Challan with barcode verification',
      'Rental agreement, surety bonds, and partnership drafting',
      'Legal size official e-stamp paper laser printing',
    ],
  },
  printing: {
    name: 'Computer & Printing Services',
    category: 'Computer & Printing',
    headline: 'High-Speed Laser Printing, Typing & Photocopying',
    description:
      'Professional document services including B&W laser copies, glossy photo prints, spiral binding, InPage Urdu typing, and multi-file PDF conversion.',
    icon: Printer,
    guidelines: [
      'High-speed 1200 DPI laser printing on 80 GSM imported paper',
      'Urdu Nastaleeq and English fast word processing and typing',
      'Instant passport size photographs on glossy Kodak sheets',
      'PDF Merge, Compress, Split and Image-to-PDF formatting',
    ],
  },
  'cv-resume': {
    name: 'CV & Resume Services',
    category: 'CV / Resume',
    headline: 'ATS-Friendly Professional CVs & Cover Letters',
    description:
      'Boost your interview call rates with modern, recruiter-approved resume layouts tailored for corporate, private, and government job vacancies.',
    icon: FileText,
    guidelines: [
      'Applicant Tracking System (ATS) compliant structuring',
      'Professional English and Nastaleeq Urdu CV formats',
      'Tailored cover letters for specific job applications',
      'Textured luxury bond paper printing with protective folders',
    ],
  },
  designing: {
    name: 'Graphic Designing Services',
    category: 'Graphic Designing',
    headline: 'Flex Banners, Visiting Cards & Social Media Creatives',
    description:
      'Custom visual designs for shops, clinics, schools, and online businesses. Standees, banners, flyer distribution cards, and YouTube thumbnails.',
    icon: Palette,
    guidelines: [
      'Large scale outdoor flex boards and roll-up standees',
      'Luxury visiting cards with QR codes and spot UV options',
      'Fast photo suit & background editing for passport photos',
      'High CTR YouTube thumbnails and WhatsApp status flyers',
    ],
  },
};

export const ServiceCategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { services } = useApp();

  const config = categorySlug ? CATEGORY_MAP[categorySlug] : undefined;

  if (!config) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Category Not Found</h2>
        <Link
          to="/services"
          className="mt-4 inline-flex items-center gap-2 text-emerald-600 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View All Services</span>
        </Link>
      </div>
    );
  }

  const Icon = config.icon;
  const categoryServices = services.filter(
    (s) => s.enabled && s.category === config.category
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Services</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-900/50 shadow-md">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold mb-3 border border-emerald-700/50">
              <Icon className="w-4 h-4" />
              <span>{config.name}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {config.headline}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {config.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <WhatsAppButton
              text="Inquire on WhatsApp"
              size="lg"
              variant="primary"
            />
            <Link
              to="/request-service"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold text-sm bg-white text-slate-950 hover:bg-slate-100 transition active:scale-95 shadow-sm"
            >
              Request Service
            </Link>
          </div>
        </div>
      </div>

      {/* Guidelines Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
          Service Process &amp; Document Requirements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.guidelines.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-700 dark:text-slate-300"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Cards in this Category */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Available {config.name} ({categoryServices.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Immediate counter &amp; online submission
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};
