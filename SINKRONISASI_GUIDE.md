# 📋 SINKRONISASI SISTEM K-TRASH

## 🎯 Gambaran Umum

Sistem K-TRASH telah disinkronisasi untuk bekerja seamlessly antara tiga role utama:
- **👨‍💼 Admin** - Dashboard utama dengan kontrol penuh
- **👤 User** - Dashboard pengguna untuk penjemputansampah
- **🚗 Driver/Petugas** - Dashboard untuk menerima dan menyelesaikan order

---

## 🏗️ Arsitektur Sistem

### Frontend Structure
```
pundesari/
├── src/
│   ├── services/
│   │   └── api.js                 ← Centralized API client
│   ├── context/
│   │   └── AppContext.js          ← State management (Auth & Dashboard)
│   └── views/
│       ├── admin/
│       │   └── Dashboard.js       ← Admin dashboard (updated)
│       ├── user/
│       │   └── UserDashboard.js   ← User dashboard (updated)
│       └── driver/
│           └── DriverDashboard.js ← Driver dashboard (updated)
```

### Backend API Endpoints

#### 📊 Dashboard & Stats
```
GET /stats/dashboard              → Admin stats (total orders, drivers, waste, history)
GET /orders/recent                → Recent 10 orders
GET /orders/pending               → Pending orders awaiting assignment
```

#### 👤 User-Specific
```
GET /user/balance/:userId         → User balance (total, hold, available)
GET /user/transactions/:userId    → User transaction history
GET /orders/user/:userId          → User's orders
```

#### 🚗 Driver-Specific
```
GET /orders/pending               → All pending orders for driver
PATCH /orders/accept/:id          → Driver accepts order
PATCH /orders/status/:id          → Update order status (assigned → on_the_way → completed)
POST /driver/location             → Send GPS location
GET /tracking/:orderId            → Tracking data
```

#### 💰 Transactions (Admin)
```
GET /admin/pending-transactions   → Pending topups/withdrawals
GET /admin/transactions           → All transactions
GET /admin/hold-summary           → Hold balance overview
PATCH /admin/settings/hold-balance → Set minimum hold balance
POST /admin/topup                 → Manual topup for user
PATCH /admin/approve-transaction/:id
PATCH /admin/reject-transaction/:id
```

#### 🗑️ Harga Sampah
```
GET /harga/:jenis                 → Get prices by waste type
POST /harga                       → Add new waste type
PUT /harga/:id                    → Update waste price
DELETE /harga/:id                 → Delete waste type
```

---

## 🔄 Data Flow

### Admin Dashboard Flow
```
1. Admin opens dashboard
2. AppContext loads user from localStorage
3. DashboardProvider fetches:
   - /stats/dashboard (orders, drivers, waste)
   - /admin/hold-summary (balance data)
   - /orders/recent (activities)
   - /orders/pending (pending orders)
4. Data displayed in real-time
5. Auto-refresh every 30 seconds
```

### User Dashboard Flow
```
1. User logs in
2. User ID stored in localStorage
3. UserDashboard fetches:
   - /user/balance/:userId (balance info)
   - /harga/anorganik (waste prices)
   - /orders/user/:userId (user's orders)
4. Balance auto-refresh every 15 seconds
5. User can request pickup/view history
```

### Driver Dashboard Flow
```
1. Driver comes online
2. DriverDashboard polls: /orders/pending every 3 seconds
3. When order accepted:
   - PATCH /orders/accept/:id
   - GPS tracking starts via /driver/location
   - Coordinates sent every time position changes
4. When order completed:
   - PATCH /orders/status/:id (status: 'completed')
   - User receives notification
   - Saldo updated
```

---

## 🛠️ Service Layer (`api.js`)

Semua API calls terpusat di `services/api.js`:

```javascript
import { dashboardAPI, ordersAPI, hargaAPI, usersAPI, transactionsAPI, locationAPI, walletAPI } from '../../services/api';

// Usage Example
const stats = await dashboardAPI.getAdminStats();
const balance = await dashboardAPI.getUserBalance(userId);
const orders = await dashboardAPI.getPendingOrders();
const res = await ordersAPI.acceptOrder(orderId, driverId);
```

**Keuntungan:**
- Single source of truth untuk base URL
- Centralized error handling
- Easy to intercept requests (auth, logging)
- Consistent API structure

---

## 🔐 State Management (`AppContext.js`)

### AuthContext
```javascript
const { user, isLoading, logout } = useAuth();

// Returns:
// {
//   id: number
//   nama: string
//   role: 'admin' | 'user' | 'driver'
// }
```

### DashboardContext
```javascript
const { dashboardData, isLoading, error, lastUpdate, refresh } = useDashboard();

// dashboardData structure varies by role:
// Admin: { stats: {...} }
// User: { balance: {...}, orders: [...] }
// Driver: { orders: [...] }
```

---

## 🔄 Real-Time Updates

### Admin Dashboard
- **Polling**: Every 30 seconds
- **Data Points**: Orders, drivers, statistics

### User Dashboard
- **Balance Update**: Every 15 seconds
- **Auto-refresh**: On logout/login

### Driver Dashboard
- **Orders Polling**: Every 3 seconds (when online)
- **GPS Tracking**: Real-time when active order
- **Location Update**: Whenever position changes

---

## 📱 Integration Points

### Login Flow
```
1. User submits credentials to Login.js
2. POST /login
3. Response contains: id, nama, role, email
4. Store in localStorage:
   - userId
   - nama
   - role
   - email
5. Redirect to appropriate dashboard based on role
```

### Order Flow (Admin → Driver → User)
```
Admin Dashboard:
├─ See pending orders
├─ Assign to driver (future: button to assign)
│
Driver Dashboard:
├─ See pending orders
├─ Click "Terima" to accept
├─ PATCH /orders/accept/:id
├─ Order appears in their "Active" list
├─ GPS auto-tracks to user location
├─ On arrival: PATCH /orders/status/:id (status: 'arrived')
│
User Dashboard:
├─ Sees order assigned to driver (status: assigned)
├─ Sees driver tracking (coming in TrackingPetugas.js)
├─ On completion: order moves to history
├─ Saldo updated automatically
```

---

## 🐛 Error Handling

All API calls have try-catch:

```javascript
try {
  const res = await dashboardAPI.getAdminStats();
  setStats(res.data);
} catch (err) {
  setError(err.message);
  console.error('Error:', err);
}
```

Error states displayed:
- Admin Dashboard: Red alert banner
- User Dashboard: Error message
- Driver Dashboard: Alert popup

---

## 🚀 How to Deploy

### 1. Update `.env` (if needed)
```env
REACT_APP_API_URL=http://localhost:5000
```

### 2. Run Backend
```bash
cd backend
npm install
npm start
```

### 3. Run Frontend
```bash
cd pundesari
npm install
npm start
```

### 4. Access
- Admin: http://localhost:3000/admin → email: admin@test.com / password: 123456
- User: http://localhost:3000/user → email: user@test.com / password: 123456
- Driver: http://localhost:3000/driver → email: petugas@test.com / password: 123456

---

## 📊 Database Schema

### Key Tables
1. **users** - All users (admin, driver, user)
2. **orders** - Pickup requests
3. **harga_sampah** - Waste prices
4. **driver_locations** - GPS tracking
5. **saldo_transactions** - Balance history
6. **app_settings** - System settings (minimum_hold_balance)

### Order Statuses
- `pending` → Waiting for driver assignment
- `assigned` → Driver assigned
- `on_the_way` → Driver going to user
- `arrived` → Driver arrived at location
- `completed` → Order finished, saldo updated
- `approved` → Admin approved transaction
- `rejected` → Admin rejected transaction

---

## ✅ Checklist

- [x] Centralized API service
- [x] Admin Dashboard integration
- [x] User Dashboard integration  
- [x] Driver Dashboard integration
- [x] Context for state management
- [x] Real-time updates
- [x] Error handling
- [ ] **Next**: Add role-based routing guard
- [ ] **Next**: Add notification system
- [ ] **Next**: Add push notifications
- [ ] **Next**: Optimize performance

---

## 📞 Support

Jika ada error:
1. Check browser console (F12)
2. Check network tab for API calls
3. Verify backend running on port 5000
4. Check localStorage for user data
5. Review logs di `/memories/repo/` folder

