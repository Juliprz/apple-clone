import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './src/components/ui/button'
import { Input } from './src/components/ui/input'
import { Label } from './src/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './src/components/ui/card'
import { Search, ShoppingCart, Plus, Minus, X, Star, ArrowRight, Sparkles, ChevronRight, Trash2 } from 'lucide-react'

type AppUser = { email: string; name: string }

type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  specs: string[]
  badge?: string
  rating?: number
}

type CartItem = Product & {
  quantity: number
}

const AppleStore = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState<AppUser | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  const [currentCategory, setCurrentCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'wallet'>('credit')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [selectedWallet, setSelectedWallet] = useState('')

// Función para procesar el pago (agregar después de las otras funciones)
const handleCheckout = () => {
  setIsCartOpen(false)
  setShowCheckout(true)
}

const processPayment = (e: React.FormEvent) => {
  e.preventDefault()
  // Aquí iría la lógica de procesamiento de pago
  alert('¡Pago procesado exitosamente!')
  setCart([])
  setShowCheckout(false)
}

  const products: Product[] = [
    { 
      id: 1, 
      name: 'iPhone 17 Pro', 
      category: 'iPhone', 
      price: 1099, 
      badge: 'Nuevo',
      rating: 4.9,
      image: 'https://www.apple.com/v/iphone/home/cg/images/overview/select/iphone_17pro__0s6piftg70ym_large.jpg', 
      description: 'El iPhone más Pro jamás creado. Con el revolucionario chip A17 Pro, el primer chip de 3 nanómetros de la industria.',
      specs: ['Chip A17 Pro de 3nm', 'Pantalla Super Retina XDR de 6.1"', 'Sistema de cámaras Pro de 48MP', 'Teleobjetivo con zoom óptico 5x', 'Batería de hasta 29 horas de video', 'Titanio de grado aeroespacial', 'USB-C con USB 3', 'Dynamic Island']
    },
    { 
      id: 2, 
      name: 'iPhone 16', 
      category: 'iPhone', 
      price: 699,
      rating: 4.8,
      image: 'https://www.apple.com/v/iphone/home/cg/images/overview/select/iphone_16__drr03yfz644m_large.jpg', 
      description: 'Dynamic Island llega al iPhone 15. Cámara principal de 48 MP con teleobjetivo 2x.',
      specs: ['Chip A16 Bionic', 'Pantalla Super Retina XDR de 6.1"', 'Cámara principal de 48MP', 'Dynamic Island', 'Batería para todo el día', 'Cristal con infusión de color', 'USB-C']
    },
    { 
      id: 3, 
      name: 'MacBook Pro 14"', 
      category: 'MacBook', 
      price: 1599,
      badge: 'Pro',
      rating: 5.0,
      image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/xlarge/mbp_14_16_3386877fa.jpg', 
      description: 'La MacBook Pro más poderosa hasta ahora. Con los chips M3 Pro y M3 Max.',
      specs: ['Chip M3 Pro o M3 Max', 'Pantalla Liquid Retina XDR de 14.2"', 'Hasta 128GB de memoria unificada', 'Hasta 8TB de almacenamiento SSD', 'Batería de hasta 22 horas', 'Tres puertos Thunderbolt 4', 'HDMI, ranura para tarjeta SDXC', 'MagSafe 3']
    },
    { 
      id: 4, 
      name: 'MacBook Air 13"', 
      category: 'MacBook', 
      price: 999,
      rating: 4.7,
      image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/xlarge/mba_13_15_08deb8525.jpg', 
      description: 'Superligera y con el chip M2. La laptop más delgada y ligera de Apple.',
      specs: ['Chip M2 de Apple', 'Pantalla Liquid Retina de 13.6"', 'Hasta 24GB de memoria unificada', 'Hasta 2TB de almacenamiento', 'Batería de hasta 18 horas', 'Cámara FaceTime HD de 1080p', 'Sistema de cuatro bocinas', 'Solo 2.7 libras de peso']
    },
    { 
      id: 5, 
      name: 'iPad Pro"', 
      category: 'iPad', 
      price: 999,
      badge: 'M2',
      rating: 4.9,
      image: 'https://www.apple.com/assets-www/en_WW/ipad/01_product_tile/xlarge/ipad_pro_613472654.jpg', 
      description: 'Tu próxima computadora no es una computadora. Con el chip M2.',
      specs: ['Chip M2', 'Pantalla Liquid Retina XDR de 12.9"', 'ProMotion con 120Hz', '5G ultrarrápido', 'Cámaras Pro con LiDAR', 'Grabación ProRes', 'Thunderbolt / USB 4', 'Compatible con Apple Pencil hover']
    },
    { 
      id: 6, 
      name: 'iPad Air', 
      category: 'iPad', 
      price: 599,
      rating: 4.6,
      image: 'https://www.apple.com/assets-www/en_WW/ipad/01_product_tile/xlarge/ipad_air_118ee7f62.jpg', 
      description: 'Poder serio. A un precio en serio. Con el chip M1.',
      specs: ['Chip M1', 'Pantalla Liquid Retina de 10.9"', 'Touch ID', '5G en modelos celulares', 'Cámara frontal ultra gran angular de 12MP', 'USB-C', 'Compatible con Magic Keyboard', 'Compatible con Apple Pencil (2ª gen)']
    },
    { 
      id: 7, 
      name: 'AirPods Pro 3', 
      category: 'AirPods', 
      price: 249,
      badge: 'Mejor Vendido',
      rating: 4.8,
      image: 'data:image/jpeg;base64,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', 
      description: 'Audio adaptativo. Ahora te escuchas. Con cancelación activa de ruido 2x más efectiva.',
      specs: ['Chip H2', 'Cancelación activa de ruido 2x mejor', 'Audio adaptativo', 'Modo transparencia', 'Audio espacial personalizado', 'Hasta 6 horas de escucha', '30 horas con estuche de carga', 'Estuche con altavoz y Find My']
    },
    { 
      id: 8, 
      name: 'AirPods Max', 
      category: 'AirPods', 
      price: 549,
      rating: 4.7,
      image: 'data:image/jpeg;base64,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', 
      description: 'El sonido definitivo. Auriculares over-ear de alta fidelidad.',
      specs: ['Chip H1 en cada copa', 'Audio computacional', 'Cancelación activa de ruido', 'Modo transparencia', 'Audio espacial con seguimiento dinámico de cabeza', '20 horas de batería', 'Digital Crown para control', 'Diadema de malla transpirable']
    },
    { 
      id: 9, 
      name: 'Apple Watch Series 11', 
      category: 'Watch', 
      price: 399,
      badge: 'Nuevo',
      rating: 4.9,
      image: 'https://www.apple.com/v/watch/bt/images/overview/select/product_s11__c23ym6fc09me_large.png', 
      description: 'Más inteligente. Más brillante. Más poderoso.',
      specs: ['Chip S9 SiP', 'Pantalla 2000 nits', 'Double Tap gesture', 'Siri en el dispositivo', 'Detección de temperatura', 'Detección de accidentes', 'Resistencia al agua WR50', 'Hasta 18 horas de batería']
    },
    { 
      id: 10, 
      name: 'Apple Watch Ultra 3', 
      category: 'Watch', 
      price: 799,
      badge: 'Ultra',
      rating: 5.0,
      image: 'https://www.apple.com/v/watch/bt/images/overview/select/product_u3__eh9hc0els5g2_large.png', 
      description: 'La aventura continúa. El Apple Watch más resistente y capaz.',
      specs: ['Chip S9 SiP', 'Pantalla 3000 nits', 'Caja de titanio de 49mm', 'Botón de acción', 'Sirena de 86 decibelios', 'Hasta 36 horas de batería', 'GPS de precisión de doble frecuencia', 'Profundidad hasta 100m']
    },
  ]

  const categories = ['Todos', 'iPhone', 'MacBook', 'iPad', 'AirPods', 'Watch']

  const filteredProducts = products.filter(product => {
    const matchesCategory = currentCategory === 'Todos' || product.category === currentCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = isLogin ? { email, name: email.split('@')[0] } : { email, name }
    setUser(newUser)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }
 
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  useEffect(() => {
    const savedCart = localStorage.getItem('appleCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('appleCart', JSON.stringify(cart))
  }, [cart])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <motion.div 
                className="flex justify-center mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                
              </motion.div>
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {isLogin ? 'Bienvenido' : 'Únete a Apple'}
              </CardTitle>
              <CardDescription className="text-center text-gray-300">
                {isLogin ? 'Ingresa a tu cuenta Apple' : 'Crea tu Apple ID'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Nombre completo</Label>
                    <Input
                      id="name"
                      placeholder="Steve Jobs"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all"
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full text-gray-300 hover:text-white hover:bg-white/10" 
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? '¿Nuevo en Apple? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Moderno */}
      <header className="backdrop-blur-xl bg-white/70 shadow-sm sticky top-0 z-20 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl"></span> Apple Store
            </motion.h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="font-medium">Carrito</span>
                <AnimatePresence>
                  {getCartItemsCount() > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                    >
                      {getCartItemsCount()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur px-4 py-2 rounded-full">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-900"
                >
                  Salir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-12 mb-8 text-white overflow-hidden relative"
        >
          <div className="relative z-10">
            <motion.h2 
              className="text-5xl font-bold mb-4"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Piensa diferente.
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-6"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Los mejores productos de Apple, ahora más cerca de tu mano.
            </motion.p>
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
            >
            </motion.div>
          </div>
          <motion.div 
            className="absolute -right-20 -top-20 h-80 w-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Buscador Mejorado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-white rounded-2xl shadow-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Busca tu próximo dispositivo Apple..."
                className="pl-12 pr-4 py-6 text-lg border-0 rounded-2xl focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categorías Modernizadas */}
          <div className="flex gap-3 flex-wrap">
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentCategory(cat)}
                className={`
                  px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md
                  ${currentCategory === cat 
                    ? 'bg-black text-white shadow-xl' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg'
                  }
                `}
              >
                {cat === 'Todos' && <Sparkles className="inline mr-2 h-4 w-4" />}
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid de Productos Modernizado */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card 
                  className="cursor-pointer overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                    {product.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    )}
                    <CardDescription className="line-clamp-2 mt-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Desde</span>
                        <p className="text-2xl font-bold">${product.price}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                      >
                        <Plus className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No encontramos productos con esa búsqueda</p>
            <Button 
              onClick={() => {
                setSearchQuery('')
                setCurrentCategory('Todos')
              }}
              className="mt-4"
            >
              Ver todos los productos
            </Button>
          </motion.div>
        )}
      </div>

      {/* Modal de Producto Modernizado */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 rounded-full bg-white/80 backdrop-blur hover:bg-white"
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex items-center justify-center">
                  <motion.img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full max-w-md"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>
                
                <div className="p-8 md:p-12 space-y-6">
                  <div>
                    {selectedProduct.badge && (
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {selectedProduct.badge}
                      </span>
                    )}
                    <h2 className="text-4xl font-bold mt-3 mb-2">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-3xl font-semibold text-gray-900">${selectedProduct.price}</p>
                      {selectedProduct.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                          <span className="text-gray-600">{selectedProduct.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">{selectedProduct.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Características principales</h3>
                    <div className="space-y-3">
                      {selectedProduct.specs?.slice(0, 5).map((spec, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start gap-3"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{spec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        addToCart(selectedProduct)
                        setSelectedProduct(null)
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Añadir al carrito
                      <ShoppingCart className="inline ml-2 h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carrito Modernizado */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            <motion.div 
              className="flex-1 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full max-w-md bg-white shadow-2xl"
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                  <h2 className="text-2xl font-bold">Tu Carrito</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsCartOpen(false)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8">
                      <div className="text-6xl mb-4">🛒</div>
                      <p className="text-gray-500 text-center">Tu carrito está vacío</p>
                      <Button 
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4"
                      >
                        Continuar comprando
                      </Button>
                    </div>
                  ) : (
                    <div className="p-6 space-y-4">
                      <AnimatePresence>
                        {cart.map((item, index) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gray-50 rounded-2xl p-4"
                          >
                            <div className="flex gap-4">
                              <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 space-y-2">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-gray-600">${item.price}</p>
                                <div className="flex items-center gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </motion.button>
                                  <span className="px-3 font-medium">{item.quantity}</span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </motion.button>
                                

{/* Modal de Pago */}
<AnimatePresence>
  {showCheckout && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCheckout(false)}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowCheckout(false)}
          className="absolute top-6 right-6 z-10 rounded-full bg-white/80 backdrop-blur hover:bg-white"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center">Finalizar Compra</h2>
          
          {/* Resumen del pedido */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Resumen del pedido</h3>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">{item.name} x{item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Formulario de pago */}
          <form onSubmit={processPayment} className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Método de pago</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'credit' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">💳</div>
                    <span className="font-medium">Crédito</span>
                  </div>
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('debit')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'debit' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">💳</div>
                    <span className="font-medium">Débito</span>
                  </div>
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'wallet' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🪙</div>
                    <span className="font-medium">Crypto</span>
                  </div>
                </motion.button>
              </div>
              
              {/* Campos para tarjeta (si se selecciona crédito/débito) */}
              {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-gray-700">Número de tarjeta</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName" className="text-gray-700">Nombre en la tarjeta</Label>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="Steve Jobs"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry" className="text-gray-700">Fecha de expiración</Label>
                      <Input
                        id="cardExpiry"
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardCvv" className="text-gray-700">CVV</Label>
                      <Input
                        id="cardCvv"
                        type="text"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Campos para wallet (si se selecciona wallet) */}
              {paymentMethod === 'wallet' && (
                <div>
                  <Label htmlFor="wallet" className="text-gray-700">Selecciona tu wallet</Label>
                  <select
                    id="wallet"
                    value={selectedWallet}
                    onChange={(e) => setSelectedWallet(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="apple-pay">Apple Pay</option>
                    <option value="google-pay">Google Pay</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              )}
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Pagar ${getCartTotal().toFixed(2)}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex justify-between text-xl font-bold mb-4">
                      <span>Total</span>
                      <span className="text-2xl">${getCartTotal()}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Proceder al pago
                      <ArrowRight className="inline ml-2 h-5 w-5" />
                    </motion.button>
                    
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  )
}

export default AppleStore