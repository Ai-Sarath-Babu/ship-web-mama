/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  description: string;
  descriptionAr?: string;
  image: string;
  moq: string;
  specifications: Record<string, string>;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Inquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  country: string;
  email: string;
  whatsapp: string;
  productRequirement: string;
  quantity: string;
  message: string;
  leadSource: 'Form' | 'ExitIntent' | 'Catalog' | 'WhatsApp';
  date: string;
  status: 'Pending' | 'Contacted' | 'Closed';
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  country: string;
  comment: string;
  rating: number;
}

export interface Certification {
  id: string;
  name: string;
  code: string;
  description: string;
  imageUrl: string;
}
