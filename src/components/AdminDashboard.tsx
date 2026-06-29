/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, Category, Inquiry, Blog } from '../types';
import { 
  BarChart3, Users, LayoutGrid, FileText, Plus, Trash2, Edit2, CheckCircle, 
  Clock, CheckSquare, Download, Search, RefreshCw, Layers, ShieldCheck, MapPin, Sparkles, X, Save, Globe, Mail
} from 'lucide-react';
import WysiwygEditor from './WysiwygEditor';

interface AdminDashboardProps {
  onRefresh: () => void;
  products: Product[];
  categories: Category[];
  inquiries: Inquiry[];
  blogs: Blog[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}

export default function AdminDashboard({
  onRefresh,
  products,
  categories,
  inquiries,
  blogs,
  setProducts,
  setInquiries,
  setBlogs,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'leads' | 'products' | 'blogs' | 'stats' | 'seo'>('leads');
  const [seoData, setSeoData] = useState<{
    title: string;
    description: string;
    openGraphImage: string;
    pages?: Record<string, { title: string; description: string; ogImage: string }>;
  }>({
    title: '',
    description: '',
    openGraphImage: '',
    pages: {
      home: { title: '', description: '', ogImage: '' },
      about: { title: '', description: '', ogImage: '' },
      collections: { title: '', description: '', ogImage: '' },
      faq: { title: '', description: '', ogImage: '' },
      contact: { title: '', description: '', ogImage: '' },
      more: { title: '', description: '', ogImage: '' },
      profile: { title: '', description: '', ogImage: '' }
    }
  });
  const [savingSeo, setSavingSeo] = useState(false);
  const [seoSubTab, setSeoSubTab] = useState<'global' | 'home' | 'about' | 'collections' | 'faq' | 'contact' | 'more' | 'profile'>('global');

  // Fetch SEO Metadata
  const fetchSeo = async () => {
    try {
      const res = await fetch('/api/seo');
      if (res.ok) {
        const data = await res.json();
        setSeoData({
          title: data.title || '',
          description: data.description || '',
          openGraphImage: data.ogImage || data.openGraphImage || '',
          pages: data.pages || {
            home: { title: '', description: '', ogImage: '' },
            about: { title: '', description: '', ogImage: '' },
            collections: { title: '', description: '', ogImage: '' },
            faq: { title: '', description: '', ogImage: '' },
            contact: { title: '', description: '', ogImage: '' },
            more: { title: '', description: '', ogImage: '' },
            profile: { title: '', description: '', ogImage: '' }
          }
        });
      }
    } catch (err) {
      console.error("Error loading SEO", err);
    }
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSeo(true);
    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: seoData.title,
          description: seoData.description,
          openGraphImage: seoData.openGraphImage,
          pages: seoData.pages
        }),
      });
      if (res.ok) {
        alert("SEO metadata updated successfully!");
      } else {
        alert("Failed to update SEO metadata.");
      }
    } catch (err) {
      console.error("Error saving SEO", err);
      alert("Error saving SEO metadata.");
    } finally {
      setSavingSeo(false);
    }
  };
  const [leadsFilter, setLeadsFilter] = useState<string>('all');
  const [leadsSearch, setLeadsSearch] = useState<string>('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Stats State
  const [stats, setStats] = useState({
    totalLeads: 0,
    pendingLeads: 0,
    contactedLeads: 0,
    closedLeads: 0,
    topProduct: 'None',
    topCountry: 'None'
  });

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Bio Degradable Dining Ware',
    subCategory: '',
    description: '',
    descriptionAr: '',
    image: '',
    moq: '',
    featuresString: '',
    specificationsJson: '{\n  "Material": "Eco-friendly",\n  "Size Range": "Standard"\n}'
  });

  // New Blog Form State
  const [newBlog, setNewBlog] = useState({
    title: '',
    summary: '',
    content: '',
    image: '',
    author: 'Yalini Exim Editorial'
  });

  // Load stats
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Error loading stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [inquiries]);

  // Handle lead status updates
  const handleUpdateStatus = async (id: string, status: 'Pending' | 'Contacted' | 'Closed') => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updated = await res.json();
        setInquiries(prev => prev.map(item => item.id === id ? updated : item));
      }
    } catch (err) {
      console.error("Error updating inquiry status", err);
    }
  };

  // Handle lead deletion
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error("Error deleting lead", err);
    }
  };

  // Handle product creation
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let parsedSpecs = {};
      try {
        parsedSpecs = JSON.parse(newProduct.specificationsJson);
      } catch (err) {
        alert("Invalid JSON format in specifications. Please correct it.");
        return;
      }

      const payload = {
        name: newProduct.name,
        category: newProduct.category,
        subCategory: newProduct.subCategory || newProduct.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: newProduct.description,
        descriptionAr: newProduct.descriptionAr,
        image: newProduct.image || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
        moq: newProduct.moq || "Standard MOQ",
        features: newProduct.featuresString.split(",").map(f => f.trim()).filter(f => f.length > 0),
        specifications: parsedSpecs
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const created = await res.json();
        setProducts(prev => [...prev, created]);
        setShowProductModal(false);
        setNewProduct({
          name: '',
          category: 'Bio Degradable Dining Ware',
          subCategory: '',
          description: '',
          descriptionAr: '',
          image: '',
          moq: '',
          featuresString: '',
          specificationsJson: '{\n  "Material": "Eco-friendly",\n  "Size Range": "Standard"\n}'
        });
      }
    } catch (err) {
      console.error("Error creating product", err);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  // Handle blog creation
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
      });
      if (res.ok) {
        const created = await res.json();
        setBlogs(prev => [created, ...prev]);
        setShowBlogModal(false);
        setNewBlog({
          title: '',
          summary: '',
          content: '',
          image: '',
          author: 'Yalini Exim Editorial'
        });
      }
    } catch (err) {
      console.error("Error creating blog", err);
    }
  };

  // Handle blog deletion
  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(prev => prev.filter(b => b.id !== id));
      }
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  // Export to CSV on the fly
  const handleExportCSV = () => {
    const headers = ['Inquiry ID', 'Company Name', 'Contact Person', 'Country', 'Email', 'WhatsApp', 'Product Requirement', 'Quantity', 'Lead Source', 'Date', 'Status'];
    const rows = inquiries.map(inq => [
      inq.id,
      inq.companyName,
      inq.contactPerson,
      inq.country,
      inq.email,
      inq.whatsapp,
      inq.productRequirement,
      inq.quantity,
      inq.leadSource,
      inq.date,
      inq.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `yalini_exim_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and search inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesFilter = leadsFilter === 'all' || inq.status === leadsFilter;
    const matchesSearch = leadsSearch 
      ? inq.companyName.toLowerCase().includes(leadsSearch.toLowerCase()) ||
        inq.contactPerson.toLowerCase().includes(leadsSearch.toLowerCase()) ||
        inq.country.toLowerCase().includes(leadsSearch.toLowerCase()) ||
        inq.productRequirement.toLowerCase().includes(leadsSearch.toLowerCase()) ||
        inq.email.toLowerCase().includes(leadsSearch.toLowerCase())
      : true;
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Upper Status / Greeting bar */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-xl border border-emerald-900 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.12),transparent_40%)]"></div>
        
        <div className="space-y-1.5 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-900 border border-emerald-800 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Authenticated B2B Console</span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Yalini Exim Export Control Desk</h2>
          <p className="text-xs text-emerald-100/90 leading-relaxed font-light">
            Monitor incoming leads, manage product catalog, draft industry blogs, and verify live API database stats.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => { onRefresh(); fetchStats(); }}
            className="p-2.5 bg-emerald-900 hover:bg-emerald-850 border border-emerald-800 rounded-xl transition-all hover:rotate-180 duration-500 text-amber-400 cursor-pointer"
            title="Refresh Server Sync"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-450 text-emerald-950 font-extrabold text-xs rounded-xl transition-all shadow cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Leads to CSV</span>
          </button>
        </div>
      </div>

      {/* Analytics Quick Metric Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-gray-900 leading-none">{stats.totalLeads}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Total Inquiries</div>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-gray-900 leading-none">{stats.pendingLeads}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Pending Quote Reviews</div>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-700 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-gray-900 leading-none truncate">{stats.topProduct}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">Top Demanded Item</div>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-gray-900 leading-none truncate">{stats.topCountry}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">Top Buying Country</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 -mb-px">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-4 px-1 text-sm font-bold tracking-wide transition-all border-b-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>Incoming Leads ({filteredInquiries.length})</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-1 text-sm font-bold tracking-wide transition-all border-b-2 cursor-pointer ${
              activeTab === 'products'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4" />
              <span>Catalog Products ({products.length})</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`pb-4 px-1 text-sm font-bold tracking-wide transition-all border-b-2 cursor-pointer ${
              activeTab === 'blogs'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Industry Blogs ({blogs.length})</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`pb-4 px-1 text-sm font-bold tracking-wide transition-all border-b-2 cursor-pointer ${
              activeTab === 'seo'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>SEO Metadata Settings</span>
            </span>
          </button>
        </nav>
      </div>

      {/* Tab Panel Content */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm min-h-[400px]">
        
        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative max-w-sm w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="leads-search-input"
                  type="text"
                  value={leadsSearch}
                  onChange={(e) => setLeadsSearch(e.target.value)}
                  placeholder="Search leads by company, contact, or item..."
                  className="w-full pl-10 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800"
                />
              </div>

              {/* Status Pill Filters */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setLeadsFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    leadsFilter === 'all' ? 'bg-white text-emerald-900 shadow' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Status
                </button>
                <button
                  onClick={() => setLeadsFilter('Pending')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    leadsFilter === 'Pending' ? 'bg-white text-emerald-900 shadow' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setLeadsFilter('Contacted')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    leadsFilter === 'Contacted' ? 'bg-white text-emerald-900 shadow' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Contacted
                </button>
                <button
                  onClick={() => setLeadsFilter('Closed')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    leadsFilter === 'Closed' ? 'bg-white text-emerald-900 shadow' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Closed
                </button>
              </div>
            </div>

            {/* Leads Database Table */}
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 max-w-md mx-auto">
                <Users className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-gray-900">No matching leads found</h4>
                <p className="text-xs text-gray-500 mt-1">Check back later or change your dashboard search query.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-inner">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-emerald-950 text-white font-semibold">
                    <tr>
                      <th className="p-4 border-b border-gray-100">B2B Company Info</th>
                      <th className="p-4 border-b border-gray-100">Product Requirement</th>
                      <th className="p-4 border-b border-gray-100">Quantity</th>
                      <th className="p-4 border-b border-gray-100">Date Received</th>
                      <th className="p-4 border-b border-gray-100">Lead Source</th>
                      <th className="p-4 border-b border-gray-100">Status Action</th>
                      <th className="p-4 border-b border-gray-100 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-gray-900 text-sm leading-tight">{inq.companyName}</div>
                          <div className="text-xs text-gray-600 font-medium mt-1">{inq.contactPerson} ({inq.country})</div>
                          <div className="text-[11px] text-gray-500 font-mono mt-1">
                            {inq.email} | {inq.whatsapp}
                          </div>
                          {inq.message && (
                            <div className="mt-2 text-[11px] text-emerald-900 font-light bg-emerald-50/30 p-2 rounded border border-emerald-100 max-w-xs leading-relaxed">
                              &ldquo;{inq.message}&rdquo;
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-bold text-emerald-900">{inq.productRequirement}</td>
                        <td className="p-4 font-medium text-amber-800 font-mono">{inq.quantity || 'N/A'}</td>
                        <td className="p-4 text-gray-500 font-mono">{new Date(inq.date).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-150 text-gray-700">
                            {inq.leadSource}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            id={`status-select-${inq.id}`}
                            value={inq.status}
                            onChange={(e) => handleUpdateStatus(inq.id, e.target.value as any)}
                            className={`p-1.5 rounded-lg text-[11px] font-bold border-none focus:outline-none cursor-pointer ${
                              inq.status === 'Pending'
                                ? 'bg-red-50 text-red-700'
                                : inq.status === 'Contacted'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-green-50 text-green-700'
                            }`}
                          >
                            <option value="Pending">🔴 Pending</option>
                            <option value="Contacted">🟡 Contacted</option>
                            <option value="Closed">🟢 Closed</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            id={`delete-lead-btn-${inq.id}`}
                            onClick={() => handleDeleteLead(inq.id)}
                            className="p-1.5 hover:bg-red-50 hover:text-red-700 text-gray-400 rounded-lg transition-colors cursor-pointer"
                            title="Delete Lead Permanent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-900 font-display">Active Product Registry</h3>
              <button
                id="add-product-modal-btn"
                onClick={() => setShowProductModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Export Product</span>
              </button>
            </div>

            {/* Products grid lists */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="p-4 border border-gray-100 rounded-xl flex items-start gap-4 hover:border-emerald-700/20 transition-all">
                  <img
                    referrerPolicy="no-referrer"
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 bg-gray-50 border border-gray-100"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="font-bold text-sm text-gray-900 truncate leading-tight">{p.name}</h4>
                    <div className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider">{p.category}</div>
                    <div className="text-[10px] text-amber-700 font-mono">MOQ: {p.moq}</div>
                    
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        id={`delete-prod-btn-${p.id}`}
                        onClick={() => handleDeleteProduct(p.id)}
                        className="inline-flex items-center gap-1 text-[10px] text-red-500 hover:text-red-700 font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Item</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD PRODUCT MODAL POPUP */}
            {showProductModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-sm animate-fadeIn pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]">
                <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative max-h-[88vh] sm:max-h-[85vh] flex flex-col overflow-hidden border border-gray-100">
                  <div className="p-5 sm:p-6 pb-3 border-b shrink-0 relative flex items-center justify-between pt-[calc(1.25rem+env(safe-area-inset-top))]">
                    <h3 className="font-display text-base sm:text-lg font-bold text-emerald-900">
                      Register New Export Product
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowProductModal(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer border-0 bg-transparent"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateProduct} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 scrollbar-thin pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Product Name *</label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                        placeholder="e.g., Natural White Bagasse Cups"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Category *</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">MOQ *</label>
                        <input
                          type="text"
                          required
                          value={newProduct.moq}
                          onChange={(e) => setNewProduct({ ...newProduct, moq: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                          placeholder="e.g., 50,000 Pcs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Image Link</label>
                        <input
                          type="text"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                          placeholder="e.g., Unsplash URL"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Product Description *</label>
                      <textarea
                        required
                        rows={3}
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                        placeholder="Premium product features, temperature resistances, bio-composting duration, packaging details..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Product Description (Arabic)</label>
                      <textarea
                        rows={3}
                        value={newProduct.descriptionAr}
                        onChange={(e) => setNewProduct({ ...newProduct, descriptionAr: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-right"
                        dir="rtl"
                        placeholder="ميزات المنتج الممتازة، مقاومة درجات الحرارة، تفاصيل التعبئة والتغليف..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Key Features (Comma Separated)</label>
                      <input
                        type="text"
                        value={newProduct.featuresString}
                        onChange={(e) => setNewProduct({ ...newProduct, featuresString: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                        placeholder="Microwave Safe, 100% Compostable, FDA Approved"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Specifications (JSON Format)</label>
                      <textarea
                        rows={3}
                        value={newProduct.specificationsJson}
                        onChange={(e) => setNewProduct({ ...newProduct, specificationsJson: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs rounded-xl transition-all shadow cursor-pointer"
                    >
                      Save Product to DB
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-900 font-display">Manage Industry Articles</h3>
              <button
                id="add-blog-modal-btn"
                onClick={() => setShowBlogModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Compose Article</span>
              </button>
            </div>

            {/* Blogs list */}
            <div className="space-y-4">
              {blogs.map((b) => (
                <div key={b.id} className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl flex justify-between items-center gap-4 hover:border-emerald-700/10">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-gray-900 font-display">{b.title}</h4>
                    <p className="text-xs text-gray-500 leading-normal line-clamp-1 max-w-xl">{b.summary}</p>
                    <div className="text-[10px] text-gray-400 font-mono">Published: {b.date} | Author: {b.author}</div>
                  </div>

                  <button
                    id={`delete-blog-btn-${b.id}`}
                    onClick={() => handleDeleteBlog(b.id)}
                    className="p-2 hover:bg-red-50 hover:text-red-700 text-gray-400 rounded-lg transition-colors cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* ADD BLOG MODAL */}
            {showBlogModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-sm animate-fadeIn pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]">
                <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative max-h-[88vh] sm:max-h-[85vh] flex flex-col overflow-hidden border border-gray-100">
                  <div className="p-5 sm:p-6 pb-3 border-b shrink-0 relative flex items-center justify-between pt-[calc(1.25rem+env(safe-area-inset-top))]">
                    <h3 className="font-display text-base sm:text-lg font-bold text-emerald-900">
                      Compose New Article
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowBlogModal(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer border-0 bg-transparent"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateBlog} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 scrollbar-thin pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                        placeholder="e.g. Navigating GCC Custom Regulations for Foodware Sourcing"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Excerpt / Summary *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.summary}
                        onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                        placeholder="Brief overview displayed on preview cards..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">Cover Image Selection</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setNewBlog({ ...newBlog, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80' })}
                          className={`border rounded-lg overflow-hidden h-14 transition-all relative ${
                            newBlog.image === 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80'
                              ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=100&q=80" alt="Tableware" className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/50 text-[8px] text-white py-0.5 text-center font-bold">Tableware</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewBlog({ ...newBlog, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' })}
                          className={`border rounded-lg overflow-hidden h-14 transition-all relative ${
                            newBlog.image === 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
                              ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80" alt="Granite" className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/50 text-[8px] text-white py-0.5 text-center font-bold">Granite</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewBlog({ ...newBlog, image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80' })}
                          className={`border rounded-lg overflow-hidden h-14 transition-all relative ${
                            newBlog.image === 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80'
                              ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=100&q=80" alt="Logistics" className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/50 text-[8px] text-white py-0.5 text-center font-bold">Logistics</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={newBlog.image}
                        onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                        className="w-full px-3 py-1.5 text-[10px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none font-mono"
                        placeholder="Or paste any custom image Unsplash URL..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">WYSIWYG Rich Content *</label>
                      <WysiwygEditor
                        value={newBlog.content}
                        onChange={(val) => setNewBlog({ ...newBlog, content: val })}
                        placeholder="Draft your detailed analysis, quality reports, shipping suggestions..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs rounded-xl transition-all shadow cursor-pointer"
                    >
                      Publish Article to Feed
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === 'seo' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-950 font-display">Page-Level & Global SEO Metadata</h3>
                <p className="text-xs text-gray-500 mt-1">Configure unique search titles, meta descriptions, and social media OpenGraph previews for each page of your export portal.</p>
              </div>
              <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[11px] font-bold text-amber-700 flex items-center gap-1.5 self-start md:self-auto">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Page-specific overrides active</span>
              </div>
            </div>

            {/* Sub Tabs Selection */}
            <div className="bg-gray-50/50 dark:bg-slate-900/30 p-2.5 rounded-2xl border border-gray-150 dark:border-slate-800">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-2 px-1">Select Page View to Edit</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {[
                  { id: 'global', label: 'Global (All)', icon: Globe },
                  { id: 'home', label: 'Home Page', icon: LayoutGrid },
                  { id: 'about', label: 'About Page', icon: ShieldCheck },
                  { id: 'collections', label: 'Collections', icon: Layers },
                  { id: 'faq', label: 'FAQ Page', icon: FileText },
                  { id: 'contact', label: 'Contact', icon: Mail },
                  { id: 'more', label: 'Trade Blog', icon: Sparkles },
                  { id: 'profile', label: 'Client Profile', icon: Users },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  const isSelected = seoSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSeoSubTab(tab.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-800 border-emerald-850 text-white shadow-md shadow-emerald-800/10'
                          : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-amber-400 animate-pulse' : 'text-gray-400'}`} />
                      <span className="text-[11px] font-bold leading-none">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Form Input Column */}
              <div className="lg:col-span-7 space-y-6">
                <form onSubmit={handleSaveSeo} className="space-y-6 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
                    <span className="p-2 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {seoSubTab === 'global' ? 'Global settings' : `${seoSubTab.toUpperCase()} PAGE SEO`}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">currently editing values</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wide text-gray-600 font-extrabold block">
                      {seoSubTab === 'global' ? 'Global Default Meta Title' : 'Page Meta Title'}
                    </label>
                    <input
                      type="text"
                      required
                      value={
                        seoSubTab === 'global'
                          ? seoData.title
                          : seoData.pages?.[seoSubTab]?.title || ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        if (seoSubTab === 'global') {
                          setSeoData({ ...seoData, title: val });
                        } else {
                          const pages = { ...(seoData.pages || {}) };
                          pages[seoSubTab] = {
                            ...(pages[seoSubTab] || { title: '', description: '', ogImage: '' }),
                            title: val
                          };
                          setSeoData({ ...seoData, pages });
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all font-sans font-medium"
                      placeholder={
                        seoSubTab === 'global'
                          ? "e.g. Yalini Exim | Premium Indian Sourcing & Fine Tableware"
                          : `e.g. ${seoSubTab.charAt(0).toUpperCase() + seoSubTab.slice(1)} | Yalini Exim`
                      }
                    />
                    <p className="text-[10px] text-gray-400 flex justify-between">
                      <span>Ideal length: 50-60 characters for search snippet displays.</span>
                      <span className="font-bold">
                        Length: {
                          seoSubTab === 'global'
                            ? seoData.title.length
                            : (seoData.pages?.[seoSubTab]?.title || '').length
                        }
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wide text-gray-600 font-extrabold block">
                      {seoSubTab === 'global' ? 'Global Default Meta Description' : 'Page Meta Description'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={
                        seoSubTab === 'global'
                          ? seoData.description
                          : seoData.pages?.[seoSubTab]?.description || ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        if (seoSubTab === 'global') {
                          setSeoData({ ...seoData, description: val });
                        } else {
                          const pages = { ...(seoData.pages || {}) };
                          pages[seoSubTab] = {
                            ...(pages[seoSubTab] || { title: '', description: '', ogImage: '' }),
                            description: val
                          };
                          setSeoData({ ...seoData, pages });
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all font-sans leading-relaxed"
                      placeholder="e.g. Sourcing high-grade Indian granite red and black galaxy tiles, heavy 18/10 restaurant cutlery sets, luxury hotel ceramics and tableware catalog."
                    />
                    <p className="text-[10px] text-gray-400 flex justify-between">
                      <span>Ideal length: 120-160 characters. Higher click-through rate.</span>
                      <span className="font-bold">
                        Length: {
                          seoSubTab === 'global'
                            ? seoData.description.length
                            : (seoData.pages?.[seoSubTab]?.description || '').length
                        }
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wide text-gray-600 font-extrabold block">
                      {seoSubTab === 'global' ? 'Global OpenGraph Share Image URL' : 'Page OpenGraph Share Image URL'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={
                          seoSubTab === 'global'
                            ? seoData.openGraphImage
                            : seoData.pages?.[seoSubTab]?.ogImage || ''
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (seoSubTab === 'global') {
                            setSeoData({ ...seoData, openGraphImage: val });
                          } else {
                            const pages = { ...(seoData.pages || {}) };
                            pages[seoSubTab] = {
                              ...(pages[seoSubTab] || { title: '', description: '', ogImage: '' }),
                              ogImage: val
                            };
                            setSeoData({ ...seoData, pages });
                          }
                        }}
                        className="flex-1 px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all font-mono"
                        placeholder="e.g. https://images.unsplash.com/... or paste relative path"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const defaultImages: Record<string, string> = {
                            global: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
                            home: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
                            about: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
                            collections: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
                            faq: 'https://images.unsplash.com/photo-1553484771-047a44eee27f?auto=format&fit=crop&w=1200&q=80',
                            contact: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
                            more: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
                            profile: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
                          };
                          const selectedImg = defaultImages[seoSubTab] || defaultImages.global;
                          
                          if (seoSubTab === 'global') {
                            setSeoData({ ...seoData, openGraphImage: selectedImg });
                          } else {
                            const pages = { ...(seoData.pages || {}) };
                            pages[seoSubTab] = {
                              ...(pages[seoSubTab] || { title: '', description: '', ogImage: '' }),
                              ogImage: selectedImg
                            };
                            setSeoData({ ...seoData, pages });
                          }
                        }}
                        className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-[11px] font-bold transition-all cursor-pointer"
                      >
                        Reset to Theme Preset
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400">Dimensions: 1200 x 630px recommended for premium rich cards on WhatsApp and LinkedIn feeds.</p>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">Changes affect server-side rendering parameters immediately.</span>
                    <button
                      type="submit"
                      disabled={savingSeo}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-650 disabled:bg-gray-400 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{savingSeo ? 'Saving Metadata...' : 'Save Current SEO Config'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Preview Column */}
              <div className="lg:col-span-5 space-y-6">
                {/* Google Search Snippet Simulation */}
                <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2.5">
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-blue-500" />
                    <span>Google Snippet Preview</span>
                  </h4>
                  <div className="space-y-1 text-left">
                    <span className="text-xs text-gray-500 font-mono block">
                      https://yaliniexim.com/{seoSubTab === 'global' ? '' : `?page=${seoSubTab}`}
                    </span>
                    <h5 className="text-lg font-medium text-blue-850 hover:underline cursor-pointer font-sans leading-snug line-clamp-1">
                      {
                        seoSubTab === 'global'
                          ? (seoData.title || 'Yalini Exim | Premium Indian Sourcing & Exports')
                          : (seoData.pages?.[seoSubTab]?.title || seoData.title || 'Yalini Exim')
                      }
                    </h5>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed line-clamp-2">
                      {
                        seoSubTab === 'global'
                          ? (seoData.description || 'Global default description...')
                          : (seoData.pages?.[seoSubTab]?.description || seoData.description || 'Page-specific override description...')
                      }
                    </p>
                  </div>
                </div>

                {/* Social Card Snippet Simulation */}
                <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2.5">
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Social Share Card (Facebook / LinkedIn / WhatsApp)</span>
                  </h4>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs bg-gray-50">
                    <div className="aspect-video bg-gray-200 overflow-hidden relative">
                      <img
                        src={
                          (seoSubTab === 'global'
                            ? seoData.openGraphImage
                            : seoData.pages?.[seoSubTab]?.ogImage || seoData.openGraphImage) || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80'
                        }
                        alt="SEO preview share"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3.5 space-y-1 bg-white text-left">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
                        YALINIEXIM.COM/{seoSubTab === 'global' ? '' : seoSubTab.toUpperCase()}
                      </span>
                      <h5 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {
                          seoSubTab === 'global'
                            ? (seoData.title || 'Yalini Exim | Premium Indian Sourcing & Exports')
                            : (seoData.pages?.[seoSubTab]?.title || seoData.title || 'Yalini Exim')
                        }
                      </h5>
                      <p className="text-[10px] text-gray-500 line-clamp-1">
                        {
                          seoSubTab === 'global'
                            ? (seoData.description || 'Global description...')
                            : (seoData.pages?.[seoSubTab]?.description || seoData.description || 'Page override description...')
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
