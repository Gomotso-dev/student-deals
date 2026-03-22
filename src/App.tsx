/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from "@supabase/supabase-js";
import { 
  Bell,
  CheckCircle2, 
  ChevronRight, 
  CreditCard, 
  Filter, 
  Home, 
  Info, 
  LayoutDashboard, 
  Loader2, 
  LogOut, 
  Menu, 
  MessageSquare, 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  ShoppingBag, 
  Star, 
  Tag, 
  User, 
  Users, 
  Wallet, 
  X, 
  XCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useMemo } from "react";
import { STORE_CONFIG } from "./constants";
import { UserProfile, Listing } from "./types";

// Initialize Supabase client
const supabase = createClient(
  STORE_CONFIG.SUPABASE_URL,
  STORE_CONFIG.SUPABASE_PUBLISHABLE_KEY
);

// Mock Data for MVP
const MOCK_LISTINGS: Listing[] = [
  // Academics
  { id: "a1", seller_id: "s1", title: "Calculus Early Transcendentals", description: "Used for 1st year engineering. Good condition, no highlights.", price: 450, category: "Academics", images: ["https://picsum.photos/seed/book1/400/400"], condition: "used", university: "UKZN", isbn: "978-1337616195", type: "product", created_at: new Date().toISOString() },
  { id: "a2", seller_id: "s2", title: "Organic Chemistry 2nd Ed", description: "Essential for pre-med students. Minimal wear.", price: 550, category: "Academics", images: ["https://picsum.photos/seed/chem/400/400"], condition: "used", university: "WITS", isbn: "978-1118452288", type: "product", created_at: new Date().toISOString() },
  { id: "a3", seller_id: "s3", title: "Macroeconomics Study Guide", description: "Helpful summaries and practice exams.", price: 200, category: "Academics", images: ["https://picsum.photos/seed/econ/400/400"], condition: "used", university: "UJ", type: "product", created_at: new Date().toISOString() },
  { id: "a4", seller_id: "s4", title: "Financial Accounting Principles", description: "Hardcover, like new condition.", price: 600, category: "Academics", images: ["https://picsum.photos/seed/acc/400/400"], condition: "new", university: "UP", type: "product", created_at: new Date().toISOString() },
  { id: "a5", seller_id: "s5", title: "Psychology: An Introduction", description: "Standard textbook for Psych 101.", price: 350, category: "Academics", images: ["https://picsum.photos/seed/psych/400/400"], condition: "used", university: "UCT", type: "product", created_at: new Date().toISOString() },
  { id: "a6", seller_id: "s6", title: "Engineering Mechanics: Statics", description: "Required for mechanical engineering.", price: 500, category: "Academics", images: ["https://picsum.photos/seed/eng/400/400"], condition: "used", university: "Stellenbosch", type: "product", created_at: new Date().toISOString() },
  { id: "a7", seller_id: "s7", title: "Business Law Casebook", description: "Includes latest case studies.", price: 400, category: "Academics", images: ["https://picsum.photos/seed/law/400/400"], condition: "used", university: "NWU", type: "product", created_at: new Date().toISOString() },
  { id: "a8", seller_id: "s8", title: "Introduction to Sociology", description: "Softcover, some highlighting.", price: 150, category: "Academics", images: ["https://picsum.photos/seed/soc/400/400"], condition: "used", university: "DUT", type: "product", created_at: new Date().toISOString() },
  { id: "a9", seller_id: "s9", title: "Biology: The Core", description: "Great for life sciences students.", price: 480, category: "Academics", images: ["https://picsum.photos/seed/bio/400/400"], condition: "used", university: "TUT", type: "product", created_at: new Date().toISOString() },
  { id: "a10", seller_id: "s10", title: "Architectural Design Basics", description: "Essential for architecture freshmen.", price: 700, category: "Academics", images: ["https://picsum.photos/seed/arch/400/400"], condition: "new", university: "WITS", type: "product", created_at: new Date().toISOString() },

  // Tech & Electronics
  { id: "t1", seller_id: "s3", title: "iPhone 12 - 128GB", description: "Excellent condition, includes original box and charger.", price: 8500, category: "Tech & Electronics", images: ["https://picsum.photos/seed/phone/400/400"], condition: "used", university: "WITS", device_verification: "IMEI: 356789...", type: "product", created_at: new Date().toISOString() },
  { id: "t2", seller_id: "s11", title: "MacBook Air M1", description: "8GB RAM, 256GB SSD. Space Gray. Perfect for students.", price: 12000, category: "Tech & Electronics", images: ["https://picsum.photos/seed/laptop/400/400"], condition: "used", university: "UCT", type: "product", created_at: new Date().toISOString() },
  { id: "t3", seller_id: "s12", title: "Sony WH-1000XM4", description: "Noise cancelling headphones. Barely used.", price: 3500, category: "Tech & Electronics", images: ["https://picsum.photos/seed/headphones/400/400"], condition: "used", university: "UP", type: "product", created_at: new Date().toISOString() },
  { id: "t4", seller_id: "s13", title: "Samsung Galaxy Tab S7", description: "Includes S-Pen. Great for digital note-taking.", price: 6500, category: "Tech & Electronics", images: ["https://picsum.photos/seed/tablet/400/400"], condition: "used", university: "Stellenbosch", type: "product", created_at: new Date().toISOString() },
  { id: "t5", seller_id: "s14", title: "Logitech MX Master 3", description: "The best productivity mouse. Brand new.", price: 1800, category: "Tech & Electronics", images: ["https://picsum.photos/seed/mouse/400/400"], condition: "new", university: "UJ", type: "product", created_at: new Date().toISOString() },
  { id: "t6", seller_id: "s15", title: "Dell 27-inch 4K Monitor", description: "IPS panel, great color accuracy.", price: 4500, category: "Tech & Electronics", images: ["https://picsum.photos/seed/monitor/400/400"], condition: "used", university: "UKZN", type: "product", created_at: new Date().toISOString() },
  { id: "t7", seller_id: "s16", title: "Mechanical Keyboard (Blue Switches)", description: "RGB lighting, tactile feel.", price: 800, category: "Tech & Electronics", images: ["https://picsum.photos/seed/keyboard/400/400"], condition: "used", university: "DUT", type: "product", created_at: new Date().toISOString() },
  { id: "t8", seller_id: "s17", title: "Anker PowerCore 20000mAh", description: "Fast charging power bank.", price: 600, category: "Tech & Electronics", images: ["https://picsum.photos/seed/powerbank/400/400"], condition: "new", university: "TUT", type: "product", created_at: new Date().toISOString() },
  { id: "t9", seller_id: "s18", title: "Kindle Paperwhite", description: "10th Gen, 8GB. Waterproof.", price: 1500, category: "Tech & Electronics", images: ["https://picsum.photos/seed/kindle/400/400"], condition: "used", university: "NWU", type: "product", created_at: new Date().toISOString() },
  { id: "t10", seller_id: "s19", title: "GoPro Hero 9", description: "Includes extra batteries and mount.", price: 5000, category: "Tech & Electronics", images: ["https://picsum.photos/seed/gopro/400/400"], condition: "used", university: "WITS", type: "product", created_at: new Date().toISOString() },

  // Accommodation & Living
  { id: "l1", seller_id: "s20", title: "Single Room in Braamfontein", description: "Fully furnished, close to WITS. R3500/month.", price: 3500, category: "Accommodation & Living", images: ["https://picsum.photos/seed/room1/400/400"], condition: "new", university: "WITS", type: "service", created_at: new Date().toISOString() },
  { id: "l2", seller_id: "s21", title: "Desk Lamp - LED", description: "Adjustable brightness and color temp.", price: 250, category: "Accommodation & Living", images: ["https://picsum.photos/seed/lamp/400/400"], condition: "used", university: "UJ", type: "product", created_at: new Date().toISOString() },
  { id: "l3", seller_id: "s22", title: "Mini Fridge (90L)", description: "Perfect for dorm rooms. Energy efficient.", price: 1800, category: "Accommodation & Living", images: ["https://picsum.photos/seed/fridge/400/400"], condition: "used", university: "UP", type: "product", created_at: new Date().toISOString() },
  { id: "l4", seller_id: "s23", title: "Microwave Oven", description: "700W, compact size.", price: 800, category: "Accommodation & Living", images: ["https://picsum.photos/seed/microwave/400/400"], condition: "used", university: "UCT", type: "product", created_at: new Date().toISOString() },
  { id: "l5", seller_id: "s24", title: "Electric Kettle", description: "1.7L, fast boil.", price: 200, category: "Accommodation & Living", images: ["https://picsum.photos/seed/kettle/400/400"], condition: "new", university: "Stellenbosch", type: "product", created_at: new Date().toISOString() },
  { id: "l6", seller_id: "s25", title: "Study Desk & Chair Set", description: "Wooden desk with ergonomic chair.", price: 1200, category: "Accommodation & Living", images: ["https://picsum.photos/seed/desk/400/400"], condition: "used", university: "UKZN", type: "product", created_at: new Date().toISOString() },
  { id: "l7", seller_id: "s26", title: "Laundry Basket", description: "Large capacity, collapsible.", price: 100, category: "Accommodation & Living", images: ["https://picsum.photos/seed/laundry/400/400"], condition: "new", university: "DUT", type: "product", created_at: new Date().toISOString() },
  { id: "l8", seller_id: "s27", title: "Bedside Table", description: "Two drawers, white finish.", price: 300, category: "Accommodation & Living", images: ["https://picsum.photos/seed/table/400/400"], condition: "used", university: "TUT", type: "product", created_at: new Date().toISOString() },
  { id: "l9", seller_id: "s28", title: "Full Length Mirror", description: "Standing mirror, black frame.", price: 400, category: "Accommodation & Living", images: ["https://picsum.photos/seed/mirror/400/400"], condition: "used", university: "NWU", type: "product", created_at: new Date().toISOString() },
  { id: "l10", seller_id: "s29", title: "Drying Rack", description: "Sturdy metal frame, foldable.", price: 150, category: "Accommodation & Living", images: ["https://picsum.photos/seed/rack/400/400"], condition: "used", university: "WITS", type: "product", created_at: new Date().toISOString() },

  // Clothing & Personal
  { id: "c1", seller_id: "s4", title: "Vintage Denim Jacket", description: "Classic oversized fit. Perfect for campus style.", price: 350, category: "Clothing & Personal", images: ["https://picsum.photos/seed/jacket/400/400"], condition: "used", university: "UP", type: "product", created_at: new Date().toISOString() },
  { id: "c2", seller_id: "s30", title: "Nike Air Force 1", description: "White, size 8. Good condition.", price: 900, category: "Clothing & Personal", images: ["https://picsum.photos/seed/shoes/400/400"], condition: "used", university: "UJ", type: "product", created_at: new Date().toISOString() },
  { id: "c3", seller_id: "s31", title: "North Face Backpack", description: "30L capacity, laptop sleeve.", price: 700, category: "Clothing & Personal", images: ["https://picsum.photos/seed/backpack/400/400"], condition: "used", university: "UCT", type: "product", created_at: new Date().toISOString() },
  { id: "c4", seller_id: "s32", title: "Ray-Ban Aviators", description: "Classic gold frame, green lenses.", price: 1200, category: "Clothing & Personal", images: ["https://picsum.photos/seed/sunglasses/400/400"], condition: "used", university: "Stellenbosch", type: "product", created_at: new Date().toISOString() },
  { id: "c5", seller_id: "s33", title: "Leather Wallet", description: "Genuine leather, slim design.", price: 250, category: "Clothing & Personal", images: ["https://picsum.photos/seed/wallet/400/400"], condition: "new", university: "UKZN", type: "product", created_at: new Date().toISOString() },
  { id: "c6", seller_id: "s34", title: "Hoodie - University Branded", description: "Warm and cozy, size M.", price: 400, category: "Clothing & Personal", images: ["https://picsum.photos/seed/hoodie/400/400"], condition: "used", university: "WITS", type: "product", created_at: new Date().toISOString() },
  { id: "c7", seller_id: "s35", title: "Yoga Mat", description: "Non-slip, 6mm thickness.", price: 200, category: "Clothing & Personal", images: ["https://picsum.photos/seed/yoga/400/400"], condition: "new", university: "DUT", type: "product", created_at: new Date().toISOString() },
  { id: "c8", seller_id: "s36", title: "Electric Toothbrush", description: "Sonic technology, rechargeable.", price: 500, category: "Clothing & Personal", images: ["https://picsum.photos/seed/toothbrush/400/400"], condition: "new", university: "TUT", type: "product", created_at: new Date().toISOString() },
  { id: "c9", seller_id: "s37", title: "Hair Dryer", description: "2000W, multiple heat settings.", price: 300, category: "Clothing & Personal", images: ["https://picsum.photos/seed/hairdryer/400/400"], condition: "used", university: "NWU", type: "product", created_at: new Date().toISOString() },
  { id: "c10", seller_id: "s38", title: "Gym Bag", description: "Separate shoe compartment.", price: 350, category: "Clothing & Personal", images: ["https://picsum.photos/seed/gymbag/400/400"], condition: "used", university: "UP", type: "product", created_at: new Date().toISOString() },

  // Food & Groceries
  { id: "f1", seller_id: "s39", title: "Bulk Pack 2-Minute Noodles", description: "Box of 40 packs. Chicken flavor.", price: 180, category: "Food & Groceries", images: ["https://picsum.photos/seed/noodles/400/400"], condition: "new", university: "UJ", type: "product", created_at: new Date().toISOString() },
  { id: "f2", seller_id: "s40", title: "Instant Coffee (200g)", description: "Rich roast, sealed.", price: 80, category: "Food & Groceries", images: ["https://picsum.photos/seed/coffee/400/400"], condition: "new", university: "WITS", type: "product", created_at: new Date().toISOString() },
  { id: "f3", seller_id: "s41", title: "Peanut Butter (1kg)", description: "Creamy, high protein.", price: 60, category: "Food & Groceries", images: ["https://picsum.photos/seed/pb/400/400"], condition: "new", university: "UP", type: "product", created_at: new Date().toISOString() },
  { id: "f4", seller_id: "s42", title: "Rice (5kg)", description: "Long grain parboiled.", price: 90, category: "Food & Groceries", images: ["https://picsum.photos/seed/rice/400/400"], condition: "new", university: "UCT", type: "product", created_at: new Date().toISOString() },
  { id: "f5", seller_id: "s43", title: "Cooking Oil (2L)", description: "Sunflower oil, pure.", price: 75, category: "Food & Groceries", images: ["https://picsum.photos/seed/oil/400/400"], condition: "new", university: "Stellenbosch", type: "product", created_at: new Date().toISOString() },
  { id: "f6", seller_id: "s44", title: "Pasta Variety Pack", description: "Spaghetti, Penne, Fusilli.", price: 100, category: "Food & Groceries", images: ["https://picsum.photos/seed/pasta/400/400"], condition: "new", university: "UKZN", type: "product", created_at: new Date().toISOString() },
  { id: "f7", seller_id: "s45", title: "Canned Beans (Pack of 6)", description: "Baked beans in tomato sauce.", price: 70, category: "Food & Groceries", images: ["https://picsum.photos/seed/beans/400/400"], condition: "new", university: "DUT", type: "product", created_at: new Date().toISOString() },
  { id: "f8", seller_id: "s46", title: "Energy Drinks (Case of 24)", description: "Sugar-free, 250ml cans.", price: 300, category: "Food & Groceries", images: ["https://picsum.photos/seed/energy/400/400"], condition: "new", university: "TUT", type: "product", created_at: new Date().toISOString() },
  { id: "f9", seller_id: "s47", title: "Trail Mix (500g)", description: "Nuts, seeds, and dried fruit.", price: 120, category: "Food & Groceries", images: ["https://picsum.photos/seed/trailmix/400/400"], condition: "new", university: "NWU", type: "product", created_at: new Date().toISOString() },
  { id: "f10", seller_id: "s48", title: "Oats (1kg)", description: "Rolled oats, great for breakfast.", price: 45, category: "Food & Groceries", images: ["https://picsum.photos/seed/oats/400/400"], condition: "new", university: "WITS", type: "product", created_at: new Date().toISOString() },

  // Transport
  { id: "tr1", seller_id: "s49", title: "Bicycle - Mountain Bike", description: "21 speeds, front suspension.", price: 2500, category: "Transport", images: ["https://picsum.photos/seed/bike/400/400"], condition: "used", university: "Stellenbosch", type: "product", created_at: new Date().toISOString() },
  { id: "tr2", seller_id: "s50", title: "Skateboard - Longboard", description: "Smooth ride, great for campus.", price: 800, category: "Transport", images: ["https://picsum.photos/seed/skateboard/400/400"], condition: "used", university: "UCT", type: "product", created_at: new Date().toISOString() },
  { id: "tr3", seller_id: "s51", title: "Electric Scooter", description: "Foldable, 25km range.", price: 4500, category: "Transport", images: ["https://picsum.photos/seed/escooter/400/400"], condition: "used", university: "UP", type: "product", created_at: new Date().toISOString() },
  { id: "tr4", seller_id: "s52", title: "Helmet - Bicycle", description: "Safety first! Size L.", price: 300, category: "Transport", images: ["https://picsum.photos/seed/helmet/400/400"], condition: "new", university: "UJ", type: "product", created_at: new Date().toISOString() },
  { id: "tr5", seller_id: "s53", title: "Bike Lock - U-Lock", description: "Heavy duty, includes two keys.", price: 250, category: "Transport", images: ["https://picsum.photos/seed/lock/400/400"], condition: "used", university: "WITS", type: "product", created_at: new Date().toISOString() },
  { id: "tr6", seller_id: "s54", title: "Carpool to Pretoria", description: "Leaving every Friday afternoon.", price: 100, category: "Transport", images: ["https://picsum.photos/seed/carpool/400/400"], condition: "new", university: "UJ", type: "service", created_at: new Date().toISOString() },
  { id: "tr7", seller_id: "s55", title: "Bus Ticket - Intercity", description: "Valid for one trip to Durban.", price: 350, category: "Transport", images: ["https://picsum.photos/seed/busticket/400/400"], condition: "new", university: "UP", type: "product", created_at: new Date().toISOString() },
  { id: "tr8", seller_id: "s56", title: "Rollerblades", description: "Size 9, includes pads.", price: 600, category: "Transport", images: ["https://picsum.photos/seed/rollerblades/400/400"], condition: "used", university: "UKZN", type: "product", created_at: new Date().toISOString() },
  { id: "tr9", seller_id: "s57", title: "Bike Pump", description: "Portable, fits all valves.", price: 150, category: "Transport", images: ["https://picsum.photos/seed/pump/400/400"], condition: "used", university: "DUT", type: "product", created_at: new Date().toISOString() },
  { id: "tr10", seller_id: "s58", title: "Uber Voucher (R200)", description: "Digital code for R200 credit.", price: 180, category: "Transport", images: ["https://picsum.photos/seed/uber/400/400"], condition: "new", university: "TUT", type: "product", created_at: new Date().toISOString() },

  // Jobs & Gigs
  { id: "j1", seller_id: "s59", title: "Part-time Waiter Needed", description: "Weekend shifts at campus cafe.", price: 50, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/waiter/400/400"], condition: "new", university: "WITS", type: "service", created_at: new Date().toISOString() },
  { id: "j2", seller_id: "s60", title: "Graphic Design Gig", description: "Logo design for student societies.", price: 500, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/design/400/400"], condition: "new", university: "UJ", type: "service", created_at: new Date().toISOString() },
  { id: "j3", seller_id: "s61", title: "Data Entry Assistant", description: "Remote work, 10 hours/week.", price: 100, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/data/400/400"], condition: "new", university: "UP", type: "service", created_at: new Date().toISOString() },
  { id: "j4", seller_id: "s62", title: "Social Media Manager", description: "Manage accounts for local shop.", price: 1500, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/social/400/400"], condition: "new", university: "UCT", type: "service", created_at: new Date().toISOString() },
  { id: "j5", seller_id: "s63", title: "Dog Walker", description: "Available weekday mornings.", price: 80, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/dog/400/400"], condition: "new", university: "Stellenbosch", type: "service", created_at: new Date().toISOString() },
  { id: "j6", seller_id: "s64", title: "Research Participant", description: "Paid study on student habits.", price: 200, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/study/400/400"], condition: "new", university: "UKZN", type: "service", created_at: new Date().toISOString() },
  { id: "j7", seller_id: "s65", title: "Promoter for Event", description: "Handing out flyers on campus.", price: 60, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/promoter/400/400"], condition: "new", university: "DUT", type: "service", created_at: new Date().toISOString() },
  { id: "j8", seller_id: "s66", title: "Transcriptionist", description: "Transcribe lecture recordings.", price: 150, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/transcribe/400/400"], condition: "new", university: "TUT", type: "service", created_at: new Date().toISOString() },
  { id: "j9", seller_id: "s67", title: "Delivery Driver", description: "Deliver food on campus.", price: 70, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/delivery/400/400"], condition: "new", university: "NWU", type: "service", created_at: new Date().toISOString() },
  { id: "j10", seller_id: "s68", title: "Tutor - Mathematics", description: "Help with high school math.", price: 120, category: "Jobs & Gigs", images: ["https://picsum.photos/seed/mathtutor/400/400"], condition: "new", university: "WITS", type: "service", created_at: new Date().toISOString() },

  // Services
  { id: "s_v1", seller_id: "s2", title: "Python Tutoring - All Levels", description: "I can help you with your CS assignments and projects. 2nd year CS student.", price: 150, category: "Services", images: ["https://picsum.photos/seed/tutor/400/400"], condition: "new", university: "DUT", type: "service", created_at: new Date().toISOString() },
  { id: "s_v2", seller_id: "s69", title: "CV Writing & Review", description: "Get your CV ready for internships.", price: 200, category: "Services", images: ["https://picsum.photos/seed/cv/400/400"], condition: "new", university: "UJ", type: "service", created_at: new Date().toISOString() },
  { id: "s_v3", seller_id: "s70", title: "Photography - Grad Portraits", description: "Professional graduation photos.", price: 800, category: "Services", images: ["https://picsum.photos/seed/photo/400/400"], condition: "new", university: "UP", type: "service", created_at: new Date().toISOString() },
  { id: "s_v4", seller_id: "s71", title: "Laptop Repair & Cleaning", description: "Hardware and software troubleshooting.", price: 300, category: "Services", images: ["https://picsum.photos/seed/repair/400/400"], condition: "new", university: "UCT", type: "service", created_at: new Date().toISOString() },
  { id: "s_v5", seller_id: "s72", title: "Hair Braiding", description: "Available at my dorm or yours.", price: 450, category: "Services", images: ["https://picsum.photos/seed/hair/400/400"], condition: "new", university: "Stellenbosch", type: "service", created_at: new Date().toISOString() },
  { id: "s_v6", seller_id: "s73", title: "Proofreading & Editing", description: "Ensure your essays are perfect.", price: 100, category: "Services", images: ["https://picsum.photos/seed/edit/400/400"], condition: "new", university: "UKZN", type: "service", created_at: new Date().toISOString() },
  { id: "s_v7", seller_id: "s74", title: "Personal Training", description: "Custom workout plans for students.", price: 250, category: "Services", images: ["https://picsum.photos/seed/gym/400/400"], condition: "new", university: "DUT", type: "service", created_at: new Date().toISOString() },
  { id: "s_v8", seller_id: "s75", title: "Moving Help", description: "I have a bakkie, can help you move.", price: 600, category: "Services", images: ["https://picsum.photos/seed/move/400/400"], condition: "new", university: "TUT", type: "service", created_at: new Date().toISOString() },
  { id: "s_v9", seller_id: "s76", title: "Guitar Lessons", description: "Beginner to intermediate levels.", price: 180, category: "Services", images: ["https://picsum.photos/seed/guitar/400/400"], condition: "new", university: "NWU", type: "service", created_at: new Date().toISOString() },
  { id: "s_v10", seller_id: "s77", title: "Meal Prep Service", description: "Healthy meals delivered weekly.", price: 700, category: "Services", images: ["https://picsum.photos/seed/mealprep/400/400"], condition: "new", university: "WITS", type: "service", created_at: new Date().toISOString() },

  // Buy • Sell • Trade
  { id: "b1", seller_id: "s78", title: "Trading PS4 for Xbox One", description: "Console is in great condition.", price: 0, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/ps4/400/400"], condition: "used", university: "UJ", type: "product", created_at: new Date().toISOString() },
  { id: "b2", seller_id: "s79", title: "Selling Used Textbooks Bundle", description: "Various subjects, negotiable.", price: 1000, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/books2/400/400"], condition: "used", university: "WITS", type: "product", created_at: new Date().toISOString() },
  { id: "b3", seller_id: "s80", title: "Swap: Calculator for Backpack", description: "Scientific calculator needed.", price: 0, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/swap/400/400"], condition: "used", university: "UP", type: "product", created_at: new Date().toISOString() },
  { id: "b4", seller_id: "s81", title: "Bulk Buy: Stationery", description: "Pens, notebooks, folders.", price: 300, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/stationery/400/400"], condition: "new", university: "UCT", type: "product", created_at: new Date().toISOString() },
  { id: "b5", seller_id: "s82", title: "Trade: Monitor for Tablet", description: "Looking for a decent tablet.", price: 0, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/trade/400/400"], condition: "used", university: "Stellenbosch", type: "product", created_at: new Date().toISOString() },
  { id: "b6", seller_id: "s83", title: "Selling Dorm Decor", description: "Posters, lights, cushions.", price: 500, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/decor/400/400"], condition: "used", university: "UKZN", type: "product", created_at: new Date().toISOString() },
  { id: "b7", seller_id: "s84", title: "Swap: Gym Gear", description: "Dumbbells for kettlebells.", price: 0, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/gymswap/400/400"], condition: "used", university: "DUT", type: "product", created_at: new Date().toISOString() },
  { id: "b8", seller_id: "s85", title: "Selling Art Supplies", description: "Paints, brushes, canvases.", price: 800, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/art/400/400"], condition: "used", university: "TUT", type: "product", created_at: new Date().toISOString() },
  { id: "b9", seller_id: "s86", title: "Trade: Headphones for Watch", description: "Bluetooth headphones available.", price: 0, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/trades/400/400"], condition: "used", university: "NWU", type: "product", created_at: new Date().toISOString() },
  { id: "b10", seller_id: "s87", title: "Selling Board Games", description: "Catan, Monopoly, Scrabble.", price: 600, category: "Buy • Sell • Trade", images: ["https://picsum.photos/seed/games/400/400"], condition: "used", university: "WITS", type: "product", created_at: new Date().toISOString() }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'marketplace' | 'post' | 'dashboard' | 'messages'>('home');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUniversity, setSelectedUniversity] = useState("All Universities");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  
  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Simulated Auth
  const loginAs = (role: 'buyer' | 'seller' | 'admin') => {
    const mockUser: UserProfile = {
      id: role === 'admin' ? 'admin1' : role === 'seller' ? 's1' : 'b1',
      full_name: role === 'admin' ? 'Admin User' : role === 'seller' ? 'Gomotso Seller' : 'Student Buyer',
      student_number: "21800000",
      university: "UKZN",
      email: role === 'admin' ? 'admin@campusdeals.co.za' : 'student@campus.ac.za',
      role,
      is_verified: true,
      wallet_balance: role === 'buyer' ? 1000 : 0
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const filteredListings = useMemo(() => {
    let result = [...MOCK_LISTINGS].filter(l => {
      const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           l.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || l.category === selectedCategory;
      const matchesUni = selectedUniversity === "All Universities" || l.university === selectedUniversity;
      const matchesPrice = l.price >= priceRange[0] && l.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesUni && matchesPrice;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return result;
  }, [searchQuery, selectedCategory, selectedUniversity, priceRange, sortBy]);

  const handlePlaceOrder = async (listing: Listing) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from("orders")
        .insert([{
          customer_name: user.full_name,
          phone: "0000000000", 
          email: user.email,
          city: user.university,
          address: "Campus Meetup",
          country: "South Africa",
          product_name: listing.title,
          product_variant: listing.condition,
          quantity: 1,
          notes: `Escrow Order for ${listing.title}`,
          status: "pending"
        }]);

      if (error) throw error;
      
      setSubmitStatus('success');
      setTimeout(() => {
        setIsOrderModalOpen(false);
        setSubmitStatus('idle');
      }, 3000);
    } catch (err) {
      console.error("Order error:", err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-ink font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white py-2 px-4 text-center text-xs font-bold tracking-widest uppercase">
        Trade in and Save, Limited Edition • FREE DELIVERY ON ORDERS OVER R500
      </div>

      {/* Main Header */}
      <header className="sticky top-0 bg-white border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">C</div>
            <span className="font-black text-2xl tracking-tighter text-primary uppercase">Campus Deals</span>
          </div>

          <div className="flex-1 max-w-2xl relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for products, services, or jobs..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => setActiveTab('post')}
                className="flex items-center gap-2 font-bold text-sm hover:text-primary transition-colors"
              >
                <PlusCircle size={18} /> Sell
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className="flex items-center gap-2 font-bold text-sm hover:text-primary transition-colors"
              >
                <MessageSquare size={18} /> Messages
              </button>
            </div>
            
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold hover:bg-slate-200 transition-all"
                >
                  {user.full_name[0]}
                </button>
                <button onClick={logout} className="text-slate-400 hover:text-rose-600 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Login / Register
              </button>
            )}
            
            <button className="md:hidden p-2 text-slate-600">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-slate-50 bg-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 py-3">
            {STORE_CONFIG.CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveTab('marketplace');
                }}
                className={`text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors ${
                  selectedCategory === cat ? 'text-primary' : 'text-slate-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="relative h-[600px] bg-slate-900 flex items-center overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/campus/1920/1080?blur=2" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                
                <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                  <div className="max-w-2xl">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block px-4 py-1 bg-secondary text-ink text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6"
                    >
                      Limited Edition Deals
                    </motion.div>
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase italic"
                    >
                      Trade in <br /> & Save
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-300 text-lg mb-10 max-w-lg"
                    >
                      The #1 student marketplace for buying, selling, and trading within your campus community.
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-4"
                    >
                      <button 
                        onClick={() => setActiveTab('marketplace')}
                        className="px-10 py-4 bg-white text-primary rounded-full font-black text-sm uppercase tracking-widest hover:bg-secondary hover:text-ink transition-all"
                      >
                        Shop Now
                      </button>
                      <button 
                        onClick={() => setActiveTab('post')}
                        className="px-10 py-4 border-2 border-white text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all"
                      >
                        Start Selling
                      </button>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Feature Highlights */}
              <section className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
                  <FeatureItem icon={<ShoppingBag size={24} />} title="FREE DELIVERY" subtitle="On orders over R500" />
                  <FeatureItem icon={<LogOut size={24} />} title="FREE RETURN" subtitle="30-day return policy" />
                  <FeatureItem icon={<Tag size={24} />} title="BIG SAVING" subtitle="Student-only discounts" />
                  <FeatureItem icon={<Users size={24} />} title="SUPPORT 24/7" subtitle="Dedicated help center" />
                  <FeatureItem icon={<CreditCard size={24} />} title="SECURE PAYMENT" subtitle="Escrow protection" />
                </div>
              </section>

              {/* Promotional Banners */}
              <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-8">
                <PromoBanner 
                  title="#For Women !!" 
                  subtitle="Latest Fashion & Accessories" 
                  image="https://picsum.photos/seed/women/800/600" 
                  color="bg-rose-500"
                />
                <PromoBanner 
                  title="#All Accessories !!" 
                  subtitle="Tech, Books & More" 
                  image="https://picsum.photos/seed/acc/800/600" 
                  color="bg-primary"
                />
                <PromoBanner 
                  title="#For Men's !!" 
                  subtitle="Streetwear & Gadgets" 
                  image="https://picsum.photos/seed/men/800/600" 
                  color="bg-slate-800"
                />
              </section>

              {/* Best Products Section */}
              <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-black uppercase italic mb-4">Our Best Products</h2>
                  <div className="w-20 h-1 bg-primary mx-auto"></div>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {MOCK_LISTINGS.map(listing => (
                    <ListingCard key={listing.id} listing={listing} onClick={() => setSelectedListing(listing)} />
                  ))}
                </div>
              </section>

              {/* Newsletter / Latest News */}
              <section className="bg-slate-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black uppercase italic mb-4">Our Latest News</h2>
                    <div className="w-20 h-1 bg-primary mx-auto"></div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <NewsCard 
                      title="How to Save Money as a Student in South Africa" 
                      date="March 22, 2026" 
                      image="https://picsum.photos/seed/save/800/600"
                    />
                    <NewsCard 
                      title="Top 10 Laptops for Engineering Students" 
                      date="March 15, 2026" 
                      image="https://picsum.photos/seed/laptop/800/600"
                    />
                    <NewsCard 
                      title="Selling Your Old Textbooks: A Quick Guide" 
                      date="March 10, 2026" 
                      image="https://picsum.photos/seed/books/800/600"
                    />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'marketplace' && (
            <motion.div 
              key="marketplace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-50 min-h-screen"
            >
              {/* Breadcrumbs */}
              <div className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <button onClick={() => setActiveTab('home')} className="hover:text-primary transition-colors">Home</button>
                  <ChevronRight size={12} />
                  <span className="text-ink">Shop</span>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                  {/* Sidebar Filters */}
                  <aside className="w-full lg:w-72 flex-shrink-0 space-y-10">
                    {/* Search */}
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">Search</h3>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search products..."
                          className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">Categories</h3>
                      <ul className="space-y-3">
                        <li>
                          <button 
                            onClick={() => setSelectedCategory("All")}
                            className={`text-sm hover:text-primary transition-colors ${selectedCategory === "All" ? "text-primary font-bold" : "text-slate-500"}`}
                          >
                            All Categories
                          </button>
                        </li>
                        {STORE_CONFIG.CATEGORIES.map(cat => (
                          <li key={cat}>
                            <button 
                              onClick={() => setSelectedCategory(cat)}
                              className={`text-sm hover:text-primary transition-colors ${selectedCategory === cat ? "text-primary font-bold" : "text-slate-500"}`}
                            >
                              {cat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">Filter by Price</h3>
                      <div className="space-y-4">
                        <input 
                          type="range" 
                          min="0" 
                          max="50000" 
                          step="100"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex items-center justify-between text-sm font-bold">
                          <span>R0</span>
                          <span>R{priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* University Filter */}
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">University</h3>
                      <select 
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                        value={selectedUniversity}
                        onChange={(e) => setSelectedUniversity(e.target.value)}
                      >
                        {STORE_CONFIG.UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </aside>

                  {/* Product Grid */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
                      <p className="text-sm text-slate-500 font-medium">
                        Showing <span className="text-ink font-bold">{filteredListings.length}</span> results
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Sort By:</span>
                        <select 
                          className="bg-transparent text-sm font-bold focus:outline-none"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                        >
                          <option value="newest">Newest First</option>
                          <option value="price-asc">Price: Low to High</option>
                          <option value="price-desc">Price: High to Low</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                      {filteredListings.length > 0 ? (
                        filteredListings.map(listing => (
                          <ListingCard key={listing.id} listing={listing} onClick={() => setSelectedListing(listing)} />
                        ))
                      ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                          <ShoppingBag className="mx-auto text-slate-200 mb-4" size={48} />
                          <h3 className="text-xl font-black uppercase italic mb-2">No products found</h3>
                          <p className="text-slate-400">Try adjusting your filters or search query.</p>
                          <button 
                            onClick={() => {
                              setSearchQuery("");
                              setSelectedCategory("All");
                              setSelectedUniversity("All Universities");
                              setPriceRange([0, 50000]);
                            }}
                            className="mt-6 text-primary font-bold hover:underline"
                          >
                            Clear all filters
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ... Other tabs (post, dashboard, messages) ... */}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">C</div>
                <span className="font-black text-2xl tracking-tighter uppercase">Campus Deals</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                The trusted peer-to-peer marketplace for South African students. Buy, sell, and trade safely within your campus community.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm mb-8">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-primary transition-colors">Home</button></li>
                <li><button onClick={() => setActiveTab('marketplace')} className="hover:text-primary transition-colors">Marketplace</button></li>
                <li><button onClick={() => setActiveTab('post')} className="hover:text-primary transition-colors">Sell on Campus</button></li>
                <li><button className="hover:text-primary transition-colors">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm mb-8">Categories</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                {STORE_CONFIG.CATEGORIES.slice(0, 4).map(c => (
                  <li key={c}><button className="hover:text-primary transition-colors">{c}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm mb-8">Contact Us</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-center gap-3"><CreditCard size={18} className="text-primary" /> Secure Payments</li>
                <li className="flex items-center gap-3"><ShieldCheck size={18} className="text-primary" /> Verified Students</li>
                <li className="flex items-center gap-3"><Users size={18} className="text-primary" /> 24/7 Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-10 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
            © 2026 Campus Deals. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* ... Modals (Auth, Order, Detail) ... */}
      <AnimatePresence>
        {selectedListing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedListing(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid md:grid-cols-2"
            >
              <div className="aspect-square md:aspect-auto bg-slate-100 relative">
                <img 
                  src={selectedListing.images[0]} 
                  alt={selectedListing.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                      {selectedListing.category} • {selectedListing.university}
                    </div>
                    <h2 className="text-3xl font-black leading-tight uppercase italic">{selectedListing.title}</h2>
                  </div>
                  <button onClick={() => setSelectedListing(null)} className="p-2 text-slate-400 hover:text-slate-900"><X size={24} /></button>
                </div>

                <div className="text-3xl font-black text-primary mb-6">R {selectedListing.price.toFixed(2)}</div>

                <div className="flex-1 overflow-y-auto mb-8">
                  <p className="text-slate-600 leading-relaxed">{selectedListing.description}</p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsOrderModalOpen(true)}
                    className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOrderModalOpen && selectedListing && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl"
            >
              <button 
                onClick={() => setIsOrderModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <ShieldCheck size={40} className="mx-auto mb-6 text-primary" />
                <h2 className="text-3xl font-black mb-2 text-primary uppercase italic">Secure Escrow</h2>
                <p className="text-slate-500">Your payment will be held safely until you confirm delivery.</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 mb-10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Item</span>
                  <span className="font-bold">{selectedListing.title}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-200">
                  <span className="text-slate-900 font-black uppercase text-xs tracking-widest">Total to Pay</span>
                  <span className="text-2xl font-black text-primary">R {(selectedListing.price * 1.02).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => handlePlaceOrder(selectedListing)}
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 disabled:opacity-70 transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <CreditCard size={20} />}
                {isSubmitting ? "Processing..." : "Confirm & Pay into Escrow"}
              </button>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <div className="font-bold text-emerald-900 text-sm">Escrow Payment Successful!</div>
                      <p className="text-emerald-700 text-xs mt-1">The seller has been notified.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl"
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-6">C</div>
                <h2 className="text-3xl font-black mb-2 uppercase italic">Welcome Back</h2>
                <p className="text-slate-500">Login to your student account</p>
              </div>

              <div className="space-y-4">
                <button onClick={() => loginAs('buyer')} className="w-full py-4 bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-3">
                  <User size={20} /> Login as Student Buyer
                </button>
                <button onClick={() => loginAs('seller')} className="w-full py-4 bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-3">
                  <ShoppingBag size={20} /> Login as Student Seller
                </button>
                <button onClick={() => loginAs('admin')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                  <ShieldCheck size={20} /> Login as Admin
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureItem({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="text-xs font-black uppercase tracking-widest">{title}</div>
        <div className="text-[10px] text-slate-400 font-bold">{subtitle}</div>
      </div>
    </div>
  );
}

function PromoBanner({ title, subtitle, image, color }: { title: string, subtitle: string, image: string, color: string }) {
  return (
    <div className={`relative h-[300px] rounded-[2rem] overflow-hidden group cursor-pointer ${color}`}>
      <img 
        src={image} 
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <h3 className="text-2xl font-black text-white uppercase italic mb-1">{title}</h3>
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );
}

function NewsCard({ title, date, image }: { title: string, date: string, image: string }) {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-8">
        <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">{date}</div>
        <h3 className="text-lg font-black uppercase italic leading-tight group-hover:text-primary transition-colors">{title}</h3>
      </div>
    </div>
  );
}

function ListingCard({ listing, onClick }: { listing: Listing; onClick: () => void; key?: string | number }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="aspect-square relative overflow-hidden bg-slate-100">
        <img 
          src={listing.images[0]} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
          {listing.category}
        </div>
        <div className="absolute bottom-4 right-4 px-4 py-1.5 bg-secondary text-ink rounded-full text-xs font-black shadow-lg">
          R {listing.price}
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          <Users size={12} />
          {listing.university}
        </div>
        <h3 className="font-black text-ink uppercase italic mb-2 line-clamp-1 group-hover:text-primary transition-colors">{listing.title}</h3>
        <div className="flex items-center gap-1 text-secondary">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: 'blue' | 'indigo' | 'amber'; key?: string | number }) {
  const colors = {
    blue: 'bg-primary/10 text-primary',
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600'
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{label}</div>
        <div className="text-2xl font-black italic uppercase">{value}</div>
      </div>
    </div>
  );
}

