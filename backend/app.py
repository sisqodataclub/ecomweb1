from flask import Flask, request, jsonify, session
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'ecomweb1-secret-key-2025')
app.config['SESSION_TYPE'] = 'filesystem'
CORS(app, supports_credentials=True, origins=['http://localhost:5173', 'http://192.168.0.111:5173'])

# Sample product data for testing
PRODUCTS = [
    {
        'id': 1,
        'name': 'Noir Absolu',
        'category': 'Extrait',
        'price': 295.00,
        'description': 'A deep, mysterious fragrance with notes of oud and patchouli.',
        'image_url': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop',
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop', 'is_primary': True}
        ]
    },
    {
        'id': 2,
        'name': 'Lumière Blanche',
        'category': 'Eau de Parfum',
        'price': 245.00,
        'description': 'A luminous white floral with jasmine and tuberose.',
        'image_url': 'https://images.unsplash.com/photo-1590736969954-71f2d5bafd95?w=600&auto=format&fit=crop',
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1590736969954-71f2d5bafd95?w=600&auto=format&fit=crop', 'is_primary': True}
        ]
    },
    {
        'id': 3,
        'name': 'Bois de Santal',
        'category': 'Extrait',
        'price': 325.00,
        'description': 'Warm sandalwood with hints of amber and vanilla.',
        'image_url': 'https://images.unsplash.com/photo-1590736969954-71f2d5bafd95?w=600&auto=format&fit=crop',
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1590736969954-71f2d5bafd95?w=600&auto=format&fit=crop', 'is_primary': True}
        ]
    },
    {
        'id': 4,
        'name': 'Vetiver Noir',
        'category': 'Eau de Toilette',
        'price': 195.00,
        'description': 'Earthy vetiver with citrus top notes.',
        'image_url': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop',
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop', 'is_primary': True}
        ]
    }
]

@app.route('/')
def index():
    return jsonify({'message': 'E-commerce Flask API', 'version': '1.0'})

# Product endpoints
@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(PRODUCTS)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

# Cart endpoints
@app.route('/api/cart', methods=['GET'])
def get_cart():
    cart = session.get('cart', [])
    return jsonify(cart)

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    cart = session.get('cart', [])
    
    # Check if item already in cart
    item_found = False
    for item in cart:
        if item['id'] == product_id:
            item['quantity'] += quantity
            item_found = True
            break
    
    if not item_found:
        cart.append({
            'id': product['id'],
            'name': product['name'],
            'price': product['price'],
            'quantity': quantity,
            'image': product['image_url'],
            'category': product['category']
        })
    
    session['cart'] = cart
    return jsonify({'message': 'Item added to cart', 'cart': cart})

@app.route('/api/cart/update', methods=['PUT'])
def update_cart_item():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    
    if quantity is None:
        return jsonify({'error': 'Quantity is required'}), 400
    
    cart = session.get('cart', [])
    item_found = False
    
    for item in cart:
        if item['id'] == product_id:
            if quantity <= 0:
                cart.remove(item)
            else:
                item['quantity'] = quantity
            item_found = True
            break
    
    if not item_found:
        return jsonify({'error': 'Item not found in cart'}), 404
    
    session['cart'] = cart
    return jsonify({'message': 'Cart updated', 'cart': cart})

@app.route('/api/cart/remove/<int:product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    cart = session.get('cart', [])
    initial_length = len(cart)
    cart = [item for item in cart if item['id'] != product_id]
    
    if len(cart) == initial_length:
        return jsonify({'error': 'Item not found in cart'}), 404
    
    session['cart'] = cart
    return jsonify({'message': 'Item removed from cart', 'cart': cart})

@app.route('/api/cart/clear', methods=['DELETE'])
def clear_cart():
    session['cart'] = []
    return jsonify({'message': 'Cart cleared'})

# Checkout endpoint
@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    cart = session.get('cart', [])
    
    if not cart:
        return jsonify({'error': 'Cart is empty'}), 400
    
    # Validate required fields
    required_fields = ['email', 'name', 'address', 'city', 'country', 'postal_code']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    
    # Calculate totals
    subtotal = sum(item['price'] * item['quantity'] for item in cart)
    shipping = 0 if subtotal > 250 else 25
    tax = subtotal * 0.08  # 8% tax
    total = subtotal + shipping + tax
    
    # Create order record (in a real app, save to database)
    order = {
        'order_id': f'ORD-{datetime.now().strftime("%Y%m%d-%H%M%S")}',
        'customer_email': data['email'],
        'customer_name': data['name'],
        'shipping_address': {
            'address': data['address'],
            'city': data['city'],
            'country': data['country'],
            'postal_code': data['postal_code']
        },
        'items': cart,
        'subtotal': subtotal,
        'shipping': shipping,
        'tax': tax,
        'total': total,
        'is_gift': data.get('is_gift', False),
        'order_date': datetime.now().isoformat(),
        'status': 'pending'
    }
    
    # In a real application, you would:
    # 1. Save order to database
    # 2. Process payment via Stripe/PayPal
    # 3. Send confirmation email
    # 4. Clear the cart
    
    # For demo purposes, we'll just return a success response
    # and clear the cart
    session['cart'] = []
    
    return jsonify({
        'message': 'Order placed successfully',
        'order': order,
        'checkout_url': 'https://example.com/payment-success'  # Mock payment URL
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
