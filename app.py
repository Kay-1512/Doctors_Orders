from flask import Flask, request, jsonify
import bcrypt

app = Flask(__name__)

# Mock database for storing user accounts
users = []

# Sign-up endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data['email']
    password = data['password'].encode('utf-8')

    # Hash and salt the password
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

    # Check if the email is already registered
    if any(user['email'] == email for user in users):
        return jsonify({'error': 'Email already exists'}), 400

    # Store the new user account in the database
    users.append({
        'email': email,
        'password': hashed_password
    })

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)

# ----------------------Login------------------------------------------------------
# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password'].encode('utf-8')

    # Find the user in the database
    user = next((user for user in users if user['email'] == email), None)

    if user is None:
        return jsonify({'error': 'Invalid email or password'}), 401

    # Check if the password is correct
    if not bcrypt.checkpw(password, user['password'].encode('utf-8')):
        return jsonify({'error': 'Invalid email or password'}), 401

    return jsonify({'success': True})