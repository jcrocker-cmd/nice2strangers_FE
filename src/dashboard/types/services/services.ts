export interface SMConsulting {
  id: string;
  name: string;
  email: string;
  subject: string;
  platforms: string;
  goals: string;
  budget: string;
  duration: string;
  message: string;
  isReplied: boolean;
  createdDate: string;
}

export interface SMCreation {
  id: string;
  name: string;
  email: string;
  subject: string;
  platforms: string;
  contentType: string;
  frequency: string;
  budget: string;
  duration: string;
  message: string;
  isReplied: boolean;
  createdDate: string;
}

export interface VideoEditing {
  id: string;
  name: string;
  email: string;
  subject: string;
  platforms: string;
  contentType: string;
  otherContentType: string;
  budget: string;
  duration: string;
  message: string;
  isReplied: boolean;
  createdDate: string;
}

export interface Software {
  id: string;
  name: string;
  email: string;
  subject: string;
  projectType: string;
  platform: string;
  otherContentType: string;
  budget: string;
  timeline: string;
  message: string;
  isReplied: boolean;
  createdDate: string;
}

export interface DroneServiceInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  serviceType: string;
  location: string;
  budget: string;
  date: string;
  message: string;
  isReplied: boolean;
  createdDate: string;
}
