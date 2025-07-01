Perfect! Let's update the `README.md` to reflect the use of **shadcn/ui** and **Spline** as well. Here's the revised version:

---

```md
# 🧠 AI Learning Path Generator

A smart and personalized learning path generator powered by AI. Built to help learners navigate their educational journey based on their goals, skill level, and pace.

![Banner](https://your-banner-image-url-if-any.com)

---

## 🚀 Live Demo

🔗 [Visit App](https://ai-learning-path-generator.vercel.app/)

---

## 📌 Features

- ✨ AI-generated personalized learning paths
- 📊 Progress analytics and daily tracking
- 📁 Export learning plans as PDF
- 🏅 Gamification: XP, badges & streaks
- 🔗 Shareable learning paths
- 🔒 Authentication using Clerk
- 🎨 Modern UI with **shadcn/ui**
- 🧩 Interactive 3D illustrations using **Spline**

---

## 🛠️ Tech Stack

| Frontend | Backend | AI | Auth | DB | UI/3D |
|----------|---------|----|------|----|--------|
| Next.js + Tailwind CSS | NestJS | OpenAI API | Clerk | MongoDB | shadcn/ui, Spline |

---

## 📸 Screenshots

> *(Add real screenshots or GIFs showing the app in action)*

---

## 📂 Folder Structure

```

/frontend
└── components/
└── pages/
└── utils/
└── hooks/
└── lib/
└── app/

/backend
└── src/
├── modules/
├── controllers/
├── services/
└── schemas/

````

---

## 🧪 How to Run Locally

### Backend

```bash
git clone https://github.com/navneetshahi14/AILearningPathGenerator.git
cd AILearningPathGenerator/backend
pnpm install
pnpm start:dev
````

### Frontend

```bash
cd ../frontend
pnpm install
pnpm dev
```

🔑 **Environment Variables**

Ensure you add the required `.env` files for both frontend and backend:

* `OPENAI_API_KEY`
* `CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
* `MONGODB_URI`
* `NEXT_PUBLIC_BACKEND_URL`
* `FRONTEND_URL`, etc.

---

## 🙌 Contributing

We welcome all contributions!
If you'd like to report a bug or suggest a feature, feel free to open an issue or PR.

---

## 📧 Contact

Developed by [Navneet Shahi](https://www.linkedin.com/in/navneet-shahi-a8762824b)
📬 Email: [navneet.shahi2004@gmail.com](mailto:navneet.shahi2004@gmail.com)

---

## ⭐ Star the Repo

If you found this project helpful or inspiring, consider giving it a ⭐ on GitHub!

```

---

Let me know if you want to add:
- `LICENSE` section  
- `Credits` (for any libraries or assets used)  
- `FAQs` section  

I can also generate badges (like "Made with ❤️ using NestJS") if you'd like!
```
