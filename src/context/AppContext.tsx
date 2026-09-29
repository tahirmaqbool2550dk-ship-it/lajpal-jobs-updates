import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Job,
  ServiceItem,
  ContentPost,
  CustomerRequest,
  WebsiteSettings,
  ToastMessage,
  RequestStatus,
} from '../types';
import {
  STORAGE_KEYS,
  DEFAULT_WEBSITE_SETTINGS,
  INITIAL_JOBS,
  INITIAL_SERVICES,
  INITIAL_POSTS,
  INITIAL_REQUESTS,
  getStoredData,
  setStoredData,
  initializeStorageIfNeeded,
} from '../utils/storage';
import { generateRequestId } from '../utils/idGenerator';

interface AppContextType {
  // Jobs
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => Job;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  duplicateJob: (id: string) => Job | null;
  toggleJobPublish: (id: string) => void;
  toggleJobFeatured: (id: string) => void;

  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => ServiceItem;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  toggleServiceEnabled: (id: string) => void;
  toggleServiceWhatsApp: (id: string) => void;

  // Content Posts / Updates
  posts: ContentPost[];
  addPost: (post: Omit<ContentPost, 'id' | 'createdAt' | 'updatedAt'>) => ContentPost;
  updatePost: (id: string, post: Partial<ContentPost>) => void;
  deletePost: (id: string) => void;
  togglePostPublish: (id: string) => void;
  togglePostFeatured: (id: string) => void;

  // Customer Requests
  requests: CustomerRequest[];
  submitRequest: (request: Omit<CustomerRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => CustomerRequest;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  updateRequestNotes: (id: string, notes: string) => void;
  deleteRequest: (id: string) => void;

  // Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  resetAllDemoData: () => void;

  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type'], title?: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize storage once on boot
  useEffect(() => {
    initializeStorageIfNeeded();
  }, []);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string, type: ToastMessage['type'] = 'success', title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Data states initialized from LocalStorage
  const [jobs, setJobs] = useState<Job[]>(() =>
    getStoredData<Job[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS)
  );
  const [services, setServices] = useState<ServiceItem[]>(() =>
    getStoredData<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES)
  );
  const [posts, setPosts] = useState<ContentPost[]>(() =>
    getStoredData<ContentPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS)
  );
  const [requests, setRequests] = useState<CustomerRequest[]>(() =>
    getStoredData<CustomerRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS)
  );
  const [settings, setSettings] = useState<WebsiteSettings>(() =>
    getStoredData<WebsiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_WEBSITE_SETTINGS)
  );

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  });

  const loginAdmin = (username: string, password: string): boolean => {
    // Default credentials for the admin dashboard
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    if ((cleanUser === 'admin' || cleanUser === 'lajpal') && (cleanPass === 'admin123' || cleanPass === 'lajpal123')) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
      addToast('Welcome back, Admin! Signed in successfully.', 'success', 'Admin Login');
      return true;
    }
    addToast('Invalid username or password. Default is admin / admin123', 'error', 'Login Failed');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    addToast('You have been logged out of the admin panel.', 'info', 'Logged Out');
  };

  // Sync states to LocalStorage whenever they change
  useEffect(() => {
    setStoredData(STORAGE_KEYS.JOBS, jobs);
  }, [jobs]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.SERVICES, services);
  }, [services]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.POSTS, posts);
  }, [posts]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.REQUESTS, requests);
  }, [requests]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  // Jobs Actions
  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Job => {
    const today = new Date().toISOString().split('T')[0];
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      createdAt: today,
      updatedAt: today,
    };
    setJobs((prev) => [newJob, ...prev]);
    addToast(`Job "${newJob.title}" added successfully!`, 'success');
    return newJob;
  };

  const updateJob = (id: string, updatedFields: Partial<Job>) => {
    const today = new Date().toISOString().split('T')[0];
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...updatedFields, updatedAt: today } : j))
    );
    addToast('Job updated successfully!', 'success');
  };

  const deleteJob = (id: string) => {
    const target = jobs.find((j) => j.id === id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
    addToast(`Job "${target?.title || id}" deleted.`, 'info');
  };

  const duplicateJob = (id: string): Job | null => {
    const target = jobs.find((j) => j.id === id);
    if (!target) return null;
    const today = new Date().toISOString().split('T')[0];
    const duplicated: Job = {
      ...target,
      id: `job-${Date.now()}`,
      title: `${target.title} (Copy)`,
      published: false,
      createdAt: today,
      updatedAt: today,
    };
    setJobs((prev) => [duplicated, ...prev]);
    addToast(`Duplicated job as "${duplicated.title}"`, 'success');
    return duplicated;
  };

  const toggleJobPublish = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          const nextState = !j.published;
          addToast(`Job marked as ${nextState ? 'Published' : 'Draft'}`, 'info');
          return { ...j, published: nextState };
        }
        return j;
      })
    );
  };

  const toggleJobFeatured = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          const nextState = !j.featured;
          addToast(`Job ${nextState ? 'added to' : 'removed from'} Featured`, 'info');
          return { ...j, featured: nextState };
        }
        return j;
      })
    );
  };

  // Services Actions
  const addService = (serviceData: Omit<ServiceItem, 'id'>): ServiceItem => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `srv-${Date.now()}`,
    };
    setServices((prev) => [newService, ...prev]);
    addToast(`Service "${newService.name}" created!`, 'success');
    return newService;
  };

  const updateService = (id: string, updatedFields: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    addToast('Service updated successfully!', 'success');
  };

  const deleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    addToast(`Service "${target?.name || id}" removed.`, 'info');
  };

  const toggleServiceEnabled = (id: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.enabled;
          addToast(`Service ${nextState ? 'Enabled' : 'Disabled'}`, 'info');
          return { ...s, enabled: nextState };
        }
        return s;
      })
    );
  };

  const toggleServiceWhatsApp = (id: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return { ...s, showWhatsAppButton: !s.showWhatsAppButton };
        }
        return s;
      })
    );
  };

  // Content Posts Actions
  const addPost = (postData: Omit<ContentPost, 'id' | 'createdAt' | 'updatedAt'>): ContentPost => {
    const today = new Date().toISOString().split('T')[0];
    const newPost: ContentPost = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: today,
      updatedAt: today,
    };
    setPosts((prev) => [newPost, ...prev]);
    addToast(`Post "${newPost.title}" published!`, 'success');
    return newPost;
  };

  const updatePost = (id: string, updatedFields: Partial<ContentPost>) => {
    const today = new Date().toISOString().split('T')[0];
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields, updatedAt: today } : p))
    );
    addToast('Post updated successfully!', 'success');
  };

  const deletePost = (id: string) => {
    const target = posts.find((p) => p.id === id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    addToast(`Post "${target?.title || id}" deleted.`, 'info');
  };

  const togglePostPublish = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.published;
          addToast(`Post ${nextState ? 'Published' : 'Unpublished'}`, 'info');
          return { ...p, published: nextState };
        }
        return p;
      })
    );
  };

  const togglePostFeatured = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, featured: !p.featured };
        }
        return p;
      })
    );
  };

  // Customer Requests Actions
  const submitRequest = (
    reqData: Omit<CustomerRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): CustomerRequest => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newRequest: CustomerRequest = {
      ...reqData,
      id: generateRequestId(requests.length),
      status: 'Pending',
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };
    setRequests((prev) => [newRequest, ...prev]);
    addToast(`Service request ${newRequest.id} submitted!`, 'success', 'Request Received');
    return newRequest;
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, updatedAt: formattedDate } : r))
    );
    addToast(`Request ${id} status updated to ${status}`, 'info');
  };

  const updateRequestNotes = (id: string, adminNotes: string) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, adminNotes, updatedAt: formattedDate } : r))
    );
    addToast('Admin notes updated.', 'success');
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    addToast(`Customer request ${id} deleted.`, 'info');
  };

  // Settings Actions
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('Website settings saved!', 'success');
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_WEBSITE_SETTINGS));
    setJobs(INITIAL_JOBS);
    setServices(INITIAL_SERVICES);
    setPosts(INITIAL_POSTS);
    setRequests(INITIAL_REQUESTS);
    setSettings(DEFAULT_WEBSITE_SETTINGS);
    addToast('Demo data reloaded to factory defaults!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        duplicateJob,
        toggleJobPublish,
        toggleJobFeatured,

        services,
        addService,
        updateService,
        deleteService,
        toggleServiceEnabled,
        toggleServiceWhatsApp,

        posts,
        addPost,
        updatePost,
        deletePost,
        togglePostPublish,
        togglePostFeatured,

        requests,
        submitRequest,
        updateRequestStatus,
        updateRequestNotes,
        deleteRequest,

        settings,
        updateSettings,
        resetAllDemoData,

        isDarkMode,
        toggleTheme,

        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
