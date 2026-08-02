import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Secure Proxy for Youth Coding Club Applications
  app.post("/api/join", async (req, res) => {
    try {
      const {
        name,
        age,
        email,
        instagram,
        institution,
        experienceLevel,
        primaryStack,
        githubUrl,
        motivation
      } = req.body;

      if (!name || !email) {
        return res.status(400).json({ success: false, message: "Name and Email are required." });
      }

      // Get Formspree URL or Formspree key securely from server environment variable
      let targetEndpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xaqrgepk";
      if (!targetEndpoint.startsWith("http")) {
        targetEndpoint = `https://formspree.io/f/${targetEndpoint.replace(/^f\//, '')}`;
      }

      const payload = {
        name,
        email,
        age,
        instagram: instagram ? `@${instagram.replace(/^@/, '')}` : '',
        institution,
        experienceLevel,
        primaryStack,
        githubUrl: githubUrl || "N/A",
        message: motivation,
        _subject: `[Codive Youth Coding Club] New Application: ${name}`
      };

      // Forward request from server to Formspree backend
      const formspreeRes = await fetch(targetEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const responseData = await formspreeRes.json().catch(() => ({}));

      if (formspreeRes.ok) {
        return res.json({
          success: true,
          message: "Application submitted successfully to Formspree backend!",
          data: responseData
        });
      } else {
        return res.status(formspreeRes.status).json({
          success: false,
          message: responseData.error || responseData.errors?.[0]?.message || "Formspree submission failed.",
          data: responseData
        });
      }
    } catch (error: any) {
      console.error("Error in /api/join proxy handler:", error);
      return res.status(500).json({
        success: false,
        message: "Server internal error while forwarding application."
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("(.*)", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Youth Coding Club server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
