To start this project:
In backend folder .env file add:
1. MONGODB_URI = your mongodb url
2. TOKEN_SECRET_KEY  = token secret key
3. FRONTEND_URL = url for frontend connection
4. STRIPE_SECRET_KEY = payment gateway secret key
5. STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY = endpoint webhook for payment gateway

And in frontend folder .env file add:
1.REACT_APP_CLOUD_NAME_CLOUDINARY = name of your cloudinary database
2.REACT_APP_STRIPE_PUBLIC_KEY = stripe public key
3.REACT_APP_BACKEND_URL = backend url to connect with backend
