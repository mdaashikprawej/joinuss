export async function onRequestPost(context) {
  try {
    const req = context.request;
    const body = await req.json();
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
    } = body;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, message: "Name and Email are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let targetEndpoint = context.env?.FORMSPREE_ENDPOINT || "https://formspree.io/f/xaqrgepk";
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
      return new Response(
        JSON.stringify({
          success: true,
          message: "Application submitted successfully!",
          data: responseData
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: responseData.error || responseData.errors?.[0]?.message || "Formspree submission failed.",
          data: responseData
        }),
        { status: formspreeRes.status, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server internal error while forwarding application."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
