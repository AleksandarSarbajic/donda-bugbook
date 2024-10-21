<div align="center">
 <img  src="https://github.com/user-attachments/assets/907f8ec6-41c2-4f13-a3bd-243fb32f4831"/>
 </div>




<div align="center">
<img src="https://img.shields.io/npm/v/npm.svg?logo=npm"/>
<img src="https://img.shields.io/badge/react-v19.0.0_rc-blue?logo=react"/>
<img src="https://img.shields.io/badge/nextjs-v15.0.0_rc-black?logo=nextdotjs"/>
<img src="https://img.shields.io/badge/prisma-v6.16.1-white?logo=prisma"/>
<img src="https://img.shields.io/badge/tailwind-v3.4.1-blue?logo=tailwindcss"/>
<img src="https://img.shields.io/badge/zod-v3.23.8-white?logo=zod"/>
<img src="https://img.shields.io/badge/supabase-v2.31.0-green?logo=supabase"/>
</div>  


<p align="center">The Wild Oasis app enables you to check in/out bookings and gain a complete understanding of bookings, sales, check-ins, occupancy rates.</p>

<div align="center">
  
<a href="#quicstart" >Quickstart</a> • <a href="#technologies-used" align="center">Technologies Used</a> •  <a href="#screenshot" align="center"> Screenshot </a> • <a href="#you-may-also-like" align="center"> •  <a href="#how-it-works" align="center"> How it works </a> • <a align="center" href="you-may-also-like"> You may also like  </a> •  <a href="#license" align="center"> License  </a> 

•<a href="https://the-wild-oasis-web-black.vercel.app/cabins" align="Center">Live Server</a>

</div>

## Technologies Used

  - [React](https://react.dev/)
  - [NextJS](https://vercel.com/frameworks/nextjs)
  - [NextAuth](https://next-auth.js.org/)
  - [TailWindCss](https://tailwindcss.com/docs/customizing-colors)
  - [Axios](https://axios-http.com/)
  - [Stripe](https://stripe.com/)
  - [Supabase](https://supabase.com/)


## Screenshot

![dashboard](https://github.com/user-attachments/assets/cfbe72b1-5a8a-46a7-94da-bc4aa4e84ce9)

## Quicstart

To clone and run this application, you'll need [Git](https://git-scm.com/) and [NodeJS](https://nodejs.org/en) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

```
# Clone this repository 
$ git clone https://github.com/AleksandarSarbajic/the-wild-oasis-web

# Go into the repository
$ cd the-wild-oasis

# Install dependencies
$ npm install

# Run the app
$ npm run start
```

> [!NOTE]  
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## How It Works

### Cabins page

On cabins page you can see every single one of cabins with price, image, price and for how many guests it is. You can filter them with number of guests deppending what you need.
![checkingBooking](https://github.com/user-attachments/assets/dd8c30ed-3b7e-43d2-8773-8b3b9140283f)


### About Page

On about page you can see description of our brand with images.

![Screenshot 2023-10-02 220009](https://github.com/user-attachments/assets/9d511b67-2ab8-45dc-b370-8dbf97267a9f)

### Cabin Page

When we open a single cabin we can see description, the location and maximum number of guests with an image.

If you want to reserve a stay you must be logged in. You can select minimum 5 nigts, select the number of the guests add breakfast, and description.

![Screenshot 2023-10-02 220025](https://github.com/user-attachments/assets/d7be3846-b2c0-4721-8ee7-0411912d009f)

### Guest area home

On home page it shows unpaid upcoming reservations and by clicking on the "pay now" button you will be redirected to stripe check out.

![Screenshot 2023-09-30 164953](https://github.com/user-attachments/assets/96bc9e63-07c4-4d56-aa0e-0f8f27e12578)

### Guest area reservations

Here you can see all your reservations with multiple filters and you can edit or delete a reservation and it will show you all the details about reservation.


![Screenshot 2023-10-02 220122](https://github.com/user-attachments/assets/fb965288-a45b-4bf0-929f-7f0fb350ef85)

### Check out

Check out page is stripe hosted check out that was implemented you get all the details you can pay in your local currency and use a lot of methods to pay the reservation.


![Screenshot 2023-10-02 121822](https://github.com/user-attachments/assets/7e7236cc-051b-4404-be0a-68a01bb91132)

### Guest profile

You can see details of your profile and you can change country and your national id number.
 
![mode](https://github.com/user-attachments/assets/787f544a-0b8d-4be4-994b-94bc116c41f2)

### Edit Reservation

For the editing the reservation you can change the number of guests and details.

![screencapture-the-wild-oasis-web-black-vercel-app-account-reservations-edit-404-2024-10-10-10_43_33](https://github.com/user-attachments/assets/7aafb42f-dea7-4b45-80d5-3bf945c2064f)



## You may also like...

- [Tasty Trail](https://github.com/AleksandarSarbajic/the-wild-oasis) - Food ordering app
- [Fast React Pizza](https://github.com/AleksandarSarbajic/fast-react-pizza) - Pizza ordering app
- [World Wise](https://github.com/AleksandarSarbajic/WorldWise) - Countries visited tracking app

## License

**MIT**
