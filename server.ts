/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "database.json");

// Helper to read and write database
function getDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      categories: [
        { id: "1", name: "Restaurant Crockeries & Tableware", slug: "restaurant-crockeries-tableware" },
        { id: "2", name: "Kitchenware & Premium Cutleries", slug: "kitchenware-premium-cutleries" },
        { id: "3", name: "Dining Tablecloths & Linens", slug: "dining-tablecloths-linens" },
        { id: "4", name: "Premium Indian Granites", slug: "premium-indian-granites" },
        { id: "5", name: "Indian Marbles", slug: "indian-marbles" }
      ],
      products: [
        {
          id: "p1",
          name: "Premium Porcelain Serving Bowls",
          category: "Restaurant Crockeries & Tableware",
          subCategory: "restaurant-crockeries",
          description: "High-alumina reinforced porcelain serving bowls, custom designed for luxury hospitality and intense restaurant operations. Chip-resistant rim and thermal-shock safe.",
          image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
          moq: "1,500 Units",
          features: [
            "Reinforced chip-proof edges",
            "Dishwasher & Microwave Safe",
            "Lead & Cadmium Free glaze",
            "Stackable and space-saving design"
          ],
          specifications: {
            "Material": "Porcelain / High-Alumina Clay",
            "Sizes Available": "6 inch, 8 inch, 10 inch, 12 inch",
            "Thermal Tolerance": "Oven-to-Table Safe",
            "Color Options": "Super White / Warm Ivory"
          }
        },
        {
          id: "p2",
          name: "Fine Dining Ceramic Crockeries & Plates",
          category: "Restaurant Crockeries & Tableware",
          subCategory: "restaurant-crockeries",
          description: "Professional-grade dining ware and charger plates tailored for elite hotels and restaurant chains. Features high-gloss scratch-protection and a majestic modern coupe silhouette.",
          image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80",
          moq: "2,000 Pieces",
          features: [
            "Tested for 5,000+ commercial wash cycles",
            "Stain-resistant and glaze-protected",
            "Custom under-glaze brand logo firing",
            "Sophisticated textured borders available"
          ],
          specifications: {
            "Item Types": "Dinner Plates, Side Plates, Soup Bowls",
            "Finish": "Glossy Mirror Protective Glaze",
            "Lead Safety": "FDA & California Prop 65 Compliant",
            "MOQ per SKU": "500 Pieces"
          }
        },
        {
          id: "p3",
          name: "Professional Stainless Steel Cutleries Set",
          category: "Kitchenware & Premium Cutleries",
          subCategory: "kitchenware-premium-cutleries",
          description: "Exquisite 18/10 stainless steel flatware set including forks, knives, spoons, and teaspoons. Mirror polished and weighted perfectly for a comfortable upscale dining experience.",
          image: "https://images.unsplash.com/photo-1543510473-ac2c35329a28?auto=format&fit=crop&w=600&q=80",
          moq: "5,000 Sets",
          features: [
            "Surgical Grade 18/10 Stainless Steel",
            "High corrosion and rust resistance",
            "Excellent weight and balanced feel",
            "Luxurious gold-PVD plating options available"
          ],
          specifications: {
            "Composition": "18/10 Chromium-Nickel Stainless Steel",
            "Finish": "Super Mirror Polish (Grade A)",
            "Dishwasher Compatibility": "100% Dishwasher Safe",
            "Packing": "Custom branded corporate wooden box or bulk master cartons"
          }
        },
        {
          id: "p4",
          name: "High-Grade Commercial Kitchen Items & Ware",
          category: "Kitchenware & Premium Cutleries",
          subCategory: "kitchenware-premium-cutleries",
          description: "Premium industrial kitchen cookware, pots, pans, and food prep utensils. Made with heavy-duty tri-ply stainless steel for even heat distribution in commercial settings.",
          image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
          moq: "200 Pieces per SKU",
          features: [
            "Heavy-duty Tri-Ply construction",
            "Stay-cool riveted hollow handles",
            "Induction, gas, and electric stove compatible",
            "NSF Certified for commercial kitchens"
          ],
          specifications: {
            "Material": "SS304 Inner, Aluminium Core, SS430 Base",
            "Thickness": "2.8mm - 3.2mm",
            "Types": "Stock Pots, Fry Pans, Sauce Pans, Sauteuse",
            "OEM Branding": "Laser-etched logo available"
          }
        },
        {
          id: "p5",
          name: "Premium Cotton Dining Tablecloths",
          category: "Dining Tablecloths & Linens",
          subCategory: "dining-tablecloths-linens",
          description: "High-density weave cotton tablecloths and table runners, chemically treated for stain resistance and liquid spill-repellency. Extremely elegant fabric texture for fine dining setup.",
          image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80",
          moq: "1,000 Units",
          features: [
            "100% long-staple Indian combed cotton",
            "Spill-proof and stain-resistant coating",
            "Double-stitched mitered corners for long wear",
            "Machine washable, color-fast colors"
          ],
          specifications: {
            "Weave Style": "Damask Jacquard, Plain Weave, Herringbone",
            "Thread Count": "200 TC, 300 TC, 400 TC",
            "Sizes": "Square, Rectangular, Round custom sizes",
            "Colors": "Bleached White, Champagne, Dark Blue, Emerald Green"
          }
        },
        {
          id: "p6",
          name: "Imperial Ruby Red Granite",
          category: "Premium Indian Granites",
          subCategory: "premium-indian-granites",
          description: "Majestic Ruby Red granite blocks and slabs sourced directly from high-quality quarries of Southern India. Features a fascinating rich red backdrop with elegant dark grain inclusions.",
          image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80",
          moq: "1 Full Container (FCL)",
          features: [
            "Quarried from highly stable deep bedrock",
            "Perfect color consistency across slabs",
            "Exceptional compressive strength",
            "Mirror-like polished gloss of 95+"
          ],
          specifications: {
            "Thickness": "20mm, 30mm, 40mm calibrated",
            "Slab Sizes": "Gangsaw (280cm x 160cm up), Cutter (180cm x 60cm up)",
            "Finishes": "Polished, Honed, Leathered, Flamed, Brush-hammered",
            "Applications": "Kitchen Countertops, Accent Walls, Exterior Cladding"
          }
        },
        {
          id: "p7",
          name: "Premium Black Galaxy Granite Slabs",
          category: "Premium Indian Granites",
          subCategory: "premium-indian-granites",
          description: "The globally renowned Black Galaxy granite from Ongole quarries. Characterized by a deep, pitch-black background with brilliant golden and copper bronzite flecks shining like stars.",
          image: "https://images.unsplash.com/photo-1590244921252-15f39274a412?auto=format&fit=crop&w=600&q=80",
          moq: "1 Full Container (FCL)",
          features: [
            "Zero artificial dyes or resins used",
            "Extremely high density and scratch resistance",
            "Glistening copper-golden sparkles",
            "Precision cut edge finishing (+/- 0.5mm tolerance)"
          ],
          specifications: {
            "Golden Flakes Density": "Medium to High dense selection",
            "Calibrated Tiles": "30x30cm, 60x30cm, 60x60cm, 120x60cm",
            "Water Absorption": "0.02% (superior resistance)",
            "Slab Sizing": "Jumbo Gangsaw Slabs"
          }
        },
        {
          id: "p8",
          name: "Polished Floor Granite Slabs",
          category: "Premium Indian Granites",
          subCategory: "premium-indian-granites",
          description: "High-quality, durable, and calibrated Indian floor granite slabs. Extremely robust, slip-resistant when honed/flamed, and highly resistant to heavy footfall in public and private spaces.",
          image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
          moq: "1 Full Container (FCL)",
          features: [
            "Highly durable, scratch & stain proof",
            "Ideal for indoor living spaces, corporate lobbies, and malls",
            "Low maintenance requirements",
            "Wide variety of Indian color selections"
          ],
          specifications: {
            "Density": "2.65 - 2.80 g/cm³",
            "Calibrated Thickness": "15mm, 18mm, 20mm, 30mm",
            "Finish Options": "Polished (gloss 90+), Honed, Satin Finish",
            "Packaging": "Fumigated seaworthy strong wooden crates"
          }
        },
        {
          id: "p9",
          name: "Makrana Pristine White Marble Slabs",
          category: "Indian Marbles",
          subCategory: "indian-marbles",
          description: "The world's most historically acclaimed pure Makrana White Marble with soft, graceful gray veining. Highly crystalline structure that gets brighter and more radiant with time.",
          image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
          moq: "1 Full Container (FCL)",
          features: [
            "Pure natural calcium carbonate composition (>98% CaCO3)",
            "Stain-resistant and weather-resilient stone",
            "Naturally cool and highly light-reflective",
            "Extremely long-lasting (used in historical monuments)"
          ],
          specifications: {
            "Mined Location": "Makrana, Rajasthan, India",
            "Calibrated Slabs": "18mm, 20mm thickness",
            "Water Absorption": "Nearly 0%",
            "Texture Selection": "Pure White, Albeta, Dungri, Statuario Indian"
          }
        }
      ],
      blogs: [
        {
          id: "b1",
          title: "A B2B Sourcing Guide for Indian Granite: Ruby Red & Black Galaxy",
          slug: "b2b-sourcing-guide-indian-granite-ruby-black",
          summary: "Everything global stone importers, architects, and monument dealers must verify before securing granite shipments from India.",
          content: "India remains the undisputed world leader in natural stone exports, boasting rare and legendary granite varieties such as the intense Imperial Ruby Red and Ongole's celestial Black Galaxy. For B2B buyers, understanding specific thickness calibration, polishing standards (gloss levels above 95), and secure sea container timber-crating is essential to avoid fractures. At Yalini Exim, we execute multi-stage quality checks directly at the processing yards in Tamil Nadu and Rajasthan, ensuring pristine, fissure-free granite slabs are loaded with complete certified documentation.",
          image: "https://images.unsplash.com/photo-1590244921252-15f39274a412?auto=format&fit=crop&w=600&q=80",
          date: "2026-06-25",
          author: "Prabhu, Managing Director"
        },
        {
          id: "b2",
          title: "Hospitality Sourcing: Elevating Guest Experience with Custom Crockeries & Linens",
          slug: "hospitality-sourcing-custom-crockeries-linens",
          summary: "How premium porcelain tableware, surgical-grade cutleries, and spill-resistant cotton tablecloths define modern restaurant luxury.",
          content: "The global fine dining and hotel catering sectors have elevated their procurement requirements. It is no longer just about standard utensils; today's elite venues demand high-alumina reinforced chip-resistant porcelain serving bowls, custom-branded dinnerware sets, and heavy 18/10 stainless steel flatware. In addition, liquid-repelling combed cotton tablecloths protect table assets while establishing an premium ambiance. Learn how Yalini Exim coordinates comprehensive supply packages for luxury restaurant setups directly from India's top certified manufacturers.",
          image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
          date: "2026-06-27",
          author: "Hospitality Procurement Lead"
        }
      ],
      inquiries: [
        {
          id: "inq_1",
          companyName: "Al-Sultan Palace Catering",
          contactPerson: "Tariq Mahmood",
          country: "Saudi Arabia",
          email: "procurement@alsultanhotels.sa",
          whatsapp: "+966505123456",
          productRequirement: "Premium Porcelain Serving Bowls & Dining Plate Sets",
          quantity: "5,000 Pieces",
          message: "We require a complete high-grade tableware shipment for our new luxury restaurant banquet hall in Riyadh. Please share your FOB Tuticorin/Chennai prices and catalogs.",
          leadSource: "Form",
          date: "2026-06-26T14:22:00Z",
          status: "Pending"
        },
        {
          id: "inq_2",
          companyName: "Pacific Design & Stone LLC",
          contactPerson: "Marcus Finch",
          country: "USA",
          email: "m.finch@pacificstonedesign.com",
          whatsapp: "+12065550198",
          productRequirement: "Black Galaxy & Ruby Red Granite Slabs 20mm",
          quantity: "2 Full Containers (FCL)",
          message: "Looking for premium quality Black Galaxy and Ruby Red slabs for high-end residential kitchen countertop projects in Seattle. Slabs must be Gangsaw cut. Please provide quarry details.",
          leadSource: "ExitIntent",
          date: "2026-06-27T09:15:00Z",
          status: "Contacted"
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function saveDatabase(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize DB
  getDatabase();

  // API: Get SEO Settings
  app.get("/api/seo", (req, res) => {
    try {
      const db = getDatabase();
      const defaultPages = {
        home: {
          title: "Yalini Exim | B2B Premium Indian Exports & Granite Sourcing",
          description: "Sourcing premium Indian granite, high-grade restaurant crockeries, and organic hotelware directly from certified Indian manufacturers since 2023.",
          ogImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
        },
        about: {
          title: "About Us | Yalini Exim - Premium Indian Export Partner",
          description: "Yalini Exim is a certified Indian trading and manufacturing sourcing partner. Learn about our commitment to quality, global logistics, and direct sourcing.",
          ogImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        },
        collections: {
          title: "Premium B2B Collections | Yalini Exim Sourcing Catalog",
          description: "Browse our bulk collections of Indian natural stones, Black Galaxy granite, luxury restaurant ceramics, hospitality linens, and biodegradable tableware.",
          ogImage: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80"
        },
        faq: {
          title: "Import FAQ & Support | Yalini Exim Global Trade Desk",
          description: "Find answers to frequently asked questions regarding international logistics, container loading (FCL/LCL), customs documents, and MOQ parameters.",
          ogImage: "https://images.unsplash.com/photo-1553484771-047a44eee27f?auto=format&fit=crop&w=1200&q=80"
        },
        contact: {
          title: "Contact Our Export Desk | Request Custom Quotation",
          description: "Get in touch with Yalini Exim’s B2B coordinators. Request FOB/CIF pricing, customized packing specifications, and direct factory-door quotes.",
          ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
        },
        more: {
          title: "B2B Export Trade Portal | Live Tracking & Blog",
          description: "Explore industry blogs, latest logistics updates, and track your container shipments with our live GPS-integrated tracking dashboard.",
          ogImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
        },
        profile: {
          title: "My Business Profile | Yalini Exim B2B Client Area",
          description: "Manage your trade preferences, view saved products for comparison, and access your previous inquiry history in the client profile portal.",
          ogImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        }
      };

      if (!db.seo) {
        db.seo = {
          title: "Yalini Exim | Premium Indian Exports - Granite, Crockeries & Tableware",
          description: "Leading global trading partner exporting premium restaurant tableware, high-grade kitchenware, fine dining tablecloths, Makrana marble, and southern Indian granites.",
          ogImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
          pages: defaultPages
        };
        saveDatabase(db);
      } else if (!db.seo.pages) {
        db.seo.pages = defaultPages;
        saveDatabase(db);
      }
      res.json(db.seo);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Update SEO Settings
  app.put("/api/seo", (req, res) => {
    try {
      const db = getDatabase();
      db.seo = {
        title: req.body.title || "Yalini Exim",
        description: req.body.description || "",
        ogImage: req.body.ogImage || req.body.openGraphImage || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
        pages: req.body.pages || db.seo?.pages || {}
      };
      saveDatabase(db);
      res.json(db.seo);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Get Shipment by Invoice ID (with dynamic DB seeding)
  app.get("/api/shipments/:id", (req, res) => {
    try {
      const db = getDatabase();
      const invoiceId = req.params.id.toUpperCase().trim();
      
      if (!db.shipments) {
        db.shipments = [
          {
            invoiceId: "YAL-2026-101",
            clientName: "Elite Hospitality Group LLC",
            product: "Premium Porcelain Serving Bowls",
            quantity: "15,000 Pcs",
            originPort: "Chennai Port, India",
            destinationPort: "Port of Singapore",
            shippingLine: "Maersk Line",
            vesselName: "Maersk Mc-Kinney Moller",
            containerNo: "MSKU1248569",
            status: "In Transit",
            progress: 70,
            eta: "2026-07-08",
            logs: [
              { date: "2026-06-20", message: "Order confirmed & export processing started." },
              { date: "2026-06-23", message: "Quality assurance certified at Yalini packing hub." },
              { date: "2026-06-25", message: "Container loaded and customs cleared at Chennai Port." },
              { date: "2026-06-26", message: "Vessel departed Chennai Port. Estimated arrival at Singapore: July 8, 2026." }
            ]
          },
          {
            invoiceId: "YAL-2026-102",
            clientName: "Al-Miraj Construction Materials",
            product: "Imperial Ruby Red Granite Slabs",
            quantity: "2 Full Containers (FCL)",
            originPort: "Mundra Port, India",
            destinationPort: "Jebel Ali Port, Dubai",
            shippingLine: "MSC",
            vesselName: "MSC Oscar",
            containerNo: "MEDU8823561",
            status: "Delivered",
            progress: 100,
            eta: "2026-06-25",
            logs: [
              { date: "2026-06-10", message: "Block extraction and slab calibration completed in Rajasthan." },
              { date: "2026-06-14", message: "Passed SGS physical inspection and moisture tolerances." },
              { date: "2026-06-16", message: "Loaded at Mundra Port." },
              { date: "2026-06-18", message: "Vessel sailed to UAE." },
              { date: "2026-06-24", message: "Arrived at Jebel Ali Port, customs released." },
              { date: "2026-06-25", message: "Fumigated crates safely delivered to client's construction site in Dubai." }
            ]
          },
          {
            invoiceId: "YAL-2026-103",
            clientName: "Aura Premium Linens Ltd",
            product: "Premium Cotton Dining Tablecloths",
            quantity: "3,000 Units",
            originPort: "Chennai Port, India",
            destinationPort: "Port of Felixstowe, UK",
            shippingLine: "CMA CGM",
            vesselName: "CMA CGM Antoine de Saint Exupery",
            containerNo: "CGMU3394582",
            status: "Loading at Port",
            progress: 40,
            eta: "2026-07-28",
            logs: [
              { date: "2026-06-21", message: "Weaving and spill-proof chemical coatings finalized." },
              { date: "2026-06-25", message: "Passed dual-stage quality checking. Double-mitered stitching confirmed." },
              { date: "2026-06-27", message: "Packed in seaworthy master cartons and transferred to Chennai port warehouse." }
            ]
          }
        ];
        saveDatabase(db);
      }
      
      const shipment = db.shipments.find((ship: any) => ship.invoiceId === invoiceId);
      if (shipment) {
        res.json(shipment);
      } else {
        res.status(404).json({ error: "Shipment not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Get Products
  app.get("/api/products", (req, res) => {
    try {
      const db = getDatabase();
      res.json(db.products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Create Product
  app.post("/api/products", (req, res) => {
    try {
      const db = getDatabase();
      const newProduct = {
        id: "p_" + Date.now(),
        ...req.body,
        specifications: req.body.specifications || {},
        features: req.body.features || []
      };
      db.products.push(newProduct);
      saveDatabase(db);
      res.status(201).json(newProduct);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Update Product
  app.put("/api/products/:id", (req, res) => {
    try {
      const db = getDatabase();
      const { id } = req.params;
      const index = db.products.findIndex((p: any) => p.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
      }
      db.products[index] = { ...db.products[index], ...req.body };
      saveDatabase(db);
      res.json(db.products[index]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Delete Product
  app.delete("/api/products/:id", (req, res) => {
    try {
      const db = getDatabase();
      const { id } = req.params;
      db.products = db.products.filter((p: any) => p.id !== id);
      saveDatabase(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Get Categories
  app.get("/api/categories", (req, res) => {
    try {
      const db = getDatabase();
      res.json(db.categories);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Get Inquiries
  app.get("/api/inquiries", (req, res) => {
    try {
      const db = getDatabase();
      res.json(db.inquiries);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Submit Inquiry
  app.post("/api/inquiries", (req, res) => {
    try {
      const db = getDatabase();
      const newInquiry = {
        id: "inq_" + Date.now(),
        ...req.body,
        date: new Date().toISOString(),
        status: "Pending"
      };
      db.inquiries.unshift(newInquiry);
      saveDatabase(db);

      // Simulate sending mock automated email confirmation
      const userEmail = req.body.email || "client@example.com";
      const contactName = req.body.contactPerson || "Valued Client";
      const company = req.body.companyName || "Your Company";
      const product = req.body.productRequirement || "Goods";

      console.log(`
========================================================================
[MOCK EMAIL SERVICE] SENDING AUTOMATED CONFIRMATION
========================================================================
To: ${userEmail}
Subject: Thank you for your interest in Yalini Exim | Export Inquiry Confirmation
Date: ${new Date().toUTCString()}
Body:
Dear ${contactName},

Thank you for contacting Yalini Exim. We have successfully received your export inquiry for:
- Product Requirement: ${product}
- Company: ${company}

Our international trade desk has registered your interest and will prepare a customized FOB/CIF quotation. An accounts manager will be in touch with you shortly.

Best Regards,
The Sourcing Team
Yalini Exim | Global Trading Partner
========================================================================
      `);

      res.status(201).json({
        ...newInquiry,
        emailSent: true,
        emailTo: userEmail
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Update Inquiry Status
  app.put("/api/inquiries/:id", (req, res) => {
    try {
      const db = getDatabase();
      const { id } = req.params;
      const index = db.inquiries.findIndex((inq: any) => inq.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Inquiry not found" });
      }
      db.inquiries[index].status = req.body.status || db.inquiries[index].status;
      saveDatabase(db);
      res.json(db.inquiries[index]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Delete Inquiry
  app.delete("/api/inquiries/:id", (req, res) => {
    try {
      const db = getDatabase();
      const { id } = req.params;
      db.inquiries = db.inquiries.filter((inq: any) => inq.id !== id);
      saveDatabase(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Get Blogs
  app.get("/api/blogs", (req, res) => {
    try {
      const db = getDatabase();
      res.json(db.blogs);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Create Blog
  app.post("/api/blogs", (req, res) => {
    try {
      const db = getDatabase();
      const newBlog = {
        id: "b_" + Date.now(),
        slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        ...req.body,
        date: new Date().toISOString().split("T")[0]
      };
      db.blogs.unshift(newBlog);
      saveDatabase(db);
      res.status(201).json(newBlog);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Delete Blog
  app.delete("/api/blogs/:id", (req, res) => {
    try {
      const db = getDatabase();
      const { id } = req.params;
      db.blogs = db.blogs.filter((b: any) => b.id !== id);
      saveDatabase(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Update Blog
  app.put("/api/blogs/:id", (req, res) => {
    try {
      const db = getDatabase();
      const { id } = req.params;
      const index = db.blogs.findIndex((b: any) => b.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Blog not found" });
      }
      db.blogs[index] = { 
        ...db.blogs[index], 
        ...req.body,
        slug: req.body.title ? req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : db.blogs[index].slug
      };
      saveDatabase(db);
      res.json(db.blogs[index]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Stats for Dashboard
  app.get("/api/stats", (req, res) => {
    try {
      const db = getDatabase();
      const totalLeads = db.inquiries.length;
      const pendingLeads = db.inquiries.filter((inq: any) => inq.status === "Pending").length;
      const contactedLeads = db.inquiries.filter((inq: any) => inq.status === "Contacted").length;
      const closedLeads = db.inquiries.filter((inq: any) => inq.status === "Closed").length;

      // Calculate top product requested
      const productsMap: Record<string, number> = {};
      db.inquiries.forEach((inq: any) => {
        const prod = inq.productRequirement || "Other";
        productsMap[prod] = (productsMap[prod] || 0) + 1;
      });
      let topProduct = "None";
      let maxProductCount = 0;
      Object.entries(productsMap).forEach(([prod, count]) => {
        if (count > maxProductCount) {
          maxProductCount = count;
          topProduct = prod;
        }
      });

      // Calculate top country
      const countryMap: Record<string, number> = {};
      db.inquiries.forEach((inq: any) => {
        const country = inq.country || "Unknown";
        countryMap[country] = (countryMap[country] || 0) + 1;
      });
      let topCountry = "None";
      let maxCountryCount = 0;
      Object.entries(countryMap).forEach(([c, count]) => {
        if (count > maxCountryCount) {
          maxCountryCount = count;
          topCountry = c;
        }
      });

      res.json({
        totalLeads,
        pendingLeads,
        contactedLeads,
        closedLeads,
        topProduct,
        topCountry
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Dynamic sitemap.xml generator
  app.get("/sitemap.xml", (req, res) => {
    try {
      const db = getDatabase();
      const protocol = req.headers["x-forwarded-proto"] || "https";
      const host = req.headers.host || "yalini-exim.com";
      const baseUrl = `${protocol}://${host}`;

      const currentDate = new Date().toISOString().split("T")[0];

      // Base pages
      const staticPages = [
        { path: "", changefreq: "daily", priority: "1.0" },
        { path: "?page=about", changefreq: "weekly", priority: "0.8" },
        { path: "?page=collections", changefreq: "weekly", priority: "0.9" },
        { path: "?page=faq", changefreq: "weekly", priority: "0.7" },
        { path: "?page=contact", changefreq: "weekly", priority: "0.8" },
        { path: "?page=more", changefreq: "weekly", priority: "0.8" },
        { path: "?page=profile", changefreq: "weekly", priority: "0.8" }
      ];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      // Add static pages
      staticPages.forEach(p => {
        const fullUrl = p.path ? `${baseUrl}/${p.path}` : `${baseUrl}`;
        xml += `  <url>\n`;
        xml += `    <loc>${fullUrl}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
        xml += `    <priority>${p.priority}</priority>\n`;
        xml += `  </url>\n`;
      });

      // Add dynamic product pages
      if (db.products && Array.isArray(db.products)) {
        db.products.forEach((prod: any) => {
          const fullUrl = `${baseUrl}/?page=collections&amp;product=${prod.id}`;
          xml += `  <url>\n`;
          xml += `    <loc>${fullUrl}</loc>\n`;
          xml += `    <lastmod>${currentDate}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.9</priority>\n`;
          xml += `  </url>\n`;
        });
      }

      // Add dynamic blog pages
      if (db.blogs && Array.isArray(db.blogs)) {
        db.blogs.forEach((blog: any) => {
          const fullUrl = `${baseUrl}/?page=more&amp;blog=${blog.id}`;
          const blogDate = blog.date || currentDate;
          xml += `  <url>\n`;
          xml += `    <loc>${fullUrl}</loc>\n`;
          xml += `    <lastmod>${blogDate}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.8</priority>\n`;
          xml += `  </url>\n`;
        });
      }

      xml += `</urlset>`;

      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (err: any) {
      res.status(500).send(`Error generating sitemap: ${err.message}`);
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
