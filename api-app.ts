import express from 'express';
import fs from 'fs';
import path from 'path';

function getDataFilePath(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT) {
    return '/tmp/bakery-store-data.json';
  }
  return path.join(process.cwd(), 'bakery-store-data.json');
}

interface StoreConfig {
  announcementText: string;
  announcementEnabled: boolean;
  streetAddress: string;
  cityCountry: string;
  openingHours: { days: string; hours: string }[];
  phone: string;
  whatsappNumber: string;
  email: string;
  directionsUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl: string;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  currencySymbol: string;
  pricesConfirmed: boolean;
  locationConfirmed: boolean;
}

interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
}

interface ProductItem {
  id: string;
  name: string;
  category:
    | 'Croissants & Viennoiseries'
    | 'Artisan Pastries'
    | 'Cakes & Celebration Cakes'
    | 'Tarts & Desserts'
    | 'Cookies & Sweet Treats'
    | 'Savoury Bakes';
  shortDescription: string;
  fullDescription: string;
  price: number;
  priceNote: string;
  image: string;
  availability: 'Available Daily' | 'Pre-Order 24h' | 'Weekend Special' | 'Sold Out';
  featured: boolean;
  hidden: boolean;
  dietaryNotes: string[];
  allergens: string[];
  variants?: ProductVariant[];
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
}

interface TestimonialItem {
  id: string;
  customerName: string;
  context: string;
  quote: string;
  verified: boolean;
}

interface OrderSubmission {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentMethod: 'pickup' | 'delivery';
  collectionDate: string;
  collectionTime: string;
  deliveryAddress?: string;
  specialNotes?: string;
  items: {
    productId: string;
    productName: string;
    variantLabel?: string;
    quantity: number;
    unitPrice: number;
  }[];
  estimatedTotal: number;
  status: 'Pending Bakery Confirmation' | 'Confirmed' | 'Completed';
}

interface CustomCakeInquiry {
  id: string;
  inquiryNumber: string;
  createdAt: string;
  customerName: string;
  email: string;
  phoneOrWhatsapp: string;
  occasion: string;
  desiredDate: string;
  servings: string;
  preferredFlavor: string;
  designDescription: string;
  budgetRange?: string;
  inspirationImageName?: string;
  inspirationImagePreview?: string;
  additionalNotes?: string;
  status: 'Awaiting Consultation' | 'Reviewed';
}

interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface DatabaseSchema {
  config: StoreConfig;
  products: ProductItem[];
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
  orders: OrderSubmission[];
  cakeInquiries: CustomCakeInquiry[];
  contactMessages: ContactMessage[];
}

const DEFAULT_DATA: DatabaseSchema = {
  config: {
    announcementText:
      'Welcome to Bite of Savour — Pre-orders for weekend pastries & custom celebration cakes are open for request.',
    announcementEnabled: true,
    streetAddress: '[Street Address — Editable by Bakery Owner in Studio Settings]',
    cityCountry: '[City, Country — Editable by Bakery Owner]',
    openingHours: [
      { days: 'Tuesday – Friday', hours: '[Hours Pending Owner Confirmation]' },
      { days: 'Saturday – Sunday', hours: '[Weekend Hours Pending Confirmation]' },
      { days: 'Monday', hours: '[Closed / By Pre-Order Appointment]' },
    ],
    phone: '[Phone Number — Clickable Once Confirmed]',
    whatsappNumber: '',
    email: 'noureddinelassakeur@gmail.com',
    directionsUrl: 'https://maps.google.com',
    instagramHandle: '@biteofsavour',
    instagramUrl: 'https://instagram.com',
    facebookUrl: '',
    pickupAvailable: true,
    deliveryAvailable: false,
    currencySymbol: '$',
    pricesConfirmed: false,
    locationConfirmed: false,
  },
  products: [
    {
      id: 'prod-1',
      name: 'Classic Butter Croissant',
      category: 'Croissants & Viennoiseries',
      shortDescription:
        'Crisp, golden honeycomb layers with a delicate, tender crumb baked fresh for morning service.',
      fullDescription:
        'Our signature laminated viennoiserie crafted for a shattering crisp crust and deeply aromatic, airy interior layers. Best enjoyed warm from our morning counter.',
      price: 4.5,
      priceNote: 'Sample price placeholder',
      image: '/src/assets/images/hero_patisserie_showcase_1791574472862.jpg',
      availability: 'Available Daily',
      featured: true,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
      variants: [
        { id: 'v-single', label: 'Single Pastry', priceDelta: 0 },
        { id: 'v-box4', label: 'Box of 4', priceDelta: 12.5 },
      ],
    },
    {
      id: 'prod-2',
      name: 'Twice-Baked Almond Croissant',
      category: 'Croissants & Viennoiseries',
      shortDescription:
        'Filled with fragrant roasted almond frangipane, topped with toasted flaked almonds and a light dusting of icing sugar.',
      fullDescription:
        'Infused with delicate syrup, generously filled with house-made almond cream, and baked a second time until caramelized around the edges.',
      price: 5.5,
      priceNote: 'Sample price placeholder',
      image: '/src/assets/images/product_croissants_viennoiserie_1791574495450.jpg',
      availability: 'Available Daily',
      featured: true,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs', 'Tree Nuts (Almonds)'],
      variants: [
        { id: 'v-single', label: 'Single Pastry', priceDelta: 0 },
        { id: 'v-box4', label: 'Box of 4', priceDelta: 15.5 },
      ],
    },
    {
      id: 'prod-3',
      name: 'Pain au Chocolat',
      category: 'Croissants & Viennoiseries',
      shortDescription:
        'Flaky golden pastry wrapped around two batons of rich dark chocolate.',
      fullDescription:
        'A timeless patisserie staple pairing delicately crisp laminated dough with smooth dark chocolate batons.',
      price: 4.85,
      priceNote: 'Sample price placeholder',
      image: '/src/assets/images/hero_patisserie_showcase_1791574472862.jpg',
      availability: 'Available Daily',
      featured: false,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs', 'Soy'],
      variants: [
        { id: 'v-single', label: 'Single Pastry', priceDelta: 0 },
        { id: 'v-box4', label: 'Box of 4', priceDelta: 13.5 },
      ],
    },
    {
      id: 'prod-4',
      name: 'Seasonal Raspberry & Vanilla Tartlet',
      category: 'Tarts & Desserts',
      shortDescription:
        'Crisp sweet pâte sucrée shell filled with silky vanilla pastry cream and crowned with fresh raspberries.',
      fullDescription:
        'Delicate individual fruit tart balancing bright, jewel-toned raspberries with smooth vanilla custard and a buttery shortcrust base.',
      price: 7.5,
      priceNote: 'Sample price placeholder',
      image: '/src/assets/images/product_artisan_pastries_tarts_1791574505960.jpg',
      availability: 'Available Daily',
      featured: true,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
      variants: [
        { id: 'v-ind', label: 'Individual Tartlet', priceDelta: 0 },
        { id: 'v-pair', label: 'Pair of Tartlets (2)', priceDelta: 7.0 },
      ],
    },
    {
      id: 'prod-5',
      name: 'Black Fig & Honey Mascarpone Tart',
      category: 'Artisan Pastries',
      shortDescription:
        'Ripe quartered figs, light mascarpone cream, and warm blossom honey in a golden crust.',
      fullDescription:
        'Crafted to highlight seasonal orchard fruit on a bed of lightly whipped cream and crisp golden pastry.',
      price: 8.0,
      priceNote: 'Sample price placeholder',
      image: '/src/assets/images/product_artisan_pastries_tarts_1791574505960.jpg',
      availability: 'Weekend Special',
      featured: true,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
      variants: [{ id: 'v-ind', label: 'Individual Tart', priceDelta: 0 }],
    },
    {
      id: 'prod-6',
      name: 'Ivory Botanical Celebration Cake',
      category: 'Cakes & Celebration Cakes',
      shortDescription:
        'Layered sponge cake finished in textured warm ivory buttercream with delicate botanical accents.',
      fullDescription:
        'Designed for intimate gatherings and milestones. Available in classic vanilla bean, raspberry preserve, or rich chocolate ganache fillings. For multi-tier or bespoke event designs, please use our Custom Cake Inquiry form.',
      price: 68.0,
      priceNote: 'Sample starting price placeholder',
      image: '/src/assets/images/product_custom_celebration_cake_1791574516943.jpg',
      availability: 'Pre-Order 24h',
      featured: true,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
      variants: [
        { id: 'v-6in', label: '6-Inch Round (8–10 servings)', priceDelta: 0 },
        { id: 'v-8in', label: '8-Inch Round (14–18 servings)', priceDelta: 24.0 },
      ],
    },
    {
      id: 'prod-7',
      name: 'Fleur de Sel Dark Chocolate Cookie',
      category: 'Cookies & Sweet Treats',
      shortDescription:
        'Crisp edges and a soft, fudgy center studded with dark chocolate chunks and flaky sea salt.',
      fullDescription:
        'Baked for a deeply rich cocoa profile with pools of melted dark chocolate and a finishing pinch of flaky sea salt.',
      price: 3.75,
      priceNote: 'Sample price placeholder',
      image: '/src/assets/images/product_cookies_sweet_treats_1791574529763.jpg',
      availability: 'Available Daily',
      featured: true,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs', 'Soy'],
      variants: [
        { id: 'v-single', label: 'Single Cookie', priceDelta: 0 },
        { id: 'v-box6', label: 'Gift Box of 6', priceDelta: 16.5 },
      ],
    },
    {
      id: 'prod-8',
      name: 'Artisan Sea Salt Fudge Brownie',
      category: 'Cookies & Sweet Treats',
      shortDescription:
        'Glossy crackled top with a dense, velvety chocolate truffle interior.',
      fullDescription:
        'Cut into generous squares with a delicate flaky top crust and rich chocolate center.',
      price: 4.5,
      priceNote: 'Sample price placeholder',
      image: '/src/assets/images/product_cookies_sweet_treats_1791574529763.jpg',
      availability: 'Available Daily',
      featured: false,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs', 'Soy'],
      variants: [
        { id: 'v-single', label: 'Single Square', priceDelta: 0 },
        { id: 'v-box4', label: 'Box of 4 Squares', priceDelta: 12.5 },
      ],
    },
    {
      id: 'prod-9',
      name: 'Herbed Gruyère & Caramelized Onion Danish',
      category: 'Savoury Bakes',
      shortDescription:
        'Flaky laminated pastry folded with slow-caramelized onions, aged Gruyère, and fresh thyme.',
      fullDescription:
        'A warm savoury option from our morning ovens, balancing crisp buttery pastry layers with rich cheese and sweet onions.',
      price: 5.75,
      priceNote: 'Sample price placeholder',
      image: '/src/assets/images/product_croissants_viennoiserie_1791574495450.jpg',
      availability: 'Available Daily',
      featured: false,
      hidden: false,
      dietaryNotes: ['Vegetarian'],
      allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
      variants: [{ id: 'v-single', label: 'Single Savoury Pastry', priceDelta: 0 }],
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'The Morning Counter at Bite of Savour',
      category: 'Bakery Interior',
      caption:
        'Warm natural light illuminating our glass pastry display and freshly baked morning selection.',
      image: '/src/assets/images/bakery_interior_storefront_1791574484471.jpg',
    },
    {
      id: 'gal-2',
      title: 'Croissants & Pain au Chocolat',
      category: 'Viennoiseries',
      caption: 'Golden, flaky layers arranged on travertine stone straight from the morning bake.',
      image: '/src/assets/images/hero_patisserie_showcase_1791574472862.jpg',
    },
    {
      id: 'gal-3',
      title: 'Seasonal Fruit & Vanilla Tartlets',
      category: 'Tarts & Pastries',
      caption: 'Fresh raspberries, figs, and vanilla bean pastry cream in crisp golden shells.',
      image: '/src/assets/images/product_artisan_pastries_tarts_1791574505960.jpg',
    },
    {
      id: 'gal-4',
      title: 'Bespoke Two-Tier Celebration Cake',
      category: 'Custom Cakes',
      caption:
        'Textured warm ivory buttercream with subtle champagne gold leaf and dried botanicals.',
      image: '/src/assets/images/product_custom_celebration_cake_1791574516943.jpg',
    },
    {
      id: 'gal-5',
      title: 'Twice-Baked Almond Croissants',
      category: 'Viennoiseries',
      caption: 'Topped with toasted sliced almonds and a light snowfall of powdered sugar.',
      image: '/src/assets/images/product_croissants_viennoiserie_1791574495450.jpg',
    },
    {
      id: 'gal-6',
      title: 'Fleur de Sel Cookies & Fudge Brownies',
      category: 'Cookies & Sweet Treats',
      caption: 'Rich dark chocolate treats finished with flaky sea salt crystals.',
      image: '/src/assets/images/product_cookies_sweet_treats_1791574529763.jpg',
    },
  ],
  testimonials: [],
  orders: [],
  cakeInquiries: [],
  contactMessages: [],
};

function loadData(): DatabaseSchema {
  const filePath = getDataFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw) as DatabaseSchema;
    }
    const rootSeedPath = path.join(process.cwd(), 'bakery-store-data.json');
    if (fs.existsSync(rootSeedPath)) {
      const raw = fs.readFileSync(rootSeedPath, 'utf-8');
      const data = JSON.parse(raw) as DatabaseSchema;
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      } catch (_) {}
      return data;
    }
  } catch (err) {
    console.error('Failed to read store data file, falling back to default:', err);
  }
  return DEFAULT_DATA;
}

function saveData(data: DatabaseSchema): void {
  const filePath = getDataFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write store data file:', err);
  }
}

export function createApiApp() {
  const app = express();
  app.use(express.json({ limit: '5mb' }));

  const router = express.Router();

  // GET all public store state (config, products, gallery, testimonials)
  router.get('/store', (_req, res) => {
    const db = loadData();
    res.json({
      config: db.config,
      products: db.products,
      gallery: db.gallery,
      testimonials: db.testimonials,
      ordersCount: db.orders.length,
      inquiriesCount: db.cakeInquiries.length,
    });
  });

  // GET owner admin records (orders, cake inquiries, contact messages)
  router.get('/admin/records', (_req, res) => {
    const db = loadData();
    res.json({
      orders: db.orders,
      cakeInquiries: db.cakeInquiries,
      contactMessages: db.contactMessages,
    });
  });

  // PUT update store configuration
  router.put('/store/config', (req, res) => {
    const db = loadData();
    db.config = { ...db.config, ...req.body };
    saveData(db);
    res.json({ success: true, config: db.config });
  });

  // POST add or update a product
  router.post('/store/products', (req, res) => {
    const db = loadData();
    const incoming = req.body as ProductItem;
    if (!incoming.name || !incoming.category) {
      res.status(400).json({ error: 'Product name and category are required.' });
      return;
    }

    const existingIndex = db.products.findIndex((p) => p.id === incoming.id);
    if (existingIndex >= 0) {
      db.products[existingIndex] = { ...db.products[existingIndex], ...incoming };
    } else {
      const newProduct: ProductItem = {
        ...incoming,
        id: incoming.id || `prod-${Date.now()}`,
      };
      db.products.unshift(newProduct);
    }
    saveData(db);
    res.json({ success: true, products: db.products });
  });

  // DELETE a product
  router.delete('/store/products/:id', (req, res) => {
    const db = loadData();
    db.products = db.products.filter((p) => p.id !== req.params.id);
    saveData(db);
    res.json({ success: true, products: db.products });
  });

  // POST add a verified customer testimonial
  router.post('/store/testimonials', (req, res) => {
    const db = loadData();
    const { customerName, context, quote } = req.body;
    if (!customerName || !quote) {
      res.status(400).json({ error: 'Customer name and quote are required.' });
      return;
    }
    const item: TestimonialItem = {
      id: `test-${Date.now()}`,
      customerName: String(customerName).trim(),
      context: String(context || 'Verified Bakery Guest').trim(),
      quote: String(quote).trim(),
      verified: true,
    };
    db.testimonials.unshift(item);
    saveData(db);
    res.json({ success: true, testimonials: db.testimonials });
  });

  // DELETE a testimonial
  router.delete('/store/testimonials/:id', (req, res) => {
    const db = loadData();
    db.testimonials = db.testimonials.filter((t) => t.id !== req.params.id);
    saveData(db);
    res.json({ success: true, testimonials: db.testimonials });
  });

  // POST submit an online order request
  router.post('/orders', (req, res) => {
    const db = loadData();
    const {
      customerName,
      customerEmail,
      customerPhone,
      fulfillmentMethod,
      collectionDate,
      collectionTime,
      deliveryAddress,
      specialNotes,
      items,
      estimatedTotal,
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !collectionDate || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        error: 'Please provide your name, contact details, collection date, and at least one menu item.',
      });
      return;
    }

    const orderNumber = `BOS-${String(1000 + db.orders.length + 1)}`;
    const newOrder: OrderSubmission = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: String(customerName).trim(),
      customerEmail: String(customerEmail).trim(),
      customerPhone: String(customerPhone).trim(),
      fulfillmentMethod: fulfillmentMethod === 'delivery' ? 'delivery' : 'pickup',
      collectionDate: String(collectionDate).trim(),
      collectionTime: String(collectionTime || 'Morning Collection').trim(),
      deliveryAddress: deliveryAddress ? String(deliveryAddress).trim() : undefined,
      specialNotes: specialNotes ? String(specialNotes).trim() : undefined,
      items,
      estimatedTotal: Number(estimatedTotal) || 0,
      status: 'Pending Bakery Confirmation',
    };

    db.orders.unshift(newOrder);
    saveData(db);
    res.status(201).json({ success: true, order: newOrder });
  });

  // PATCH update order status (owner studio)
  router.patch('/orders/:id', (req, res) => {
    const db = loadData();
    const order = db.orders.find((o) => o.id === req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found.' });
      return;
    }
    if (req.body.status) {
      order.status = req.body.status;
      saveData(db);
    }
    res.json({ success: true, orders: db.orders });
  });

  // POST submit a custom cake inquiry
  router.post('/custom-cakes', (req, res) => {
    const db = loadData();
    const {
      customerName,
      email,
      phoneOrWhatsapp,
      occasion,
      desiredDate,
      servings,
      preferredFlavor,
      designDescription,
      budgetRange,
      inspirationImageName,
      inspirationImagePreview,
      additionalNotes,
    } = req.body;

    if (
      !customerName ||
      !email ||
      !phoneOrWhatsapp ||
      !occasion ||
      !desiredDate ||
      !servings ||
      !preferredFlavor ||
      !designDescription
    ) {
      res.status(400).json({
        error: 'Please complete all required custom cake inquiry fields.',
      });
      return;
    }

    const inquiryNumber = `CAKE-${String(200 + db.cakeInquiries.length + 1)}`;
    const newInquiry: CustomCakeInquiry = {
      id: `cake-${Date.now()}`,
      inquiryNumber,
      createdAt: new Date().toISOString(),
      customerName: String(customerName).trim(),
      email: String(email).trim(),
      phoneOrWhatsapp: String(phoneOrWhatsapp).trim(),
      occasion: String(occasion).trim(),
      desiredDate: String(desiredDate).trim(),
      servings: String(servings).trim(),
      preferredFlavor: String(preferredFlavor).trim(),
      designDescription: String(designDescription).trim(),
      budgetRange: budgetRange ? String(budgetRange).trim() : undefined,
      inspirationImageName: inspirationImageName ? String(inspirationImageName).trim() : undefined,
      inspirationImagePreview: inspirationImagePreview ? String(inspirationImagePreview) : undefined,
      additionalNotes: additionalNotes ? String(additionalNotes).trim() : undefined,
      status: 'Awaiting Consultation',
    };

    db.cakeInquiries.unshift(newInquiry);
    saveData(db);
    res.status(201).json({ success: true, inquiry: newInquiry });
  });

  // POST submit a contact message
  router.post('/contact', (req, res) => {
    const db = loadData();
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({
        error: 'Please enter your name, email address, and message.',
      });
      return;
    }
    const msg: ContactMessage = {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : undefined,
      subject: String(subject || 'General Inquiry').trim(),
      message: String(message).trim(),
    };
    db.contactMessages.unshift(msg);
    saveData(db);
    res.status(201).json({ success: true, contactMessage: msg });
  });

  app.use('/api', router);
  app.use('/.netlify/functions/api', router);
  app.use('/', router);

  return app;
}
