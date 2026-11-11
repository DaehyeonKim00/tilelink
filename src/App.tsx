import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context'
import { Layout } from './Layout'
import { AdminPage } from './pages/AdminPage'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Products } from './pages/Products'

// HashRouter keeps every address working on any plain web host (no server settings needed), for example /#/products
export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
