# **App Name**: FoodReels

## Core Features:

- User Authentication: Implement user, creator, and admin account types with distinct access privileges using Firebase authentication.
- Reels-Style Video Feed: Display a continuously scrolling feed of food-related videos, optimized for mobile viewing. Videos are stored on ScreenPal.
- Video Upload and Management: Enable creators and admins to upload, edit, and post videos with descriptions. Video metadata is stored in MongoDB.
- Content Moderation Tool: Provide admin accounts the ability to moderate all videos, including the ability to pin videos/stories to the top and delete inappropriate content.
- Like Videos: Allow users to like videos, increasing visibility of popular posts.
- Shopping Cart Integration: Enable users to add displayed food products to a shopping cart for potential purchase, managed via integration with Stripe or similar
- Story Viewing: Users can view 'stories,' time-sensitive visual content to encourage frequent engagement. Stories are stored on ScreenPal.
- User Login Page: Implement a user login page with fields for email and password, a login button, a 'Forgot Password' link, and a 'Create Account' link. The page will include the app's logo and a welcome message with a burger food image.
- Sign Up Page: Implement a sign-up page for new users with fields for registration. Include options to sign up using an email/password combination or via Google account.
- Creator Profile: In creator profile, allow user to add stories, upload videos, watch other videos, see description of the video (food video) with rating of that food on likes, and provide a logout and light/dark mode option.
- Main Page Layout: Implement main page layout for both users and creators. Include stories (15 sec), reel fats!, a search bar, a cart, user/creator profile and logout & light/dark mode option. Display reels (1 min) with scroll bar
- Cart: When the user clicks on the cart icon, the video product should be added to the cart with the price of that product. The cart should display the item name, price, and the amount of product added. It should also display the total price and a 'Proceed Payment' button. Clicking on 'Proceed Payment' should reveal payment options (Cash on Delivery, UPI, Debit/Credit). After choosing an option and clicking 'Pay,' the order should be visible on the Creator Page, and a receipt of payment order should be generated and received by the user/customer, then return to the main page.

## Style Guidelines:

- Primary color: A warm orange (#FF8C00), evoking the feeling of good, cooked food and appetite.
- Background color: Very light gray (#F0F0F0) to emphasize the video content and imagery.
- Accent color: A muted lime-green (#A3D83F), serving as a contrasting highlight for CTAs.
- Headline font: 'Belleza', a stylish sans-serif that is ideal for display type and short text blocks.
- Body font: 'Alegreya', complementing 'Belleza' by handling longer lines of body text with enhanced readability (serif).
- Use clear and minimalist icons for interactions like 'like,' 'share,' and 'add to cart'.
- A user-friendly mobile-first design. Video reels should play full-screen or near-full-screen, in a manner derived from apps like TikTok or Instagram. Additional layout will have clearly marked section intended for the use role currently using the system (user, creator, or admin).
- Smooth transitions and loading animations to enhance the viewing experience.