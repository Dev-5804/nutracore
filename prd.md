## Product Requirements Document (PRD)

**Product Name:** Nutracore
**Type:** Single-seller E-commerce Website (Dry Fruits)
**Tech Stack:** Next.js (Frontend), Supabase (Database + Auth)

---

## 1. Objective

Build a performant, SEO-optimized e-commerce website for selling dry fruits directly to customers. The platform should support product browsing, cart management, secure checkout, order tracking, and admin inventory control.

---

## 2. Scope

### In-Scope

* Product listing and detail pages
* User authentication
* Cart and checkout
* Order management
* Admin dashboard
* Payment integration
* Basic analytics

### Out-of-Scope (Initial Version)

* Multi-vendor marketplace
* Complex recommendation engines
* Subscription models
* Native mobile apps

---

## 3. User Roles

### 3.1 Customer

* Browse products
* Add to cart
* Place orders
* Track orders
* Manage profile

### 3.2 Admin (Seller)

* Add/edit/delete products
* Manage inventory
* View orders
* Update order status

---

## 4. Functional Requirements

### 4.1 Authentication (Supabase Auth)

* Email/password login
* OAuth (Google)
* Session persistence
* Password reset

---

### 4.2 Product Catalog

#### Features

* Product listing page
* Product detail page
* Categories (e.g., Almonds, Cashews, Raisins)
* Search and filtering

#### Product Fields

* id
* name
* description
* price
* discount_price (optional)
* stock_quantity
* category
* images (array)
* weight options (e.g., 250g, 500g, 1kg)

---

### 4.3 Cart System

* Add/remove items
* Update quantity
* Persist cart (local storage + DB for logged-in users)
* Price calculation (subtotal, tax, total)

---

### 4.4 Checkout

* Address input
* Order summary
* Payment integration (Razorpay recommended)
* Order confirmation

---

### 4.5 Orders

#### Customer Side

* View order history
* Track order status

#### Admin Side

* View all orders
* Update status (Pending → Packed → Shipped → Delivered)

---

### 4.6 Admin Dashboard

* Product CRUD
* Inventory management
* Order management
* Basic analytics (sales, orders count)

---

## 5. Non-Functional Requirements

### Performance

* Page load < 2s
* Use Next.js SSR/SSG where needed

### SEO

* Dynamic meta tags
* Structured product data

### Security

* Supabase Row Level Security (RLS)
* Secure payment handling
* Input validation

### Scalability

* Modular architecture
* API-based design

---

## 6. Database Schema (Supabase)

### Tables

#### users

* id (uuid)
* email
* created_at

#### products

* id
* name
* description
* price
* discount_price
* stock_quantity
* category
* created_at

#### product_images

* id
* product_id (fk)
* image_url

#### orders

* id
* user_id (fk)
* total_amount
* status
* created_at

#### order_items

* id
* order_id (fk)
* product_id (fk)
* quantity
* price

#### addresses

* id
* user_id (fk)
* address_line
* city
* state
* pincode

---

## 7. API Design

### Auth

* Supabase built-in

### Products

* GET /products
* GET /products/:id
* POST /products (admin)
* PUT /products/:id (admin)
* DELETE /products/:id (admin)

### Orders

* POST /orders
* GET /orders (user)
* GET /orders/all (admin)
* PUT /orders/:id/status (admin)

---

## 8. Frontend Architecture (Next.js)

### Pages

* `/` → Homepage
* `/products` → Listing
* `/products/[id]` → Product detail
* `/cart`
* `/checkout`
* `/orders`
* `/admin`

### Components

* Navbar
* ProductCard
* CartItem
* OrderSummary
* AdminPanel

---

## 9. State Management

* React Context / Zustand (recommended for simplicity)
* Server state via Supabase

---

## 10. Payment Integration

* Razorpay API
* Flow:

  1. Create order
  2. Open Razorpay checkout
  3. Verify payment
  4. Update order status

---

## 11. AI Integration (Optional Extension)

* Product description generation
* Basic recommendation (related products)
* Customer query chatbot

---

## 12. Deployment

* Frontend: Vercel
* Backend: Supabase
* Storage: Supabase Storage (for images)

---

## 13. Metrics / KPIs

* Conversion rate
* Average order value
* Cart abandonment rate
* Daily active users

---

## 14. Milestones

### Phase 1 (MVP)

* Auth
* Product listing
* Cart
* Checkout

### Phase 2

* Admin dashboard
* Order tracking

### Phase 3

* SEO optimization
* Analytics
* AI features

---

## 15. Risks

### Risk

Inventory inconsistency
**Mitigation:** Transaction-based updates

### Risk

Payment failure handling
**Mitigation:** Webhook verification

---

## 16. Future Enhancements

* Subscription packs
* Bulk pricing
* Mobile app
* Advanced analytics

---

## 17. Constraints

* Single seller only
* Limited initial budget
* Minimal infrastructure complexity