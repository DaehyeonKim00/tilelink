import { useNavigate } from 'react-router-dom'
import { brandsOf } from '../data/catalog'
import { useApp } from '../context'
import { Admin } from '../components/Admin'

export function AdminPage() {
  const { catalog, adminIn, setAdminIn } = useApp()
  const navigate = useNavigate()
  return (
    <Admin
      loggedIn={adminIn}
      onLogin={() => setAdminIn(true)}
      onLogout={() => {
        setAdminIn(false)
        navigate('/')
      }}
      categoryOptions={catalog.categoryOptions}
      brands={brandsOf(catalog.products).map((b) => b.name)}
      saveError={catalog.saveError}
      onAddProduct={catalog.addProduct}
      onAddCategory={catalog.addCategory}
      onReset={catalog.resetChanges}
    />
  )
}
