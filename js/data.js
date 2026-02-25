/*
 * Satyam Computers - CSC Center
 * Developed by: Ashutosh Saini
 * All Rights Reserved
 */

// ============ DEVELOPER LOCKED DATA ============
// Ye data sirf Developer Panel se change hoga
// Admin ise change NAHI kar payega

const DEV_DEFAULTS = {
    developerPassword: "ashutosh@dev2024",
    adminPassword: "admin123",
    
    // === DEVELOPER ONLY FIELDS ===
    developerName: "Ashutosh Saini",
    developerContact: "+91 9999999999",
    appVersion: "2.0.1",
    
    // Logo & Branding - ONLY Developer can change
    centerName: "??? Grahak Seva Kendra",
    centerSubtitle: "CSC - Jan Seva Digital Center",
    shopName: "Grahak Seva Kendra",
    logoEmoji: "???",
    
    // Google Drive JSON Link - ONLY Developer can set
    googleDriveDataUrl: "",
    
    // Lock flags
    adminCanChangeName: false,
    adminCanChangeLogo: false,
    
    // === ADMIN CHANGEABLE FIELDS ===
    ownerName: "Owner Name",
    centerCode: "CSC-2024-001",
    phone: "+91 9876543210",
    altPhone: "+91 9123456789",
    email: "csccenter@gmail.com",
    address: "Near Post Office, Main Road, Delhi - 110001",
    whatsapp: "919876543210",
    upiId: "csccenter@paytm",
    currency: "?",
    serviceCharge: 0,
    
    welcomeMessage: "???? Namaste! Swagat hai aapka Grahak Seva Kendra me. Sabhi Sarkari aur Digital services ek hi jagah!",
    footerText: "?? Dhanyavaad! Grahak Seva Kendra - Aapki Seva Me Hamesha",
    
    theme: {
        primary: "#ff6b35",
        secondary: "#e8530e",
        accent: "#f7c948",
        bg: "#0a1628",
        cardBg: "#142240",
        textColor: "#ffffff"
    },
    
    categories: [
        { id: 1, name: "?? Aadhaar Services", icon: "??", active: true },
        { id: 2, name: "?? Banking & Finance", icon: "??", active: true },
        { id: 3, name: "?? PAN Card", icon: "??", active: true },
        { id: 4, name: "?? Passport", icon: "??", active: true },
        { id: 5, name: "?? Certificate", icon: "??", active: true },
        { id: 6, name: "?? Insurance", icon: "??", active: true },
        { id: 7, name: "?? Education", icon: "??", active: true },
        { id: 8, name: "? Bill Payment", icon: "?", active: true },
        { id: 9, name: "?? Kisan Seva", icon: "??", active: true },
        { id: 10, name: "?? Digital Seva", icon: "??", active: true }
    ],
    
    products: [
        {
            id: 1, catId: 1,
            name: "Aadhaar Card - New Enrollment",
            price: 100, mrp: 300,
            image: "??",
            description: "Naya Aadhaar Card banwaye. Biometric + documents required. 15-30 din me delivery.",
            rating: 4.8, reviews: 2340,
            featured: true, active: true,
            time: "15-30 din",
            docs: "ID Proof, Address Proof, Photo"
        },
        {
            id: 2, catId: 1,
            name: "Aadhaar Update / Correction",
            price: 50, mrp: 150,
            image: "??",
            description: "Naam, address, mobile, DOB, photo update karwaye Aadhaar me.",
            rating: 4.7, reviews: 1890,
            featured: true, active: true,
            time: "7-15 din",
            docs: "Aadhaar Card, Supporting Document"
        },
        {
            id: 3, catId: 1,
            name: "Aadhaar PVC Card Print",
            price: 75, mrp: 200,
            image: "??",
            description: "Durable PVC Aadhaar card. Wallet size, waterproof.",
            rating: 4.5, reviews: 980,
            featured: false, active: true,
            time: "15-20 din",
            docs: "Aadhaar Number, Mobile OTP"
        },
        {
            id: 4, catId: 2,
            name: "Bank Account Opening (Jan Dhan)",
            price: 0, mrp: 100,
            image: "??",
            description: "Zero balance account. SBI, PNB, BOB, BOI available.",
            rating: 4.6, reviews: 1560,
            featured: true, active: true,
            time: "Same Day",
            docs: "Aadhaar, PAN (optional), Photo"
        },
        {
            id: 5, catId: 2,
            name: "PM Kisan Samman Nidhi Registration",
            price: 50, mrp: 200,
            image: "??",
            description: "?6000/year seedha bank me. Kisan registration karwaye.",
            rating: 4.9, reviews: 3400,
            featured: true, active: true,
            time: "7 din",
            docs: "Aadhaar, Bank Passbook, Khasra/Khatauni"
        },
        {
            id: 6, catId: 3,
            name: "New PAN Card Apply",
            price: 150, mrp: 500,
            image: "??",
            description: "NSDL/UTI se PAN Card. 15-20 din me ghar pe delivery.",
            rating: 4.7, reviews: 2100,
            featured: true, active: true,
            time: "15-20 din",
            docs: "Aadhaar Card, Photo, Signature"
        },
        {
            id: 7, catId: 3,
            name: "PAN Card Correction / Update",
            price: 100, mrp: 350,
            image: "??",
            description: "PAN me naam, DOB, photo, address correction karwaye.",
            rating: 4.5, reviews: 890,
            featured: false, active: true,
            time: "15-20 din",
            docs: "PAN Card, Aadhaar, Supporting Proof"
        },
        {
            id: 8, catId: 4,
            name: "Passport Application (Fresh)",
            price: 500, mrp: 1500,
            image: "??",
            description: "Naya Passport. Online form + PSK appointment booking.",
            rating: 4.4, reviews: 670,
            featured: true, active: true,
            time: "30-45 din",
            docs: "Aadhaar, Birth Certificate, Photos"
        },
        {
            id: 9, catId: 5,
            name: "Income Certificate (Aay Praman Patra)",
            price: 100, mrp: 300,
            image: "??",
            description: "Aay Praman Patra. e-District portal se online apply.",
            rating: 4.6, reviews: 1340,
            featured: true, active: true,
            time: "7-15 din",
            docs: "Aadhaar, Ration Card, Salary Slip"
        },
        {
            id: 10, catId: 5,
            name: "Caste Certificate (Jati Praman Patra)",
            price: 100, mrp: 300,
            image: "??",
            description: "SC/ST/OBC Jati Praman Patra online apply.",
            rating: 4.5, reviews: 2100,
            featured: true, active: true,
            time: "7-15 din",
            docs: "Aadhaar, Father's Caste Certificate"
        },
        {
            id: 11, catId: 5,
            name: "Domicile Certificate (Nivas Praman Patra)",
            price: 100, mrp: 300,
            image: "??",
            description: "Nivas Praman Patra. Education aur job ke liye zaroori.",
            rating: 4.5, reviews: 1780,
            featured: false, active: true,
            time: "7-15 din",
            docs: "Aadhaar, Ration Card, 10th Marksheet"
        },
        {
            id: 12, catId: 5,
            name: "Birth Certificate",
            price: 80, mrp: 200,
            image: "??",
            description: "Janam Praman Patra. Hospital ya Municipal Corporation se.",
            rating: 4.3, reviews: 1200,
            featured: false, active: true,
            time: "7-10 din",
            docs: "Hospital Record, Parents Aadhaar"
        },
        {
            id: 13, catId: 6,
            name: "PM Jeevan Jyoti Bima Yojana",
            price: 0, mrp: 50,
            image: "???",
            description: "?330/saal me ?2 lakh life insurance cover.",
            rating: 4.8, reviews: 4500,
            featured: true, active: true,
            time: "Same Day",
            docs: "Aadhaar, Bank Account, Age 18-50"
        },
        {
            id: 14, catId: 6,
            name: "PM Suraksha Bima Yojana",
            price: 0, mrp: 50,
            image: "??",
            description: "?12/saal me ?2 lakh accident insurance. Sabse sasta.",
            rating: 4.9, reviews: 5200,
            featured: true, active: true,
            time: "Same Day",
            docs: "Aadhaar, Bank Account"
        },
        {
            id: 15, catId: 7,
            name: "Scholarship Form Online",
            price: 100, mrp: 300,
            image: "??",
            description: "SC/ST/OBC/Minority/Girls scholarship apply kare.",
            rating: 4.6, reviews: 1900,
            featured: true, active: true,
            time: "Deadline based",
            docs: "Marksheet, Income Cert, Caste Cert, Bank A/C"
        },
        {
            id: 16, catId: 8,
            name: "Electricity Bill Payment",
            price: 10, mrp: 30,
            image: "?",
            description: "Bijli ka bill online. Sabhi state electricity boards.",
            rating: 4.7, reviews: 6700,
            featured: true, active: true,
            time: "Instant",
            docs: "Consumer ID / Bill Number"
        },
        {
            id: 17, catId: 8,
            name: "Mobile / DTH Recharge",
            price: 5, mrp: 20,
            image: "??",
            description: "Prepaid/Postpaid + DTH recharge. All operators.",
            rating: 4.8, reviews: 8900,
            featured: true, active: true,
            time: "Instant",
            docs: "Mobile / DTH Number"
        },
        {
            id: 18, catId: 9,
            name: "Kisan Credit Card (KCC) Apply",
            price: 100, mrp: 500,
            image: "??",
            description: "Kisan Credit Card apply. Low interest farm loan.",
            rating: 4.7, reviews: 1800,
            featured: true, active: true,
            time: "15-30 din",
            docs: "Aadhaar, Land Record, Bank A/C, Photo"
        },
        {
            id: 19, catId: 10,
            name: "Voter ID Card (New / Correction)",
            price: 50, mrp: 200,
            image: "???",
            description: "Naya Voter ID ya correction. NVSP portal se.",
            rating: 4.6, reviews: 3400,
            featured: true, active: true,
            time: "15-30 din",
            docs: "Aadhaar, Photo, Address Proof"
        },
        {
            id: 20, catId: 10,
            name: "Ration Card Apply / Update",
            price: 80, mrp: 300,
            image: "??",
            description: "Naya Ration Card ya naam add/remove karwaye.",
            rating: 4.5, reviews: 2900,
            featured: true, active: true,
            time: "15-30 din",
            docs: "Aadhaar of all members, Photo"
        },
        {
            id: 21, catId: 10,
            name: "Driving License (LL / DL)",
            price: 200, mrp: 700,
            image: "??",
            description: "Learning ya Permanent DL apply. RTO appointment.",
            rating: 4.4, reviews: 1600,
            featured: false, active: true,
            time: "15-30 din",
            docs: "Aadhaar, Age Proof, Medical, Photo"
        },
        {
            id: 22, catId: 10,
            name: "GST Registration",
            price: 500, mrp: 2000,
            image: "??",
            description: "Business ke liye GST Number registration.",
            rating: 4.6, reviews: 1200,
            featured: true, active: true,
            time: "7-15 din",
            docs: "PAN, Aadhaar, Bank, Rent Agreement"
        },
        {
            id: 23, catId: 10,
            name: "ITR Filing (Income Tax Return)",
            price: 300, mrp: 1000,
            image: "??",
            description: "Income Tax Return file kare. Refund claim karwaye.",
            rating: 4.7, reviews: 3400,
            featured: true, active: true,
            time: "Same Day",
            docs: "PAN, Form 16, Bank Statement, Aadhaar"
        },
        {
            id: 24, catId: 2,
            name: "Ayushman Bharat Golden Card",
            price: 50, mrp: 200,
            image: "??",
            description: "?5 lakh FREE health insurance. Puri family ke liye.",
            rating: 4.9, reviews: 5600,
            featured: true, active: true,
            time: "Same Day",
            docs: "Aadhaar, Ration Card, Family ID"
        },
        {
            id: 25, catId: 2,
            name: "Sukanya Samriddhi Yojana",
            price: 0, mrp: 100,
            image: "??",
            description: "Beti ke liye best saving scheme. Highest interest.",
            rating: 4.8, reviews: 2800,
            featured: true, active: true,
            time: "Same Day",
            docs: "Girl's Birth Cert, Parent Aadhaar, Photo"
        }
    ],
    
    banners: [
        { id: 1, text: "???? Digital India - Sabhi Sarkari Sevayen Ek Jagah!", active: true },
        { id: 2, text: "?? Aadhaar, PAN, Passport, Certificate - Turant Apply!", active: true },
        { id: 3, text: "?? PM Kisan ?6000, Ayushman ?5 Lakh - Sab Milega Yahan!", active: true },
        { id: 4, text: "? Bill Payment, Recharge, Insurance - Quick & Easy!", active: true }
    ],
    
    orders: []
};

// ============ DATA MANAGER ============
const DataManager = {
    STORE_KEY: 'gsk_main_data',
    DEV_KEY: 'gsk_dev_locked',
    
    // Initialize
    init() {
        if (!localStorage.getItem(this.STORE_KEY)) {
            localStorage.setItem(this.STORE_KEY, JSON.stringify(DEV_DEFAULTS));
        }
        // Developer locked fields backup
        if (!localStorage.getItem(this.DEV_KEY)) {
            const devFields = {
                developerPassword: DEV_DEFAULTS.developerPassword,
                developerName: DEV_DEFAULTS.developerName,
                developerContact: DEV_DEFAULTS.developerContact,
                appVersion: DEV_DEFAULTS.appVersion,
                centerName: DEV_DEFAULTS.centerName,
                centerSubtitle: DEV_DEFAULTS.centerSubtitle,
                shopName: DEV_DEFAULTS.shopName,
                logoEmoji: DEV_DEFAULTS.logoEmoji,
                adminCanChangeName: false,
                adminCanChangeLogo: false,
                googleDriveDataUrl: ""
            };
            localStorage.setItem(this.DEV_KEY, JSON.stringify(devFields));
        }
    },
    
    // Get all data (merges dev locked + admin data)
    getData() {
        this.init();
        const mainData = JSON.parse(localStorage.getItem(this.STORE_KEY));
        const devData = JSON.parse(localStorage.getItem(this.DEV_KEY));
        
        // Developer fields ALWAYS override
        mainData.centerName = devData.centerName;
        mainData.centerSubtitle = devData.centerSubtitle;
        mainData.shopName = devData.shopName;
        mainData.logoEmoji = devData.logoEmoji;
        mainData.developerName = devData.developerName;
        mainData.developerContact = devData.developerContact;
        mainData.appVersion = devData.appVersion;
        mainData.developerPassword = devData.developerPassword;
        mainData.adminCanChangeName = devData.adminCanChangeName;
        mainData.adminCanChangeLogo = devData.adminCanChangeLogo;
        mainData.googleDriveDataUrl = devData.googleDriveDataUrl;
        
        return mainData;
    },
    
    // Get developer locked data
    getDevData() {
        this.init();
        return JSON.parse(localStorage.getItem(this.DEV_KEY));
    },
    
    // Save main data (admin level)
    saveData(data) {
        // Prevent admin from changing locked fields
        const devData = this.getDevData();
        data.centerName = devData.centerName;
        data.centerSubtitle = devData.centerSubtitle;
        data.shopName = devData.shopName;
        data.logoEmoji = devData.logoEmoji;
        data.developerName = devData.developerName;
        data.developerPassword = devData.developerPassword;
        
        localStorage.setItem(this.STORE_KEY, JSON.stringify(data));
    },
    
    // Save developer data (ONLY developer)
    saveDevData(devData) {
        localStorage.setItem(this.DEV_KEY, JSON.stringify(devData));
        // Also update main data
        const mainData = JSON.parse(localStorage.getItem(this.STORE_KEY));
        mainData.centerName = devData.centerName;
        mainData.centerSubtitle = devData.centerSubtitle;
        mainData.shopName = devData.shopName;
        mainData.logoEmoji = devData.logoEmoji;
        mainData.developerName = devData.developerName;
        mainData.developerContact = devData.developerContact;
        mainData.appVersion = devData.appVersion;
        mainData.developerPassword = devData.developerPassword;
        mainData.adminCanChangeName = devData.adminCanChangeName;
        mainData.adminCanChangeLogo = devData.adminCanChangeLogo;
        mainData.googleDriveDataUrl = devData.googleDriveDataUrl;
        localStorage.setItem(this.STORE_KEY, JSON.stringify(mainData));
    },
    
    // Verify developer password
    verifyDev(password) {
        const devData = this.getDevData();
        return password === devData.developerPassword;
    },
    
    // Verify admin password
    verifyAdmin(password) {
        const data = this.getData();
        return password === data.adminPassword;
    },
    
    // Add Order
    addOrder(order) {
        const data = this.getData();
        order.id = Date.now();
        order.date = new Date().toLocaleString('hi-IN');
        order.status = "pending";
        data.orders.unshift(order);
        this.saveData(data);
        return order.id;
    },
    
    // Update Product
    updateProduct(id, updates) {
        const data = this.getData();
        const idx = data.products.findIndex(p => p.id === id);
        if (idx !== -1) {
            data.products[idx] = { ...data.products[idx], ...updates };
            this.saveData(data);
        }
    },
    
    // Add Product
    addProduct(product) {
        const data = this.getData();
        product.id = Date.now();
        data.products.push(product);
        this.saveData(data);
    },
    
    // Delete Product
    deleteProduct(id) {
        const data = this.getData();
        data.products = data.products.filter(p => p.id !== id);
        this.saveData(data);
    },
    
    // Reset (Developer only)
    resetAll() {
        localStorage.setItem(this.STORE_KEY, JSON.stringify(DEV_DEFAULTS));
    },
    
    // Export for Google Drive
    exportJSON() {
        const data = this.getData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'GSK_Backup_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
    },
    
    // Import from JSON
    importJSON(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            this.saveData(data);
            return true;
        } catch (e) {
            return false;
        }
    },
    
    // Load from Google Drive URL
    async loadFromDrive(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.saveData(data);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// ============ CART MANAGER ============
const CartManager = {
    KEY: 'gsk_cart',
    
    getCart() {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    },
    saveCart(cart) {
        localStorage.setItem(this.KEY, JSON.stringify(cart));
    },
    addItem(product) {
        const cart = this.getCart();
        const existing = cart.find(i => i.id === product.id);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1
            });
        }
        this.saveCart(cart);
    },
    removeItem(id) {
        this.saveCart(this.getCart().filter(i => i.id !== id));
    },
    updateQty(id, qty) {
        if (qty <= 0) { this.removeItem(id); return; }
        const cart = this.getCart();
        const item = cart.find(i => i.id === id);
        if (item) item.qty = qty;
        this.saveCart(cart);
    },
    getTotal() {
        const cart = this.getCart();
        const data = DataManager.getData();
        const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
        return { subtotal, total: subtotal + (data.serviceCharge || 0), count: cart.length };
    },
    clear() {
        localStorage.removeItem(this.KEY);
    }
};

// ============ WISHLIST MANAGER ============
const WishlistManager = {
    KEY: 'gsk_wish',
    getList() { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); },
    toggle(id) {
        let list = this.getList();
        if (list.includes(id)) list = list.filter(x => x !== id);
        else list.push(id);
        localStorage.setItem(this.KEY, JSON.stringify(list));
        return list.includes(id);
    },
    isWished(id) { return this.getList().includes(id); }
};
