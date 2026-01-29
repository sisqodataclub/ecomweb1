// app/routes/mister.tsx
import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Mister Fragrance | Premium Perfumes & Colognes" },
    { name: "description", content: "Discover our exclusive collection of premium perfumes and colognes" },
  ];
};

export default function MisterFragranceLandingPage() {
  const [cartCount, setCartCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle adding to cart
  const handleAddToCart = (productTitle: string) => {
    setCartCount(prev => prev + 1);
    alert(`${productTitle} added to cart!`);
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our next newsletter soon.`);
    emailInput.value = '';
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById("mainNav");
      const menuBtn = document.getElementById("openMenu");
      if (nav && menuBtn && !nav.contains(e.target as Node) && !menuBtn.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const products = [
    {
      id: 1,
      title: "Sauvage Eau de Parfum",
      category: "Men's Fragrance",
      price: "£89.99",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.5
    },
    {
      id: 2,
      title: "Chanel No. 5",
      category: "Women's Fragrance",
      price: "£125.00",
      image: "https://images.unsplash.com/photo-1590736969956-6d9c2a8d6971?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 5
    },
    {
      id: 3,
      title: "Bleu de Chanel",
      category: "Men's Fragrance",
      price: "£95.00",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4
    },
    {
      id: 4,
      title: "Black Opium",
      category: "Women's Fragrance",
      price: "£78.50",
      image: "https://images.unsplash.com/photo-1590736988934-8bf4d0d734ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.5
    }
  ];

  const categories = [
    {
      title: "Men's Fragrances",
      description: "Discover bold, sophisticated scents",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Women's Fragrances",
      description: "Elegant, captivating perfumes",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Luxury Brands",
      description: "Exclusive collections from top designers",
      image: "https://images.unsplash.com/photo-1593990965215-075c1f918806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <div className="landing-page">
      {/* Inline styles for this component */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-color: #000000;
          --secondary-color: #8B7355;
          --accent-color: #D4AF37;
          --light-color: #F8F5F0;
          --text-dark: #333333;
          --text-light: #777777;
          --transition: all 0.3s ease;
        }

        .landing-page {
          font-family: 'Montserrat', sans-serif;
          line-height: 1.6;
          color: var(--text-dark);
          background-color: var(--light-color);
          overflow-x: hidden;
        }

        h1, h2, h3, h4, h5 {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          line-height: 1.2;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .btn {
          display: inline-block;
          padding: 12px 28px;
          background-color: var(--primary-color);
          color: white;
          border: none;
          font-weight: 500;
          font-size: 16px;
          cursor: pointer;
          transition: var(--transition);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn:hover {
          background-color: var(--secondary-color);
          transform: translateY(-3px);
        }

        .btn-outline {
          background-color: transparent;
          border: 2px solid var(--primary-color);
          color: var(--primary-color);
        }

        .btn-outline:hover {
          background-color: var(--primary-color);
          color: white;
        }

        /* Header Styles */
        header {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }

        .header-top {
          background-color: var(--primary-color);
          color: white;
          padding: 10px 0;
          font-size: 14px;
        }

        .header-top .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-top-links a {
          margin-left: 20px;
        }

        .header-top-links a:hover {
          color: var(--accent-color);
        }

        .main-header {
          padding: 15px 0;
        }

        .main-header .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--primary-color);
          display: flex;
          align-items: center;
        }

        .logo span {
          color: var(--secondary-color);
        }

        .logo i {
          margin-right: 8px;
          color: var(--accent-color);
        }

        nav ul {
          display: flex;
          list-style: none;
        }

        nav ul li {
          margin-left: 30px;
        }

        nav ul li a {
          font-weight: 500;
          font-size: 16px;
          position: relative;
          padding: 5px 0;
        }

        nav ul li a:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background-color: var(--secondary-color);
          bottom: 0;
          left: 0;
          transition: var(--transition);
        }

        nav ul li a:hover:after {
          width: 100%;
        }

        .header-icons {
          display: flex;
          align-items: center;
        }

        .header-icons a {
          margin-left: 20px;
          font-size: 18px;
          position: relative;
        }

        .header-icons a:hover {
          color: var(--secondary-color);
        }

        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: var(--accent-color);
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-btn {
          display: none;
          font-size: 24px;
          cursor: pointer;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1840&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          padding: 160px 0 100px;
          margin-top: 80px;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero h1 {
          font-size: 48px;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .hero p {
          font-size: 18px;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        /* Featured Products */
        .section-title {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-title h2 {
          font-size: 36px;
          position: relative;
          display: inline-block;
          padding-bottom: 15px;
        }

        .section-title h2:after {
          content: '';
          position: absolute;
          width: 70px;
          height: 3px;
          background-color: var(--secondary-color);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .products {
          padding: 80px 0;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
        }

        .product-card {
          background-color: white;
          border-radius: 5px;
          overflow: hidden;
          transition: var(--transition);
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .product-img {
          height: 250px;
          overflow: hidden;
        }

        .product-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .product-card:hover .product-img img {
          transform: scale(1.05);
        }

        .product-info {
          padding: 20px;
        }

        .product-category {
          color: var(--secondary-color);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }

        .product-title {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .product-price {
          font-weight: 600;
          font-size: 20px;
          color: var(--primary-color);
          margin-bottom: 15px;
        }

        .product-rating {
          color: var(--accent-color);
          margin-bottom: 15px;
        }

        /* Categories */
        .categories {
          padding: 80px 0;
          background-color: white;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .category-card {
          position: relative;
          height: 300px;
          border-radius: 5px;
          overflow: hidden;
        }

        .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .category-card:hover img {
          transform: scale(1.1);
        }

        .category-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 30px;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
        }

        .category-content h3 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        /* Newsletter */
        .newsletter {
          padding: 80px 0;
          background-color: var(--primary-color);
          color: white;
          text-align: center;
        }

        .newsletter h2 {
          font-size: 36px;
          margin-bottom: 20px;
        }

        .newsletter p {
          max-width: 600px;
          margin: 0 auto 30px;
          opacity: 0.8;
        }

        .newsletter-form {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
        }

        .newsletter-form input {
          flex: 1;
          padding: 15px 20px;
          border: none;
          font-size: 16px;
        }

        .newsletter-form button {
          padding: 15px 30px;
          background-color: var(--secondary-color);
          color: white;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
        }

        .newsletter-form button:hover {
          background-color: var(--accent-color);
        }

        /* Footer */
        footer {
          background-color: #111111;
          color: #ccc;
          padding: 60px 0 30px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-col h3 {
          color: white;
          font-size: 20px;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-col h3:after {
          content: '';
          position: absolute;
          width: 40px;
          height: 2px;
          background-color: var(--secondary-color);
          bottom: 0;
          left: 0;
        }

        .footer-col ul {
          list-style: none;
        }

        .footer-col ul li {
          margin-bottom: 10px;
        }

        .footer-col ul li a:hover {
          color: var(--accent-color);
          padding-left: 5px;
          transition: var(--transition);
        }

        .social-links {
          display: flex;
          margin-top: 20px;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: rgba(255,255,255,0.1);
          border-radius: 50%;
          margin-right: 10px;
          transition: var(--transition);
        }

        .social-links a:hover {
          background-color: var(--secondary-color);
          transform: translateY(-5px);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 14px;
        }

        /* Responsive Styles */
        @media (max-width: 992px) {
          .hero h1 {
            font-size: 40px;
          }
          
          .section-title h2 {
            font-size: 32px;
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          nav {
            position: fixed;
            top: 0;
            right: ${isMobileMenuOpen ? "0" : "-100%"};
            width: 280px;
            height: 100vh;
            background-color: white;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            transition: var(--transition);
            z-index: 1001;
            padding: 80px 30px 30px;
          }

          nav ul {
            flex-direction: column;
          }

          nav ul li {
            margin: 0 0 20px 0;
          }

          .mobile-menu-close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            cursor: pointer;
          }

          .hero {
            padding: 140px 0 80px;
          }

          .hero h1 {
            font-size: 36px;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .newsletter-form input {
            margin-bottom: 10px;
          }
        }

        @media (max-width: 576px) {
          .hero h1 {
            font-size: 32px;
          }
          
          .section-title h2 {
            font-size: 28px;
          }
          
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="header-top">
          <div className="container">
            <div className="header-top-text">
              <span>Free shipping on orders over £50</span>
            </div>
            <div className="header-top-links">
              <a href="#"><i className="fas fa-phone"></i> 0800 123 4567</a>
              <a href="#"><i className="fas fa-envelope"></i> info@misterfragrance.co.uk</a>
            </div>
          </div>
        </div>
        <div className="main-header">
          <div className="container">
            <a href="#" className="logo">
              <i className="fas fa-crown"></i> Mister<span>Fragrance</span>
            </a>
            
            <nav id="mainNav" style={{ display: isMobileMenuOpen ? 'block' : undefined }}>
              <div className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                <i className="fas fa-times"></i>
              </div>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">Brands</a></li>
                <li><a href="#">Gifts</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
            
            <div className="header-icons">
              <a href="#"><i className="fas fa-search"></i></a>
              <a href="#"><i className="fas fa-user"></i></a>
              <a href="#" className="cart">
                <i className="fas fa-shopping-bag"></i>
                <span className="cart-count">{cartCount}</span>
              </a>
              <div className="mobile-menu-btn" id="openMenu" onClick={() => setIsMobileMenuOpen(true)}>
                <i className="fas fa-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Discover Your Signature Scent</h1>
            <p>Explore our exclusive collection of premium perfumes and colognes from the world's most prestigious fragrance houses. Find your perfect scent today.</p>
            <a href="#" className="btn">Shop Now</a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products">
        <div className="container">
          <div className="section-title">
            <h2>Best Sellers</h2>
            <p>Our most popular fragrances this season</p>
          </div>
          
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-img">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-price">{product.price}</div>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                  </div>
                  <a 
                    href="#" 
                    className="btn btn-outline" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product.title);
                    }}
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="container">
          <div className="section-title">
            <h2>Shop By Category</h2>
            <p>Find the perfect scent for any occasion</p>
          </div>
          
          <div className="category-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <img src={category.image} alt={category.title} />
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <h2>Stay In The Know</h2>
          <p>Subscribe to our newsletter for exclusive offers, new arrivals, and fragrance tips delivered straight to your inbox.</p>
          
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </form>
          
          <p style={{marginTop: "20px", fontSize: "14px"}}>By subscribing, you agree to our Privacy Policy and consent to receive updates from Mister Fragrance.</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <h3>Mister Fragrance</h3>
              <p>Your premier destination for luxury fragrances. Discover scents that define you.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-pinterest-p"></i></a>
              </div>
            </div>
            
            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop All</a></li>
                <li><a href="#">Men's Fragrances</a></li>
                <li><a href="#">Women's Fragrances</a></li>
                <li><a href="#">Gift Sets</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h3>Customer Service</h3>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Shipping Information</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h3>Contact Info</h3>
              <ul>
                <li><i className="fas fa-map-marker-alt"></i> 123 Fragrance Street, London, UK</li>
                <li><i className="fas fa-phone"></i> 0800 123 4567</li>
                <li><i className="fas fa-envelope"></i> info@misterfragrance.co.uk</li>
                <li><i className="fas fa-clock"></i> Mon-Sat: 9am-6pm, Sun: 11am-5pm</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Mister Fragrance. All rights reserved. | Designed with <i className="fas fa-heart" style={{color: "#e74c3c"}}></i> for fragrance lovers</p>
          </div>
        </div>
      </footer>

      {/* External resources links */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}